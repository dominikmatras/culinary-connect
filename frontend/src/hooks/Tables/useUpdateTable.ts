import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTable as updateTableAPI } from "../../services/apiTables";
import toast from "react-hot-toast";

export const useUpdateTable = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: { id: number; status: string }) => updateTableAPI(data),
    onSuccess: () => {
      toast.success("Status changed successfully!");
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
    onError: (err) => {
      toast.error("Failed to change status!");
      console.log(err);
    },
  });

  return { updateTable: mutate, isLoading };
};
