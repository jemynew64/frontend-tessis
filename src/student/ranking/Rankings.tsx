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
        return "bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105";
      case 1:
        return "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105";
      case 2:
        return "bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105";
      default:
        return "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105";
    }
  };

  return (
    <div className="flex-1 p-8 lg:pl-[256px]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <img src="/leaderboard.svg" alt="Icono Tienda" className="mx-auto w-32 h-32 mb-4" />
          <h1 className="text-2xl font-semibold mb-6">Ranking de campeones</h1>
        </div>

        {isLoading && <p className="text-center">Cargando ranking...</p>}
        {error && <p className="text-center text-red-500">Error al cargar el ranking.</p>}

        {usuariosOrdenados.map((usuario, index) => (
          <div
            key={usuario.id}
            className={`p-6 rounded-lg mb-8 flex items-center justify-between ${getMedalColor(index)} transition-all duration-300 ease-in-out transform`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">{index + 1}</span>
              <span className="text-lg font-semibold">{usuario.name}</span>
              <img
                src="/images/iconomorado.jpg"
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-300"
              />
            </div>
            <span className="text-sm text-black">{usuario.experience} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
};