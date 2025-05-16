import { Route, Routes,Navigate } from "react-router-dom";
import { Login } from "./auth/Login";
import {Learn} from "./student/learn/Learn";
import Tienda from "./student/shop/Tienda";
import { Rankings } from "./student/ranking/Rankings";
import { Profile } from "./student/profile/Profile";
import SidebarLayout from "./shared/layouts/MainLayout";
import PrivateRoute from "./shared/layouts/PrivateRoute";
import RoleRoute from "./shared/layouts/RoleRoute";
import { PageUser } from "./admin/user/PageUser";
import StudentLayout from "./shared/layouts/StudentLayout";
import {CursoListadosTotal} from "./student/listadotodo/CursoListadosTotal"
import { LessonApp } from "./admin/lesson/LessonApp";
import { ChallengeApp } from "./admin/challenge/ChallengeApp";
import { ChallengeOptionApp } from "./admin/challengeOption/ChallengeOptionApp";
import { Quizz } from "./student/quizz/Quizz";
import { UnitApp } from "./admin/unit/UnitApp";
import { AchievementApp } from "./admin/achievement/AchievementApp";
import { MissionApp } from "./admin/mission/MissionApp";
import { CourseApp } from "./admin/course/CourseApp";
//solo para manejar lar redireccion
import { useAuthStore } from "./shared/store/auth";
import { Prueba } from "./pruebas-ui/Prueba";
import { MissionsDiary } from "./student/DesafioDelDia/MissionsDiary";
import { Statsgeneral } from "./admin/stats/Statsgeneral";

const AppRoutes = () => {
  const { isAuth } = useAuthStore(); // aquí evaluamos el auth globalmente
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/probando" element={<Prueba />} />

      {/* Rutas Privadas (Cualquier usuario autenticado) */}
      <Route element={<PrivateRoute />}>
      <Route path="/quizz/:id_lesson" element={<Quizz />} />

  {/* 🎯 StudentLayout para rutas del estudiante con progreso + misiones */}
  <Route element={<StudentLayout />}>
    <Route path="/aprender" element={<Learn />} />
    <Route path="/listartodo/:id" element={<CursoListadosTotal />} />
    <Route path="/tienda" element={<Tienda />} />
    <Route path="/ranking" element={<Rankings />} />
  </Route>

  {/* 🛠️ SidebarLayout para todo lo demás (tienda, perfil, admin) */}
  <Route element={<SidebarLayout />}>
  <Route path="/perfil" element={<Profile />} />
  <Route path="/misiondiaria" element={<MissionsDiary />} />

    {/* Admin */}
    <Route element={<RoleRoute allowedRoles={["admin"]} />}>
      <Route path="/usuario" element={<PageUser />} />
      <Route path="/unit" element={<UnitApp />} />
      <Route path="/achievement" element={<AchievementApp />} />
      <Route path="/misiones" element={<MissionApp />} />
      <Route path="/course" element={<CourseApp />} />
      <Route path="/leccion" element={<LessonApp />} />
      <Route path="/leccion-retos/:id_leccion/:titulo" element={<ChallengeApp />} />
      <Route path="/stats/:idusuario/:name" element={<Statsgeneral />} />
      <Route path="/opciones-del-reto/:challenge_id/:titulo" element={<ChallengeOptionApp />} />
    </Route>
  </Route>
</Route>

            {/* Fallback Route para rutas no existentes */}
            <Route
        path="*"
        element={<Navigate to={isAuth ? "/aprender" : "/"} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
