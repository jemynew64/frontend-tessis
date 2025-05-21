import { useAuthStore } from '../store/auth';
import { Bolt, Heart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getUserByIdService } from '../../services/userService';

export const UserProgress = () => {
  const user = useAuthStore((state) => state.user);

  // Consulta con React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userProgress', user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error("No hay ID de usuario");
      return getUserByIdService(user.id);
    },
    enabled: !!user?.id, // solo se ejecuta si hay ID de usuario
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-white p-2 rounded-lg shadow-md fixed top-0 left-0 right-0 w-full lg:static lg:w-auto lg:p-4 lg:rounded-lg lg:shadow-md z-50 flex justify-center lg:flex-col items-center lg:items-start space-x-4 lg:space-x-0">
      {/* Puntos */}
      <div className="flex items-center space-x-1">
        <Bolt className="h-5 w-5 text-yellow-500" />
        <span className="hidden lg:inline text-gray-600">Puntos:</span>
        <span className="text-lg font-bold text-blue-600">
          {isLoading ? '...' : isError ? 'Error' : data?.points}
        </span>
      </div>

      {/* Vidas */}
      <div className="flex items-center space-x-1">
        <Heart className="h-5 w-5 text-red-500" />
        <span className="hidden lg:inline text-gray-600">Vidas:</span>
        <span className="text-lg font-bold text-red-600">
          {isLoading ? '...' : isError ? 'Error' : `${data?.hearts}/5`}
        </span>
      </div>

      {/* Experiencia */}
      {data?.experience !== undefined && (
        <div className="flex items-center space-x-1">
          <img src="/points.svg" alt="Points icon" className="h-6 w-6" />
          <span className="hidden lg:inline text-gray-600">Experiencia:</span>
          <span className="text-lg font-bold text-blue-600">
            {isLoading ? '...' : isError ? 'Error' : data?.experience}
          </span>
        </div>
      )}
    </div>
  );
};
