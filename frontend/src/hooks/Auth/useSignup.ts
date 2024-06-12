import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupAPI } from "../../services/apiAuth";

export const useSignup = () => {
  const navigate = useNavigate();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      passwordConfirm: string;
      role: string;
    }) => signupAPI(data),
    onSuccess: (user) => {
      if (user.role === "cooker") {
        navigate("/orders");
      } else {
        navigate("/menu");
      }
      toast.success("Signup successfull!");
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to signup!");
      console.log(err);
    },
  });

  return { signup: mutate, isLoading };
};
