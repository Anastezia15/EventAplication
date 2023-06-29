import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setIsLoggedIn, setUserData } from "../../store/appSlice";
import { BASE_URL } from "../../config";
import { getUserEvents } from "../../api";

const Login = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const userLoggedIn = useSelector((state: RootState) => state.appState.userData.isLoggedIn);
  const dispatch = useDispatch();

  const loginHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (!loginRef.current || !passwordRef.current) return null;

    const response = await axios({
      method: "get",
      url: `${BASE_URL}/users/${loginRef.current.value}`,
      responseType: "json",
    });

    const { username, password, email } = response.data;

    // extra work, but needed to get id for user (/users/{username} - doesn't provide id of a user)
    const users = await axios({
      method: "get",
      url: `${BASE_URL}/users`,
      responseType: "json",
    });

    const getUser = users.data.find((user: any) => user.username === username);
    const userEvents = await getUserEvents(getUser.id);

    console.log("getUser", getUser);

    // getUserEvents(getUser.id).then((data) => setUserEvents(data));

    if (username === loginRef.current.value && password === passwordRef.current.value) {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          isLoggedIn: true,
          username,
          email,
          id: getUser.id,
          userEvents: userEvents || [],
        })
      );

      dispatch(
        setUserData({
          isLoggedIn: true,
          username,
          email,
          id: getUser.id,
          userEvents: userEvents || [],
        })
      );
    }
  };

  useEffect(() => {
    console.log(userLoggedIn);
  }, [userLoggedIn]);

  return (
    <div>
      <form onSubmit={loginHandler} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="p-2 rounded bg-blue-100"
          ref={loginRef}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="p-2 rounded bg-blue-100"
          ref={passwordRef}
        />
        <button type="submit" className="bg-blue-600 text-white p-1 w-20 rounded-sm">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
