import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import {Learn} from "./student/learn/Learn";
import Tienda from "./student/shop/Tienda";
import { Rankings } from "./student/ranking/Rankings";
import { Profile } from "./student/profile/Profile";
import SidebarLayout from "./shared/layouts/MainLayout";
import PrivateRoute from "./shared/layouts/PrivateRoute";
import RoleRoute from "./shared/layouts/RoleRoute";
import { PageUser } from "./admin/user/PageUser";
import {CursoListadosTotal} from "./student/listadotodo/CursoListadosTotal"
import { LessonApp } from "./admin/lesson/LessonApp";
import { ChallengeApp } from "./admin/challenge/ChallengeApp";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Login />} />

      {/* Rutas Privadas (Cualquier usuario autenticado) */}
      <Route element={<PrivateRoute />}>
        
        {/* <Route path="/reto-leccion" element={<RetoLeccion />} />  aca ba el formulario quizz */}
        
        <Route element={<SidebarLayout />}>

         <Route path="/listartodo/:id" element={<CursoListadosTotal />} />
          <Route path="/aprender" element={<Learn />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/ranking" element={<Rankings />} />
          <Route path="/perfil" element={<Profile />} />

                     {/* Rutas Exclusivas de Administrador */}
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
           <Route path="/usuario" element={<PageUser />} />
           <Route path="/leccion" element={<LessonApp />} />
           <Route path="/leccion-retos/:id_leccion/:titulo" element={<ChallengeApp />} />
           </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
