import { useState } from "react";
import BrowseEvents from "../BrowseEvents";
import MyEvents from "../MyEvents";
import CreateEvent from "../CreateEvent";

const UserMenu = () => {
  const [view, setView] = useState<string>("browseEventsView");

  return (
    <div className="max-w-4xl mx-auto pt-40 pb-10">
      <div className=" bg-white border-blue-300 border-2 rounded p-10 pt-0 shadow-2xl flex flex-col ">
        <div>
          <button
            className={`${view === "browseEventsView" && "bg-blue-300 rounded-b-lg "} p-4`}
            onClick={() => setView("browseEventsView")}
          >
            Browse Events
          </button>
          <button
            className={`${view === "subscriptionsView" && "bg-blue-300 rounded-b-lg "} p-4`}
            onClick={() => setView("subscriptionsView")}
          >
            View Subscriptions
          </button>
          <button
            className={`${view === "myEventsView" && "bg-blue-300 rounded-b-lg "} p-4`}
            onClick={() => setView("myEventsView")}
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

        {view === "browseEventsView" && <BrowseEvents />}
        {view === "myEventsView" && <MyEvents />}
        {view === "createEventView" && <CreateEvent />}
      </div>
    </div>
  );
};

export default UserMenu;
