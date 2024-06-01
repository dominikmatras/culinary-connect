import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordAPI } from "../../services/apiAuth";

export const useForgotPassword = () => {
  const {
    mutate,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (email: string) => forgotPasswordAPI(email),
    onSuccess: (data: { message: string; }) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to send email!");
      console.log(err.message);
    },
  });

  return { forgotPassword: mutate, isLoading, isSuccess };
};
