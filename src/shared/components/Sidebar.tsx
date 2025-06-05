import { useState } from "react";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { useAuthStore } from "../store/auth";

const Sidebar = () => {
  const { user } = useAuthStore();
  const { logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      {/* Sidebar desktop */}
      <div className="hidden lg:flex flex-col h-full w-[256px] fixed left-0 top-0 px-4 border-r-2 bg-gradient-to-b from-[#4727BD] to-[#211257] z-20">
        {/* Logo */}
        <Link to="/aprender">
          <div className="pt-8 pl-4 pb-7 flex justify-center items-center gap-x-3">
            <img
              src="/images/iconodemarca-sinfondo.png"
              alt="Logo"
              className="w-40 h-40 object-contain"
            />
          </div>
        </Link>

        {/* Ítems desktop */}
        <div className="flex flex-col gap-y-4 flex-1 overflow-y-auto pr-2 scrollbar-hide">
          {user?.user_type === "admin" && (
            <>
              <SidebarItem label="Panel Usuario" to="/usuario" iconSrc="/panel-usuario.svg" />
              <SidebarItem label="Modulo Cursos" to="/course" iconSrc="/curso.svg" />
              <SidebarItem label="Modulo Unidades" to="/unit" iconSrc="/unidad.svg" />
              <SidebarItem label="Cuestionarios" to="/leccion" iconSrc="/leccion.svg" />
              <SidebarItem label="Modulo Misiones" to="/misiones" iconSrc="/mision.svg" />
              <SidebarItem label="Modulo Logros" to="/achievement" iconSrc="/logro.svg" />
            </>
          )}
          <SidebarItem label="Aprender" to="/aprender" iconSrc="/learn.svg" />
          <SidebarItem label="Canje de puntos" to="/tienda" iconSrc="/shop.svg" />
          <SidebarItem label="Ranking de Campeones" to="/ranking" iconSrc="/leaderboard.svg" />
          <SidebarItem label="Perfil" to="/perfil" iconSrc="/perfil.svg" />
          <SidebarItem label="Mision Diaria" to="/misiondiaria" iconSrc="/mission2.svg" />
          {/* Cerrar sesión solo visible en escritorio */}
          <SidebarItem
            label="Cerrar sesión"
            iconSrc="/logout.svg"
            onClick={() => setShowLogoutModal(true)}
          />
        </div>
      </div>

      {/* Barra inferior fija en móviles */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full bg-gradient-to-b from-[#4727BD] to-[#211257] flex justify-around items-center py-2 z-30">
        {user?.user_type === "admin" && (
          <>
            <SidebarItem label="Panel Usuario" to="/usuario" iconSrc="/panel-usuario.svg" />
            <SidebarItem label="Modulo Cursos" to="/course" iconSrc="/curso.svg" />
            <SidebarItem label="Modulo Unidades" to="/unit" iconSrc="/unidad.svg" />
            <SidebarItem label="Cuestionarios" to="/leccion" iconSrc="/leccion.svg" />
            <SidebarItem label="Modulo Misiones" to="/misiones" iconSrc="/mision.svg" />
            <SidebarItem label="Modulo Logros" to="/achievement" iconSrc="/logro.svg" />
          </>
        )}
        <SidebarItem label="Aprender" to="/aprender" iconSrc="/learn.svg" />
        <SidebarItem label="Canje de puntos" to="/tienda" iconSrc="/shop.svg" />
        <SidebarItem label="Ranking de Campeones" to="/ranking" iconSrc="/leaderboard.svg" />
        <SidebarItem label="Perfil" to="/perfil" iconSrc="/perfil.svg" />
        <SidebarItem label="Mision Diaria" to="/misiondiaria" iconSrc="/mission2.svg" />
        {/* Cerrar sesión oculto en móviles */}
        {/* <SidebarItem label="Cerrar sesión" ... /> */}
      </div>

      {/* Modal de confirmación para cerrar sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">¿Cerrar sesión?</h2>
            <p className="text-sm text-gray-600 mb-6">¿Estás seguro que deseas cerrar sesión? Se perderá cualquier progreso no guardado.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
