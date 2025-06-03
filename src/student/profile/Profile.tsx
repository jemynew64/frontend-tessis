import { useAuthStore } from '../../shared/store/auth';
import { useUserIdQueryOptions } from "../../admin/user/UserQueryOption";
import { useQuery } from '@tanstack/react-query';
import { Achievements } from '../achievements/Achievements';
import { Dashboard } from "../../shared/components/dashboard/Dashboard";
import { DashboardDiary } from "../../shared/components/dashboard/DashboardDiary";
import { Bolt, Heart } from "lucide-react";
import { LogoutButton } from "../../shared/components/LogoutButton";
import { LevelProgress } from "../../shared/components/LevelProgress";
import { ChangeProfileImageModal } from "./ChangeProfileImageModal";
import dayjs from "dayjs";
import { GeneratePdfButton } from "./GeneratePdfButton";

export const Profile = () => {
  const { user } = useAuthStore((state) => state);
  const { data: usuario } = useQuery({
    ...useUserIdQueryOptions(user?.id ?? 0),
    enabled: !!user,
  });

  if (!usuario) {
    return (
      <div className="text-center text-lg font-semibold text-gray-500">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-2 sm:px-4">
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-3">
  {/* Lado izquierdo - avatar y nombre */}
  <div className="bg-purple-600 p-6 sm:p-8 flex flex-col items-center text-white">
    <img
      src={usuario.profile_image}
      alt="Perfil"
      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md object-cover mb-4"
    />
    <h2 className="text-lg sm:text-xl font-bold">{usuario.name}</h2>
    <p className="text-xs sm:text-sm text-purple-200">Miembro desde el 2025</p>
    <div className="mt-3 sm:mt-4 mb-2">
      <ChangeProfileImageModal />
      <GeneratePdfButton
        from={dayjs().subtract(7, "days").format("YYYY-MM-DD")}
        to={dayjs().format("YYYY-MM-DD")}
      />
    </div>
    <LogoutButton />
  </div>

  {/* Lado derecho - datos y stats */}
  <div className="sm:col-span-2 p-4 sm:p-8 space-y-4 sm:space-y-6 flex flex-col">
    {/* Info rápida */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
      <div className="bg-slate-100 rounded-lg p-3 sm:p-4 text-center shadow-sm flex flex-col items-center justify-center">
        <LevelProgress experience={usuario.experience} size={80} />
        <p className="text-xs sm:text-sm text-gray-500 uppercase mt-1">Nivel</p>
      </div>
      <div className="bg-slate-100 rounded-lg p-3 sm:p-4 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-1">
          <p className="text-lg sm:text-xl font-bold text-blue-700">{usuario.points}</p>
          <Bolt className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
        </div>
        <p className="text-xs sm:text-sm text-gray-500 uppercase mt-1">Puntos</p>
      </div>
      <div className="bg-slate-100 rounded-lg p-3 sm:p-4 text-center shadow-sm flex flex-col items-center justify-center col-span-2 sm:col-span-1">
        <div className="flex items-center justify-center gap-1">
          <p className="text-lg sm:text-xl font-bold text-red-600">{usuario.hearts}</p>
          <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
        </div>
        <p className="text-xs sm:text-sm text-gray-500 uppercase mt-1">Corazones</p>
      </div>
    </div>

    {/* Información adicional */}
    <div className="space-y-2">
      <div className="flex justify-between border-b pb-1 text-sm sm:text-base">
        <span className="font-medium text-gray-600">Correo electrónico:</span>
        <span className="text-gray-800 break-words text-right">{usuario.email}</span>
      </div>
      <div className="flex justify-between text-sm sm:text-base">
        <span className="font-medium text-gray-600">Estado:</span>
        <span className="text-gray-800">Activo</span>
      </div>
    </div>
  </div>
</div>


      {/* Secciones inferiores */}
      <div className="mt-4 sm:mt-6 space-y-4">
        <Dashboard />
        <DashboardDiary />
        <Achievements />
      </div>
    </div>
  );
};
