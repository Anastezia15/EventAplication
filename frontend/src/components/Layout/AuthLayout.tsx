import { useState } from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const AuthLayout = () => {
  const [view, setView] = useState<string>("loginView");

  return (
    <div className="max-w-sm mx-auto pt-40">
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
