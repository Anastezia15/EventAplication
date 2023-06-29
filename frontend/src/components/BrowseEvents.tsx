import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import { IEvent } from "../types";
import EventCard from "./EventCard";


const BrowseEvents = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}/events`,
        responseType: "json",
      });
      console.log(response);
      setEvents(response.data);
    })();

  }, []);


  return (
    <div className="pt-10">
      <div className="grid grid-flow-row grid-cols-2 gap-4">
        {events?.map((event) => (
          <EventCard key={event.id} event={event}  />
        ))}
      </div>
    </div>
  );
};

export default BrowseEvents;
