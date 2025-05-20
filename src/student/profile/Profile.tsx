import { useAuthStore } from '../../shared/store/auth';
import {useUserIdQueryOptions} from "../../admin/user/UserQueryOption"
import { useQuery } from '@tanstack/react-query';
import { Achievements } from '../achievements/Achievements';
import {Dashboard } from "../../shared/components/dashboard/Dashboard"
import {DashboardDiary } from "../../shared/components/dashboard/DashboardDiary"
import { Bolt,Heart } from "lucide-react";
import { LogoutButton } from "../../shared/components/LogoutButton";

export const Profile = () => {
  
  const { user } = useAuthStore((state) => state);

  // Si el user no existe, ni siquiera intentes hacer la query
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3">
        {/* Lado izquierdo - avatar y nombre */}
        <div className="bg-purple-600 p-8 flex flex-col items-center justify-center text-white">
          <img
            src="/images/iconomorado.jpg"
            alt="Perfil"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover mb-4"
          />
          <h2 className="text-xl font-bold">{usuario.name}</h2>
          <p className="text-sm text-purple-200">Miembro desde octubre de 2018</p>
          <LogoutButton  />

        </div>

        {/* Lado derecho - datos y stats */}
        <div className="col-span-2 p-8 space-y-6">
          {/* Info rápida */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-100 rounded-lg p-4 text-center shadow-sm flex flex-col">
              <div className="flex justify-center items-center gap-2">
              <p className="text-xl font-bold text-purple-700 ">{usuario.experience}</p>
              <img src="/points.svg" alt="Points icon" className="h-8 w-8" />
            </div>
              <p className="text-sm text-gray-500 uppercase">Experiencia</p>
            </div>
            <div className="bg-slate-100 rounded-lg p-4 text-center shadow-sm flex flex-col">
              <div className="flex justify-center items-center gap-2">
              <p className="text-xl font-bold text-blue-700">{usuario.points}</p>
              <Bolt className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-sm text-gray-500 uppercase">Puntos</p>
            </div>
            <div className="bg-slate-100 rounded-lg p-4 text-center shadow-sm flex flex-col">
              <div className="flex justify-center items-center gap-2">
              <p className="text-xl font-bold text-red-600">{usuario.hearts}</p>
              <Heart className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-sm text-gray-500 uppercase">Corazones</p>
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-2">
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium text-gray-600">Correo electrónico:</span>
              <span className="text-gray-800">{usuario.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Estado:</span>
              <span className="text-gray-800">Activo</span>
            </div>
          </div>
        </div>
            

      </div>

      {/* Logros */}
      <div className=''>
      <Dashboard/>
      </div>
      <div className=' '>
      <DashboardDiary/>
      </div>
      <div className=' '>
      <Achievements/>
      </div>

    </div>
  );
};
