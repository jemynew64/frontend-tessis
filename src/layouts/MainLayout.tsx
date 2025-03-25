import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom"; // Importamos Outlet

const SidebarLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 lg:pl-[256px]">
        <Outlet /> {/* Aquí se renderizarán las páginas */}
      </div>
    </div>
  );
};

export default SidebarLayout;
