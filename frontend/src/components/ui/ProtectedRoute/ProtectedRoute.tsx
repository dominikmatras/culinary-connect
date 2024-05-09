import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if(isLoading) return <div>Loading...</div>

  if(!user) {
    navigate('/login')
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute
