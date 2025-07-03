import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../shared/store/auth";
import profileImagesKids from "../../admin/user/Imagen_perfil.json";
import profileImagesCartoons from "../../admin/user/imagen_perfil_dibujo.json";
import axios from "../../shared/utils/AxiosHeader";

export const ChangeProfileImageModal = () => {
  const { user } = useAuthStore((state) => state);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"kids" | "cartoons">("kids");

  const currentImages =
    activeTab === "kids" ? profileImagesKids : profileImagesCartoons;

  const mutation = useMutation({
    mutationFn: async (imageUrl: string) => {
      return axios.put(`/usuarios/profile-image`, {
        profile_image: imageUrl,
      });
    },
    onSuccess: () => {
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ["user", user.id] });
      }
      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Error actualizando la imagen:", error);
    },
  });

  const handleImageClick = (imageUrl: string) => {
    mutation.mutate(imageUrl);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Cambiar Imagen de Perfil
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Elige tu nueva imagen</h2>

            {/* Botones de categoría */}
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setActiveTab("kids")}
                className={`px-3 py-1 rounded ${
                  activeTab === "kids"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Perfiles Niños
              </button>
              <button
                onClick={() => setActiveTab("cartoons")}
                className={`px-3 py-1 rounded ${
                  activeTab === "cartoons"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Dibujos
              </button>
            </div>

            {/* Avatares */}
            <div className="grid grid-cols-2 gap-4">
              {currentImages.map((img) => (
                <div
                  key={img.value}
                  className="flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => handleImageClick(img.value)}
                >
                  <img
                    src={img.value}
                    alt={img.label}
                    className="w-20 h-20 object-cover rounded-full border mb-2"
                  />
                  <span className="text-sm text-gray-700">{img.label}</span>
                </div>
              ))}
            </div>

            {/* Botón cancelar */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded text-white bg-red-600 hover:bg-red-700 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
