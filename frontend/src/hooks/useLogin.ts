import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: { email: string; password: string }) => loginAPI(data),
    onSuccess: (user) => {
      if (user.role === "cooker") {
        navigate("/kitchen");
      } else {
        navigate("/menu");
      }
      toast.success("Logged in successfully!");
    },
    onError: (err) => {
      toast.error("Failed to login!");
      console.log(err);
    },
  });

  return { login: mutate, isLoading };
};
