import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const {
    mutate,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (data: { password: string; passwordConfirm: string; token: string }) =>
      resetPasswordAPI(data),
    onSuccess: () => {
      navigate('/settings');
      toast.success('Your password has been updated successfully!');
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to change password!");
      console.log(err.message);
    },
  });

  return { resetPassword: mutate, isLoading, isSuccess };
};
