import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/User/useUser";
import Spinner from "../Spinner/Spinner";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if(isLoading) return <Spinner/>

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
