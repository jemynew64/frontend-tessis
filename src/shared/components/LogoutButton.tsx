import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../../shared/store/auth";
import { Settings } from "lucide-react";

export const LogoutButton = ({ asIcon = false }: { asIcon?: boolean }) => {
  const { logout } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {asIcon ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Abrir menú"
          >
            <Settings className="h-6 w-6 text-gray-700" />
          </button>
{showMenu && (
  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-[100]">
    <button
      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
      onClick={() => {
        setShowMenu(false);
        setShowModal(true);
      }}
    >
      Cerrar sesión
    </button>
  </div>
)}

        </div>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">¿Cerrar sesión?</h2>
            <p className="text-sm text-gray-600 mb-6">
              ¿Estás seguro que deseas cerrar sesión? Se perderá cualquier progreso no guardado.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
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
