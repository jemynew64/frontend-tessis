import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Aprender from "./pages/Aprender";
import Tienda from "./pages/Tienda";
import Matematicas from "./pages/Matematicas";
import RetoLeccion from "./pages/RetoLeccion";
import Comunicacion from "./pages/Comunicacion";
import { Rankings } from "./pages/Rankings";
import { Perfil } from "./pages/Perfil";
import { AdminPanel } from "./pages/admin/AdminPanel"; 
import SidebarLayout from "./layouts/MainLayout";
import PrivateRoute from "./layouts/PrivateRoute";
import RoleRoute from "./layouts/RoleRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Login />} />

      {/* Rutas Privadas (Cualquier usuario autenticado) */}
      <Route element={<PrivateRoute />}>
        
        <Route path="/reto-leccion" element={<RetoLeccion />} />
        
        <Route element={<SidebarLayout />}>
          <Route path="/aprender" element={<Aprender />} />
          <Route path="/matematicas" element={<Matematicas />} />
          <Route path="/comunicacion" element={<Comunicacion />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/ranking" element={<Rankings />} />
          <Route path="/perfil" element={<Perfil />} />

                     {/* Rutas Exclusivas de Administrador */}
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
           <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
