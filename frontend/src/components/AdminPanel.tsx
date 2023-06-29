import { useState } from "react";
import ViewUsers from "./ViewUsers";
import ViewEvents from "./ViewEvents";

const AdminPanel = () => {
  const [view, setView] = useState<string>("usersView");

  return (
    <div className="max-w-4xl mx-auto pt-0 pb-10">
      <div className=" bg-white border-blue-300 border-2 rounded p-10 pt-0 shadow-2xl flex flex-col ">
        <div>
          <button
            className={`${view === "usersView" && "bg-blue-300 rounded-b-lg "} p-4`}
            onClick={() => setView("usersView")}
          >
            Users
          </button>
          <button
            className={`${view === "eventsView" && "bg-blue-300 rounded-b-lg "} p-4`}
            onClick={() => setView("eventsView")}
          >
            Categories
          </button>
          <button
            className={`${view === "categoriesView" && "bg-blue-300 rounded-b-lg "} p-4`}
            onClick={() => setView("categoriesView")}
          >
            My events
          </button>
          <button
            className={`${view === "createEventView" && "bg-blue-300 rounded-b-lg "} p-4`}
            onClick={() => setView("createEventView")}
          >
            Create event
          </button>
        </div>

        {view === "usersView" && <ViewUsers />}
        {view === "eventsView" && <ViewEvents />}
        {view === "categoriesView" && <div>categoriesView</div>}
        {view === "subscriptionsView" && <div></div>}
      </div>
    </div>
  );
};

export default AdminPanel;
