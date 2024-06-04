import { API_VERSION, HOST } from "../utils/constants";
import { throwErrorHandler } from "../utils/helpers";

export const createOrder = async (orderData: {
  meals: {
    meal: number;
    quantity: number;
  }[];
  tableId: number;
}) => {
  try {
    const body = {
      meals: orderData.meals,
      tableId: orderData.tableId
    };

    const res = await fetch(`${HOST}${API_VERSION}/orders`, {
      method: "POST",
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
    throwErrorHandler(error, "Error creating order!");
  }
};
