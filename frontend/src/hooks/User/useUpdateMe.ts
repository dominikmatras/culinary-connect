import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMe as updateMeAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: { name: string; email: string }) => updateMeAPI(data),
    onSuccess: () => {
      toast.success("User data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to update user data!");
      console.log(error);
    },
  })

  return { updateMe: mutate, isLoading };
} 