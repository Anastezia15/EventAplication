import { useState } from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const AuthLayout = () => {
  const [view, setView] = useState<string>("loginView");

  return (
    <div className="max-w-sm mx-auto pt-0">
      <div className="flex flex-col justify-center items-center">
        <img
          src="../../../public/sphereImg-removebg-preview.png"
          alt="Sphere image"
          className="w-[400px] h-[400px]"
        />
        <h1 className="text-[50px] text-white pb-4 text-center">Event Sphere</h1>
      </div>
      <div className=" bg-white border-blue-300 border-2 rounded p-10 pt-0 shadow-2xl">
        <div className="pb-8 flex">
          <button
            className={`${view === "loginView" && "bg-blue-300 rounded-b-lg "} p-4`}
            onClick={() => setView("loginView")}
          >
            Login
          </button>
          <button
            className={`${view !== "loginView" && "bg-blue-300 rounded-b-lg "} p-4`}
            onClick={() => setView("registerView")}
          >
            Register
          </button>
        </div>
        {view === "loginView" ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default AuthLayout;
