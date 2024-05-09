import { API_VERSION, HOST } from "../utils/constants";

export const login = async (data: { email: string; password: string }) => {
  try {
    const res = await fetch(`${HOST}${API_VERSION}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    return res;

  } catch (error) {
    console.log(error);
    throw new Error("Error logging in");
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${HOST}${API_VERSION}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return res;

  } catch (error) {
    console.log(error);
    throw new Error("Error logging out");
  }
};

export const getUser = async () => {
  try {
    const res = await fetch(`${HOST}${API_VERSION}/users/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const { data: user } = await res.json();

    return user;

  } catch (error) {
    console.log(error);
    throw new Error("Error logging out");
  }
};