import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
//este  layout sirve para verificar si esta utentificado el usuario o no
//si no lo esta lo redirige a la pagina de login
const PrivateRoute = () => {
  const { isAuth } = useAuthStore();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
