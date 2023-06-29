import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AuthLayout from "./AuthLayout";
import { useEffect } from "react";
import { setIsLoggedIn } from "../../store/appSlice";
import UserMenu from "../UserMenu/UserMenu";

const GlobalLayout = () => {
  const userLoggedIn = useSelector((state: RootState) => state.appState.userData.isLoggedIn);
  const userData = useSelector((state: RootState) => state.appState.userData);

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

            <UserMenu />
          </>
        )}
      </div>
    </div>
  );
};

export default GlobalLayout;
