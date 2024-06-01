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

    const userData = await res.json();

    return userData.data;
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
      method: "GET",
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

export const forgotPassword = async (email: string) => {
  try {
    const body = {
      email,
    };

    const res = await fetch(`${HOST}${API_VERSION}/users/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { message } = await res.json();

    return { message };
  } catch (error) {
    if (error instanceof Error && error.message) {
      console.log(error);
      throw error;
    } else {
      console.log(error);
      throw new Error("Error sending an email");
    }
  }
};

export const resetPassword = async (data: {
  password: string;
  passwordConfirm: string;
  token: string;
}) => {
  try {
    const body = {
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    };

    const res = await fetch(`${HOST}${API_VERSION}/users/resetPassword/${data.token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { message } = await res.json();

    return { message };
  } catch (error) {
    if (error instanceof Error && error.message) {
      console.log(error);
      throw error;
    } else {
      console.log(error);
      throw new Error("Error in changing password");
    }
  }
};
