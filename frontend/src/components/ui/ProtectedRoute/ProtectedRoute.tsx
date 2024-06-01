import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/User/useUser";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if(isLoading) return <div>Loading...</div>

  if(!user) {
    navigate('/login', { replace: true })
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute
