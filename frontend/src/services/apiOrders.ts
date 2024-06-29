import { API_VERSION, HOST } from "../utils/constants";
import { throwErrorHandler } from "../utils/helpers";

export const getOrders = async () => {
  try {
    const res = await fetch(`${HOST}${API_VERSION}/orders`, {
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
    throwErrorHandler(error, "Error fetching orders");
  }
};

export const updateOrder = async (orderId: string, status: string) => {
  try {
    const res = await fetch(`${HOST}${API_VERSION}/orders/${orderId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    throwErrorHandler(error, "Error updating order!");
  }
};

export const createOrder = async (orderData: {
  meals: {
    meal: number;
    quantity: number;
  }[];
  tableNumber: number;
}) => {
  try {
    const body = {
      meals: orderData.meals,
      tableNumber: orderData.tableNumber,
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
