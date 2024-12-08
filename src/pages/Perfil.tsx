import { useAuthStore } from '../store/auth';  // Asegúrate de importar el store

export const Perfil = () => {
  // Obtener el usuario desde la tienda zustand
  const { user } = useAuthStore((state) => state);

  // Verificar si el usuario está autenticado
  if (!user) {
    return <div className="text-center text-lg font-semibold text-gray-500">No estás autenticado.</div>;  // Si no hay usuario, mostrar mensaje
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8 lg:px-16">
        {/* Título y foto de perfil */}
        <div className="text-center mb-8">
          <img
            src={ '/images/iconomorado.jpg'}  // Usar la imagen del perfil o la predeterminada
            alt="Perfil"
            className="w-36 h-36 rounded-full mx-auto mb-4 object-cover shadow-lg border-4 border-white"
          />
          <h1 className="text-3xl font-semibold text-gray-800">{user.nombre}</h1>
        </div>

        {/* Información del perfil */}
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-xl font-medium text-gray-700">Email:</span>
            <span className="text-lg text-gray-500">{user.email}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-xl font-medium text-gray-700">Corazones:</span>
            <span className="text-lg text-gray-500">{user.corazones}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-xl font-medium text-gray-700">Puntos:</span>
            <span className="text-lg text-gray-500">{user.puntos}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-medium text-gray-700">Experiencia:</span>
            <span className="text-lg text-gray-500">{user.experiencia} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};
