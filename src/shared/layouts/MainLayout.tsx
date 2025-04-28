import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom"; // Importamos Outlet
//la mayoria estaran dentro de este layout
const SidebarLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:pl-[256px]">
      <Outlet /> {/* Aquí se renderizarán las páginas */}
      </div>
    </div>
  );
};

export default SidebarLayout;
