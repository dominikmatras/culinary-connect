import { useMutation } from "@tanstack/react-query";
import { createOrder as createOrderAPI } from "../../services/apiOrders";
import toast from "react-hot-toast";

export const useCreateOrder = () => {
  const { mutate, isPending: isLoading, isSuccess } = useMutation({
    mutationFn: (orderData: {
      meals: {
        meal: number;
        quantity: number;
      }[];
      tableNumber: number;
    }) => createOrderAPI(orderData),
    onSuccess: () => {
      toast.success("Order created!");
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to create order!");
      console.log(err.message);
    },
  });

  return { createOrder: mutate, isLoading, isSuccess };
};
