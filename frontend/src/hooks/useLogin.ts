import { useMutation } from "@tanstack/react-query"
import { login as loginAPI } from "../services/api"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
  const navigate = useNavigate();
  const {mutate, isPending: isLoading } = useMutation({
    mutationFn: (data : {email: string, password: string}) => loginAPI(data),
    onSuccess: () => {
      navigate('/menu')
    },
    onError: (err) => {
      console.log(err);
      
    }
  })

  return { login: mutate, isLoading };
}