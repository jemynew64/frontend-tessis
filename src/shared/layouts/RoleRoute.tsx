import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
//lo uno que hace es verificar si el usuario tiene el rol adecuado para acceder a la ruta
const RoleRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuthStore();
  
  return user && allowedRoles.includes(user.user_type) ? (
    <Outlet />
  ) : (
    <Navigate to="/aprender" /> // Redirigir si no tiene el rol adecuado
  );
};

export default RoleRoute;
