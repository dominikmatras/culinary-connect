import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMe as updateMeAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: FormData) => updateMeAPI(data),
    onSuccess: () => {
      toast.remove()
      toast.success("User data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onMutate: () => {
      toast.loading("Updating...")
    },
    onError: (error) => {
      toast.remove()
      toast.error(error.message ?? "Failed to update user data!");
      console.log(error);
    },
  })

  return { updateMe: mutate, isLoading };
} 