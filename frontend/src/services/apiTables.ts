import { API_VERSION, HOST } from "../utils/constants";

export const getTables = async () => {
  try {
    const res = await fetch(`${HOST}${API_VERSION}/tables`, {
      method: "GET",
      credentials: "include",
    });
    const { data } = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching tables");
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
    }, 
    );
    const { data } = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching tables");
  }
};
