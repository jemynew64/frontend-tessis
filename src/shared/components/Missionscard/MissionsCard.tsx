import { useQuery } from "@tanstack/react-query";
import { getMissionToday, obtenerEstadisticasUsuario } from "./MissionsCard.service";
import { MissionToday } from "./MisionToday.schema";
import { Mission } from "./MisionToday.schema";
import { Contador } from "../../components/Contador"
export const MissionsCard = () => {
  const { data: missions, isLoading, isError } = useQuery<MissionToday[]>({
    queryKey: ["missionsToday"],
    queryFn: getMissionToday,
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
  });

  const { data: stats } = useQuery({
    queryKey: ["userStatsdiary"],
    queryFn: () => obtenerEstadisticasUsuario(),
  });

  // Verificamos si las estadísticas existen
  const isStatsEmpty = !stats || Object.keys(stats).length === 0;

  if (isLoading || !stats) return <p className="text-sm text-gray-500">Cargando misiones...</p>;
  if (isError || !missions) return <p className="text-sm text-red-500">Error al cargar misiones.</p>;

  // Función para calcular el progreso de una misión basado en las estadísticas
  const calculateMissionProgress = (mission: Mission) => {
    if (isStatsEmpty) return 0; // Si no hay estadísticas, el progreso es 0

    const statValue = stats[mission.stat_key] ?? 0; // Si no existe, asignamos 0
    const targetValue = mission.stat_value;

    // Comprobamos que el valor objetivo no sea 0 para evitar divisiones por cero
    if (targetValue === 0) return 100;

    // Calculamos el progreso como un porcentaje
    const progress = (statValue / targetValue) * 100;

    // Aseguramos que el progreso no exceda el 100%
    return Math.min(progress, 100);
  };

return (
  <div className="bg-white rounded-xl shadow-md w-full max-w-[280px] px-4 py-4 overflow-y-auto">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-lg font-bold text-gray-800">🎯 Misiones del Día</h2>
      <Contador label="⏳" />
    </div>
    <div className="space-y-4">
      {missions.map((missionData) => {
        const progress = calculateMissionProgress(missionData.mission);
        const isCompleted = progress >= 100;
        const currentValue = stats[missionData.mission.stat_key] ?? 0;
        const targetValue = missionData.mission.stat_value;

        return (
          <div
            key={missionData.id}
            className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200"
          >
            {/* ÍCONO */}
            <img
              src="cofre-del-tesoro.svg"
              alt="Misión"
              className="w-7 h-7 mt-1"
            />

            {/* CONTENIDO */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-800 break-words leading-snug">
                  {missionData.mission.title}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {currentValue} / {targetValue}
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-1 leading-tight break-words">
                {missionData.mission.description}
              </p>
              <p className="text-[11px] text-purple-700 mt-1 font-medium">
                🧠 Ganas <span className="font-bold">{missionData.mission.granted_experience}</span> EXP y <span className="text-yellow-500">puntos 🪙</span>
              </p>

              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 h-2 mt-2 rounded-full">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isCompleted ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

};
