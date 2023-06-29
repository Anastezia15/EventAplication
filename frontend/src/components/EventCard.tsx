import { memo, useEffect, useState } from "react";
import { IEvent } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleSubscribeEventForUser } from "../store/appSlice";
import axios from "axios";
import { BASE_URL } from "../config";

interface Props {
  event: IEvent;
  isCurrentUserEvent?: boolean;
  allowSubscribtion?: boolean;
}
const EventCard = ({ event, isCurrentUserEvent, allowSubscribtion = true }: Props) => {
  const {
    category: { name: categoryName },
    date,
    description,
    imageUrl,
    location,
    title,
    time,
    id,
  } = event;

  const userData = useSelector((state: RootState) => state.appState.userData);
  const dispatch = useDispatch();

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    if (userData.userEvents.find((event) => event.id === id)) {
      setIsSubscribed(true);
    }
    console.log(userData);
  }, [userData, id]);

  const subscribeHandler = async () => {
    setIsSubscribed((prev) => !prev);
    dispatch(toggleSubscribeEventForUser({ title, id }));

    if (!isSubscribed) {
      // add POST /subscribe/{eventId}/{userId}
      await axios({
        method: "post",
        url: `${BASE_URL}/events/subscribe/${id}/${userData.id}`,
        responseType: "json",
        data: {},
      });
    } else {
      // unsubscribe
      await axios({
        method: "patch",
        url: `${BASE_URL}/events/unsubscribe/${id}/${userData.id}`,
        responseType: "json",
        data: {},
      });
    }
  };

  const deleteEventHandler = async () => {
    await axios({
      method: "delete",
      url: `${BASE_URL}/events/${id}`,
      responseType: "json",
    });
  };

  return (
    <div className="bg-slate-400 shadow-xl rounded p-2 flex flex-col items-center">
      <h3 className="pb-2 text-xl">{title}</h3>
      <div>
        <img
          src={imageUrl}
          alt={title}
          className="w-[250px] h-[200px] object-cover object-center"
        />
      </div>
      <p className="pt-4 px-4">{description}</p>
      <div className="py-2">
        <span>Date: {date} </span>
        <span>Time: {time}</span>
      </div>
      <div>Location: {location}</div>
      <div>Category: {categoryName}</div>

      <div className="self-end pt-2 place-items-end flex-1 flex gap-3">
        {isCurrentUserEvent && (
          <button
            className="bg-red-800 text-white p-2 rounded-xl h-10"
            onClick={deleteEventHandler}
          >
            Delete
          </button>
        )}

        {allowSubscribtion && (
          <button
            className={`${
              isSubscribed ? "bg-red-800" : "bg-green-900"
            } text-white p-2 rounded-xl h-10`}
            onClick={subscribeHandler}
          >
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
