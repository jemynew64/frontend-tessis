import { useMemo } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useRankingQueryOptions } from "./userankingQueryOptions";
import { StudentForm } from "../../admin/user/EstudianteSchema";

export const Rankings = () => {
  const { data, isLoading, error } = useQuery(useRankingQueryOptions());

  const usuariosOrdenados = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a: StudentForm, b: StudentForm) => b.experience - a.experience);
  }, [data]);

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 shadow-lg";
      case 1:
        return "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-lg";
      case 2:
        return "bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 shadow-lg";
      default:
        return "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 shadow-md";
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:pl-[256px]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <img
            src="/leaderboard.svg"
            alt="Icono Tienda"
            className="mx-auto w-20 h-20 sm:w-28 sm:h-28 mb-4"
          />
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Ranking de campeones</h1>
        </div>

        {isLoading && <p className="text-center">Cargando ranking...</p>}
        {error && <p className="text-center text-red-500">Error al cargar el ranking.</p>}

        {usuariosOrdenados.map((usuario, index) => (
          <div
            key={usuario.id}
            className={`p-3 sm:p-4 rounded-lg mb-4 flex flex-col sm:flex-row items-center justify-between gap-2 ${getMedalColor(index)} transition-all duration-300 ease-in-out transform hover:scale-105`}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-base sm:text-lg font-semibold">{index + 1}</span>
              <img
                src={usuario.profile_image}
                alt="Avatar"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300"
              />
              <span className="text-base sm:text-lg font-semibold">{usuario.name}</span>
            </div>
            <span className="text-xs sm:text-sm text-black">{usuario.experience} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
};
