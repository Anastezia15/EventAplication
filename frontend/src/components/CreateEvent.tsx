import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { BASE_URL } from "../config";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const CreateEvent = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const imageUrlRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const timeRef = useRef<HTMLInputElement | null>(null);
  const [eventCategories, setEventCategories] = useState<{ id: number; name: string }[] | null>(
    null
  );
  const categoryRef = useRef<HTMLSelectElement | null>(null);

  const userData = useSelector((state: RootState) => state.appState.userData);

  const createEventHandler = async (event: FormEvent) => {
    event.preventDefault();

    const users = await axios({
      method: "get",
      url: `${BASE_URL}/users`,
      responseType: "json",
    });

    const getUser = users.data.find((user: any) => user.username === userData.username);
    console.log("getUser", getUser);

    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !imageUrlRef.current ||
      !locationRef.current ||
      !dateRef.current ||
      !timeRef.current ||
      !categoryRef.current
    )
      return null;

    const data = {
      creatorId: getUser.id,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      imageUrl: imageUrlRef.current.value,
      location: locationRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
      category: categoryRef.current.value,
    };

    await axios({
      method: "post",
      url: `${BASE_URL}/events`,
      responseType: "json",
      data,
    });
  };

  // get categories
  useEffect(() => {
    (async () => {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}/categories`,
        responseType: "json",
      });
      console.log(response);
      setEventCategories(response.data);
    })();
  }, []);

  console.log(eventCategories);
  return (
    <div>
      <form onSubmit={createEventHandler} className="flex flex-col gap-4 pt-4">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className="p-2 rounded bg-blue-100"
          ref={titleRef}
        />
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          className="p-2 rounded bg-blue-100"
          ref={descriptionRef}
        />
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          placeholder="Image URL"
          className="p-2 rounded bg-blue-100"
          ref={imageUrlRef}
        />
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Location"
          className="p-2 rounded bg-blue-100"
          ref={locationRef}
        />
        <input
          type="date"
          name="date"
          id="date"
          placeholder="Date"
          className="p-2 rounded bg-blue-100"
          ref={dateRef}
        />
        <input
          type="text"
          name="time"
          id="time"
          placeholder="Time in hh:mm:ss"
          className="p-2 rounded bg-blue-100"
          ref={timeRef}
        />
        <select name="" id="" className="p-2 rounded bg-blue-100" ref={categoryRef}>
          {eventCategories?.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white p-1 w-40 rounded-sm">
          Create event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
