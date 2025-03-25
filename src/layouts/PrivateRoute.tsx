import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const PrivateRoute = () => {
  const { isAuth } = useAuthStore();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
