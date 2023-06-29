import { useEffect, useRef, useState } from "react";
import { getAllEvents, getEventById, getEventByTitle } from "../api";
import EventCard from "./EventCard";
import { IEvent } from "../types";

const ViewEvents = () => {
  const [view, setView] = useState("allEventsView");
  const findEventByIdRef = useRef<any>(null);
  const findEventByTitleRef = useRef<any>(null);
  const [events, setEvents] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getAllEvents();
      setEvents(data);
    })();
  }, []);

  const showAllEventsHandler = () => {
    setView("allEventsView");
  };

  const findEventByIDHandler = async (e: any) => {
    e.preventDefault();

    if (!findEventByIdRef.current) return null;
    const event = await getEventById(findEventByIdRef.current.value);
    setEvent(event);
    setView("findEventByIDHandler");
  };

  const findEventByTitleHandler = async (e: any) => {
    e.preventDefault();

    if (!findEventByTitleRef.current) return null;
    const event = await getEventByTitle(findEventByTitleRef.current.value);
    setEvent(event);
    setView("findEventByTitleHandler");
  };

  return (
    <div className="pt-4">
      <div className="flex flex-col gap-4 items-start">
        <button
          className="bg-blue-600 text-white p-1 w-40 rounded-sm"
          onClick={showAllEventsHandler}
        >
          Show all events
        </button>
        <form className="flex  gap-4" onSubmit={findEventByIDHandler}>
          <input
            type="text"
            className="p-2 rounded bg-blue-100 w-[200px]"
            placeholder="Find event by id"
            ref={findEventByIdRef}
          />
          <button type="submit" className="bg-blue-600 text-white p-1 w-20 rounded-sm">
            Find
          </button>
        </form>
        <form className="flex  gap-4" onSubmit={findEventByTitleHandler}>
          <input
            type="text"
            className="p-2 rounded bg-blue-100 w-[200px]"
            placeholder="Find event by title"
            ref={findEventByTitleRef}
          />
          <button type="submit" className="bg-blue-600 text-white p-1 w-20 rounded-sm">
            Find
          </button>
        </form>
      </div>

      {view === "findEventByIDHandler" && (
        <div className="p-10">
          <EventCard event={event} allowSubscribtion={false} />
        </div>
      )}

      {view === "findEventByTitleHandler" && (
        <div className="p-10">
          <EventCard event={event} allowSubscribtion={false} />
        </div>
      )}

      {view === "allEventsView" && (
        <div className="grid grid-flow-row grid-cols-2 gap-4 pt-10">
          {events?.map((event: IEvent) => (
            <EventCard key={event.id} event={event} allowSubscribtion={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewEvents;
