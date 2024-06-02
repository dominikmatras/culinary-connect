import { API_VERSION, HOST } from "../utils/constants";
import { throwErrorHandler } from "../utils/helpers";

export const getTables = async () => {
  try {
    const res = await fetch(`${HOST}${API_VERSION}/tables`, {
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
    throwErrorHandler(error, "Error fetching tables!");
  }
};

export const updateTable = async (tableData: { id: number; status: string }) => {
  try {
    const body = {
      status: tableData.status,
    };

    const res = await fetch(`${HOST}${API_VERSION}/tables/${tableData.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    throwErrorHandler(error, "Error updating table!");
  }
};
