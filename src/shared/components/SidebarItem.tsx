import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  label: string;
  iconSrc: string;
  to: string;
}

const SidebarItem = ({ label, iconSrc, to }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const activeClasses = isActive ? "bg-indigo-700 text-green-500" : "";

  return (
    <>
      {/* Desktop */}
      <Link
        to={to}
        className={`hidden lg:flex items-center p-4 rounded-lg hover:text-green-500 transition-colors duration-300 ${activeClasses || "text-white"}`}
      >
        <img
          src={iconSrc}
          alt={label}
          className="w-8 h-8 mr-5 object-contain"
        />
        <span>{label}</span>
      </Link>

      {/* Mobile */}
      <Link
        to={to}
        className={`lg:hidden w-full flex flex-col justify-center items-center text-white py-2 hover:bg-indigo-800 ${activeClasses}`}
        >
        <img
          src={iconSrc}
          alt={label}
          className="w-7 h-7 object-contain"
        />
        <span className="text-[11px] mt-1">{label}</span>
      </Link>
    </>
  );
};

export default SidebarItem;
