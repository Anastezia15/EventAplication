import axios from "axios";
import { BASE_URL } from "./config";

export const getUserEvents = async (userId: number) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/events/subscriptions_on_events/${userId}`,
    responseType: "json",
  });
  return response.data;
};

export const getUsers = async () => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/users`,
    responseType: "json",
  });
  return response.data;
};

export const findUserById = async (userId: number) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/users/id/${userId}`,
    responseType: "json",
  });
  return response.data;
};

export const findUserByUsername = async (username: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/users/${username}`,
    responseType: "json",
  });
  return response.data;
};

export const getAllEvents = async () => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/events`,
    responseType: "json",
  });
  return response.data;
};

export const getEventById = async (eventId: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/events/id/${eventId}`,
    responseType: "json",
  });
  return response.data;
}

export const getEventByTitle = async (title: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/events/title/${title}`,
    responseType: "json",
  });
  return response.data;
}

export const deleteUser = async (userId: number) => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL}/users/${userId}`,
    responseType: "json",
  });
  return response.data;
}