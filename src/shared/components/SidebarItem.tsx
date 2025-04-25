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

  // ✅ Solo aplica efecto visual al ítem activo
  const activeMobile = isActive ? "bg-indigo-600 rounded-full p-3 shadow-md" : "";

  const commonStylesDesktop = `
    hidden lg:flex items-center p-4 rounded-lg 
    hover:text-green-500 transition-colors duration-300
    ${isActive ? "bg-indigo-700 text-green-500" : "text-white"}
  `;

  const commonStylesMobile = `
    lg:hidden flex flex-col items-center justify-center 
    w-14 h-14 transition-transform duration-200
    hover:scale-110 hover:rotate-3
    ${activeMobile}
  `;

  return (
    <>
      {to ? (
        <>
          {/* 🖥️ Vista escritorio */}
          <Link to={to} className={commonStylesDesktop}>
            <img src={iconSrc} alt={label} className="w-8 h-8 mr-5 object-contain" />
            <span>{label}</span>
          </Link>

          {/* 📱 Vista móvil (solo ícono, con efecto redondo) */}
          <Link to={to} className={commonStylesMobile}>
            <img src={iconSrc} alt={label} className="w-7 h-7 object-contain" />
            <span className="hidden">{label}</span>
          </Link>
        </>
      ) : (
        <>
          <button onClick={onClick} className={commonStylesDesktop}>
            <img src={iconSrc} alt={label} className="w-8 h-8 mr-5 object-contain" />
            <span>{label}</span>
          </button>

          <button onClick={onClick} className={commonStylesMobile}>
            <img src={iconSrc} alt={label} className="w-7 h-7 object-contain" />
            <span className="hidden">{label}</span>
          </button>
        </>
      )}
    </>
  );
};


export default SidebarItem;
