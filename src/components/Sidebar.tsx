import { Link, useLocation } from "react-router-dom"; // Usamos React Router para la navegación
import SidebarItem from "./SidebarItem"; // Importamos el componente SidebarItem

const Sidebar = () => {
  const location = useLocation(); // Obtener la ruta actual

  return (
    <div className="flex flex-col h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-shrink-0 bg-gradient-to-b from-[#4727BD] to-[#211257] overflow-hidden z-20"> 
      {/* Imagen del logo visible solo en pantallas grandes */}
      <Link to="/aprender">
        <div className="pt-8 pl-4 pb-7 flex justify-center items-center gap-x-3 lg:block hidden">
          <img 
            src="/images/iconodemarca-sinfondo.png" 
            alt="Logo" 
            className="w-40 h-40 object-contain"  // Ajuste flexible de la imagen
          />
        </div>
      </Link>

      {/* Sidebar en pantallas grandes (escondemos en móviles) */}
      <div className="flex flex-col gap-y-4 flex-1 lg:flex lg:flex-col lg:gap-y-4 lg:flex-1 lg:block hidden z-20">
        <SidebarItem label="Aprender" to="/aprender" iconSrc="/learn.svg" />
        <SidebarItem label="Canje de puntos" to="/tienda" iconSrc="/shop.svg" />
        <SidebarItem label="Ranking de Campeones" to="/ranking" iconSrc="/leaderboard.svg" />
        <SidebarItem label="Perfil" to="/perfil" iconSrc="/perfil.svg" />
      </div>

      {/* Barra de navegación en pantallas pequeñas (visible solo en móviles) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full bg-gradient-to-b from-[#4727BD] to-[#211257] flex justify-around items-center py-3 m-0 p-0 overflow-hidden z-20">
        <Link to="/aprender" className={`flex flex-col justify-center items-center text-white w-full h-full py-3 ${location.pathname === '/aprender' ? 'bg-indigo-700 text-green-500' : 'hover:bg-indigo-800'}`}>
          <img src="/learn.svg" alt="Aprender" className="h-8 w-8" />
          <span className="text-xs mt-1">Aprender</span>
        </Link>
        <Link to="/tienda" className={`flex flex-col justify-center items-center text-white w-full h-full py-3 ${location.pathname === '/tienda' ? 'bg-indigo-700 text-green-500' : 'hover:bg-indigo-800'}`}>
          <img src="/shop.svg" alt="Tienda" className="h-8 w-8" />
          <span className="text-xs mt-1">Canje de puntos</span>
        </Link>
        <Link to="/ranking" className={`flex flex-col justify-center items-center text-white w-full h-full py-3 ${location.pathname === '/ranking' ? 'bg-indigo-700 text-green-500' : 'hover:bg-indigo-800'}`}>
          <img src="/leaderboard.svg" alt="Leaderboard" className="h-8 w-8" />
          <span className="text-xs mt-1">Campeones</span>
        </Link>
        <Link to="/perfil" className={`flex flex-col justify-center items-center text-white w-full h-full py-3 ${location.pathname === '/perfil' ? 'bg-indigo-700 text-green-500' : 'hover:bg-indigo-800'}`}>
          <img src="/perfil.svg" alt="Perfil" className="h-8 w-8" />
          <span className="text-xs mt-1">Perfil</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
