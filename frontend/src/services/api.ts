export const getMeals = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/v1/meals", {
      method: "GET",
      credentials: "include",
    });
    const { data } = await res.json();

    return data.meals;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching meals");
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/v1/users/login", {
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
    const res = await fetch("http://127.0.0.1:3000/api/v1/users/logout", {
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