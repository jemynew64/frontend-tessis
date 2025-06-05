import { useAuthStore } from '../store/auth';
import { Bolt, Heart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { obtenerUsuarioPorId, getHeartsRecoveryStatus } from '../../admin/user/usuario.service';
import { useEffect, useState } from 'react';

export const UserProgress = () => {
  const user = useAuthStore((state) => state.user);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['userProgress', user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error("No hay ID de usuario");
      return obtenerUsuarioPorId(user.id);
    },
    enabled: !!user?.id,
    refetchOnWindowFocus: false,
  });

  const [nextRecoveryTime, setNextRecoveryTime] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id || !data || data.hearts >= 5) return;

    let interval: ReturnType<typeof setInterval>;

    const trackRecovery = async () => {
      try {
        const res = await getHeartsRecoveryStatus();
        const [first] = res.recoveries;
        if (!first) return;

        const target = new Date(first).getTime();

        interval = setInterval(() => {
          const now = Date.now();
          const diff = target - now;

          if (diff <= 0) {
            setNextRecoveryTime("Recuperado");
            clearInterval(interval);
            refetch(); // Refresca corazones
          } else {
            const m = Math.floor(diff / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            setNextRecoveryTime(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
          }
        }, 1000);
      } catch (err) {
        console.error("Error al obtener tiempo de recuperación", err);
      }
    };

    trackRecovery();

    return () => clearInterval(interval);
  }, [user?.id, data]);

  return (
    <div className="bg-white p-2 rounded-lg shadow-md fixed top-0 left-0 right-0 w-full lg:static lg:w-auto lg:p-4 lg:rounded-lg lg:shadow-md z-40 flex justify-center lg:flex-col items-center lg:items-start space-x-4 lg:space-x-0">

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
        {!isLoading && !isError && data?.hearts !== undefined && data.hearts < 5 && nextRecoveryTime && (
          <span className="ml-2 text-sm text-gray-500">({nextRecoveryTime})</span>
        )}
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
