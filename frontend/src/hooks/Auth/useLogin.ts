import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../../services/apiAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: { email: string; password: string }) => loginAPI(data),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      if (user.role === "cooker") {
        navigate("/orders", { replace: true });
      } else {
        navigate("/tables", { replace: true });
      }
      toast.remove();
      toast.success("Logged in successfully!");
  
    },
    onMutate: () => {
      toast.loading("Logging in...")
    },
    onError: (err) => {
      toast.remove();
      toast.error(err.message ?? "Failed to login!");
      console.log(err);
    },
  });

  return { login: mutate, isLoading };
};
