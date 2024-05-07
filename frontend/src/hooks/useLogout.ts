import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { logout as logoutAPI } from "../services/api";

export const useLogout = () => {
  const navigate = useNavigate();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      navigate('/login')
    },
    onError: (err) => {
      console.log(err);
    }
  })

  return { logout: mutate, isLoading}
}