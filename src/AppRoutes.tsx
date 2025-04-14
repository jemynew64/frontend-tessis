import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Aprender from "./pages/estudiante/Aprender";
import Tienda from "./pages/estudiante/Tienda";
import Matematicas from "./pages/estudiante/Matematicas";
import RetoLeccion from "./pages/estudiante/RetoLeccion";
import Comunicacion from "./pages/estudiante/Comunicacion";
import { Rankings } from "./pages/estudiante/Rankings";
import { Perfil } from "./pages/estudiante/Perfil";
import { AdminPanel } from "./pages/admin/AdminPanel"; 
import SidebarLayout from "./layouts/MainLayout";
import PrivateRoute from "./layouts/PrivateRoute";
import RoleRoute from "./layouts/RoleRoute";
import { PageUser } from "./pages/admin/user/PageUser";
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
           <Route path="/probando1" element={<PageUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
