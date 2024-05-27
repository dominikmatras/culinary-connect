import { API_VERSION, HOST } from "../utils/constants";

export const getMeals = async () => {
  try {
    const res = await fetch(`${HOST}${API_VERSION}/meals`, {
      method: "GET",
      credentials: "include",
    });
    const { data } = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching meals");
  }
};