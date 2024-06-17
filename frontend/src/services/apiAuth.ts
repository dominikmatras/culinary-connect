import { API_VERSION, HOST } from "../utils/constants";
import { throwErrorHandler } from "../utils/helpers";

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
}) => {
  try {
    const res = await fetch(`${HOST}${API_VERSION}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const userData = await res.json();

    return userData.data;
  } catch (error) {
    throwErrorHandler(error, "Error signing up");
  }
};

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

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const userData = await res.json();

    return userData.data;
  } catch (error) {
    throwErrorHandler(error, "Error logging in");
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

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    return res;
  } catch (error) {
    throwErrorHandler(error, "Error logging out");
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

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { data: user } = await res.json();
    return user;
  } catch (error) {
    throwErrorHandler(error, "Error getting user");
  }
};

export const updateMe = async (data: { email: string; name: string }) => {
  try {
    const res = await fetch(`${HOST}${API_VERSION}/users/updateMe`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { data: user } = await res.json();
    return user;
  } catch (error) {
    throwErrorHandler(error, "Error updating user");
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

    return message;
  } catch (error) {
    throwErrorHandler(error, "Error sending an email");
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
    throwErrorHandler(error, "Error in changing password");
  }
};

export const updatePassword = async (data: {
  password: string;
  newPassword: string;
  passwordConfirm: string;
}) => {
  try {
    const body = {
      password: data.password,
      newPassword: data.newPassword,
      passwordConfirm: data.passwordConfirm,
    };

    const res = await fetch(`${HOST}${API_VERSION}/users/updatePassword`, {
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

    const { data: user } = await res.json();

    return user;
  } catch (error) {
    throwErrorHandler(error, "Error updating password");
  }
};