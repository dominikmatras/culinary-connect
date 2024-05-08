import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { logout as logoutAPI } from "../services/api";
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      toast.success("Logged out successfully!")
      navigate('/login', {replace: true});
      queryClient.removeQueries()
    },
    onError: (err) => {
      toast.error("Failed to logout!")
      console.log(err);
    }
  })

  return { logout: mutate, isLoading}
}