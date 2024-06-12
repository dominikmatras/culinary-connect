import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder as updateOrderAPI } from "../../services/apiOrders";
import toast from "react-hot-toast";

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: { orderId: string; status: string }) =>
      updateOrderAPI(data.orderId, data.status),
    onSuccess: () => {
      toast.success("Status changed successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error("Failed to change status!");
    },
  });

  return { updateOrder: mutate, isLoading };
};
