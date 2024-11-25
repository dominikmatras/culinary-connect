import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordAPI } from "../../services/apiAuth";

export const useUpdatePassword = () => {
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: {
      password: string;
      newPassword: string;
      passwordConfirm: string;
    }) => updatePasswordAPI(data),
    onSuccess: () => {
      toast.remove();
      toast.success("Password updated successfully");
    },
    onMutate: () => {
      toast.loading("Updating...")
    },
    onError: (error) => {
      toast.remove();
      toast.error(error.message ?? "Failed to update password!");
      console.log(error);
    },
  });

  return { updatePassword: mutate, isLoading };
};
