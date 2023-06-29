import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AuthLayout from "./AuthLayout";
import { useEffect } from "react";
import { setAdmin, setIsLoggedIn } from "../../store/appSlice";
import UserMenu from "../UserMenu/UserMenu";
import AdminPanel from "../AdminPanel";

const GlobalLayout = () => {
  const userLoggedIn = useSelector((state: RootState) => state.appState.userData.isLoggedIn);
  const userData = useSelector((state: RootState) => state.appState.userData);
  const isAdmin = useSelector((state: RootState) => state.appState.isAdmin);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const logOutHandler = () => {
    dispatch(setIsLoggedIn(false));

    localStorage.setItem(
      "userData",
      JSON.stringify({
        isLoggedIn: false,
      })
    );

    localStorage.setItem("isAdmin", "false");
    dispatch(setAdmin(false));
  };

  return (
    <div className="flex flex-col">
      <div>
        {!userLoggedIn ? (
          <AuthLayout />
        ) : (
          <>
            <button
              className="flex ml-auto p-2 bg-red-600 text-white m-1 rounded-lg"
              onClick={logOutHandler}
            >
              Logout
            </button>
            <div className="flex flex-col justify-center items-center">
              <img
                src="../../../public/sphereImg-removebg-preview.png"
                alt="Sphere image"
                className="w-[400px] h-[400px]"
              />
              <h1 className="text-[50px] text-white pb-4 text-center">Event Sphere</h1>
            </div>

            {isAdmin ? <AdminPanel /> : <UserMenu />}
          </>
        )}
      </div>
    </div>
  );
};

export default GlobalLayout;
