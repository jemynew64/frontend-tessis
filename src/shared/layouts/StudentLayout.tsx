import { Outlet } from "react-router-dom";
import Sidebar from "../../shared/components/Sidebar";
import { UserProgress } from "../../shared/components/UserProgress";
import { MissionsCard } from "../components/Missionscard/MissionsCard";

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* TopBar en móviles */}
        <div className="block lg:hidden w-full ">
          <UserProgress />
        </div>

        {/* Página */}
        <main className="flex-1 p-6 ">
          <Outlet />
        </main>
      </div>

      {/* Barra lateral derecha solo para escritorio */}
      <aside className="hidden lg:flex flex-col w-[250px] bg-white p-4">
        <UserProgress />
        <MissionsCard />
      </aside>
    </div>
  );
};

export default StudentLayout;
