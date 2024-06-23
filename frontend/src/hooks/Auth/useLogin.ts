import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../../services/apiAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: { email: string; password: string }) => loginAPI(data),
    onSuccess: (user) => {
      if (user.role === "cooker") {
        navigate("/orders");
      } else {
        navigate("/tables");
      }
      toast.success("Logged in successfully!");
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to login!");
      console.log(err);
    },
  });

  return { login: mutate, isLoading };
};
