import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import {Learn} from "./student/learn/Learn";
import Tienda from "./student/shop/Tienda";
import Matematicas from "./pages/estudiante/Matematicas";
import RetoLeccion from "./pages/estudiante/RetoLeccion";
import Comunicacion from "./pages/estudiante/Comunicacion";
import { Rankings } from "./student/ranking/Rankings";
import { Profile } from "./student/profile/Profile";
import SidebarLayout from "./shared/layouts/MainLayout";
import PrivateRoute from "./shared/layouts/PrivateRoute";
import RoleRoute from "./shared/layouts/RoleRoute";
import { PageUser } from "./admin/user/PageUser";
import {CursoListadosTotal} from "./student/listadotodo/CursoListadosTotal"
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Login />} />

      {/* Rutas Privadas (Cualquier usuario autenticado) */}
      <Route element={<PrivateRoute />}>
        
        <Route path="/reto-leccion" element={<RetoLeccion />} />
        
        <Route element={<SidebarLayout />}>
        // <Route path="/todo" element={<CursoListadosTotal />} />

          <Route path="/aprender" element={<Learn />} />
                {/* listar todo lo reemplaza*/}
          <Route path="/matematicas" element={<Matematicas />} />
          <Route path="/comunicacion" element={<Comunicacion />} />
                          {/* listar todo lo reemplaza*/}
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/ranking" element={<Rankings />} />
          <Route path="/perfil" element={<Profile />} />

                     {/* Rutas Exclusivas de Administrador */}
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
           <Route path="/usuario" element={<PageUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
