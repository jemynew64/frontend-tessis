import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Aprender from "./pages/Aprender";
import Tienda from "./pages/Tienda";
import Matematicas from "./pages/Matematicas";
import RetoLeccion from "./pages/RetoLeccion";
import Comunicacion from "./pages/Comunicacion";
import { Rankings } from "./pages/Rankings";
import { Perfil } from "./pages/Perfil";
import MainLayout from "./layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas SIN Sidebar */}
      <Route path="/" element={<Login />} />
      <Route path="/reto-leccion" element={<RetoLeccion />} />

      {/* Rutas CON Sidebar, agrupadas dentro de MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/aprender" element={<Aprender />} />
        <Route path="/matematicas" element={<Matematicas />} />
        <Route path="/comunicacion" element={<Comunicacion />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/ranking" element={<Rankings />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
