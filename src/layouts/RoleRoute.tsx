import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const RoleRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuthStore();
  
  return user && allowedRoles.includes(user.tipo_usuario) ? (
    <Outlet />
  ) : (
    <Navigate to="/aprender" /> // Redirigir si no tiene el rol adecuado
  );
};

export default RoleRoute;
