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
