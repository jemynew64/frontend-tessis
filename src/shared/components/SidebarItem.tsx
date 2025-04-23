import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  label: string;
  iconSrc: string;
  to?: string; // Hacemos que sea opcional
  onClick?: () => void;
}

const SidebarItem = ({ label, iconSrc, to, onClick }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = to && location.pathname === to;

  const activeClasses = isActive ? "bg-indigo-700 text-green-500" : "";

  const commonStylesDesktop = `hidden lg:flex items-center p-4 rounded-lg hover:text-green-500 transition-colors duration-300 ${
    activeClasses || "text-white"
  }`;

  const commonStylesMobile = `lg:hidden w-full flex flex-col justify-center items-center text-white py-2 hover:bg-indigo-800 ${activeClasses}`;

  return (
    <>
      {to ? (
        // Rutas internas (Link)
        <>
          <Link to={to} className={commonStylesDesktop}>
            <img src={iconSrc} alt={label} className="w-8 h-8 mr-5 object-contain" />
            <span>{label}</span>
          </Link>

          <Link to={to} className={commonStylesMobile}>
            <img src={iconSrc} alt={label} className="w-7 h-7 object-contain" />
            <span className="text-[11px] mt-1">{label}</span>
          </Link>
        </>
      ) : (
        // Botón (Logout, etc.)
        <>
          <button onClick={onClick} className={commonStylesDesktop}>
            <img src={iconSrc} alt={label} className="w-8 h-8 mr-5 object-contain" />
            <span>{label}</span>
          </button>

          <button onClick={onClick} className={commonStylesMobile}>
            <img src={iconSrc} alt={label} className="w-7 h-7 object-contain" />
            <span className="text-[11px] mt-1">{label}</span>
          </button>
        </>
      )}
    </>
  );
};

export default SidebarItem;
