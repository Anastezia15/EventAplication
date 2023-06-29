import { useEffect, useState } from "react";
import { getUserEvents } from "../api";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import EventCard from "./EventCard";

const MyEvents = () => {
  const userData = useSelector((state: RootState) => state.appState.userData);
  const [userEvents, setUserEvents] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const data = JSON.parse(localStorage.getItem(`${userData.username}`));
      console.log(data);
      setUserEvents(data.createdEvents);
    })();
  }, []);

  console.log("TEST", JSON.parse(localStorage.getItem(`${userData.username}`)));

  return (
    <div className="pt-10">
      <div className="grid grid-flow-row grid-cols-2 gap-4">
        {userEvents?.map((event: any) => (
          <EventCard key={event.id} event={event} isCurrentUserEvent={true} />
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
