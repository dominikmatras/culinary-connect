import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/User/useUser";
import Spinner from "../Spinner/Spinner";
import { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (user && location.pathname === "/orders" && user?.role !== "cooker") ||
      (location.pathname === "/menu" && user?.role === "cooker") ||
      (location.pathname === "/tables" && user?.role === "cooker")
    ) {
      navigate(-1);
    }
  }, [location.pathname, isLoading, user?.role]);

  if (!user) {
    navigate("/login", { replace: true });
  }

  if (isLoading) return <Spinner />;

  return <div>{children}</div>;
};

export default ProtectedRoute;
