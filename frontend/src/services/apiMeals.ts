import { API_VERSION, HOST } from "../utils/constants";
import { throwErrorHandler } from "../utils/helpers";

export const getMeals = async () => {
  try {
    const res = await fetch(`${HOST}${API_VERSION}/meals`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    throwErrorHandler(error, "Error fetching meals");
  }
};
