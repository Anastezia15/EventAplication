import { useEffect, useState } from "react";
import { getUserEvents } from "../api";
import EventCard from "./EventCard";

type Props = {
  userId: number;
};

const ViewSubscriptions = ({ userId }: Props) => {
  const [userEvents, setUserEvents] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getUserEvents(userId);
      setUserEvents(data);
      console.log(data);
    })();
  }, []);

  return (
    <div className="pt-10">
      <div className="grid grid-flow-row grid-cols-2 gap-4">
        {userEvents?.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default ViewSubscriptions;
