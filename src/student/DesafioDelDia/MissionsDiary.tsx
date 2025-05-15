import { useQuery } from "@tanstack/react-query";
import { getMissionToday, obtenerEstadisticasUsuario } from "./MissionsDiary.service";
import { MissionToday } from "./MissionsDiary.schema";
import { Mission } from "./MissionsDiary.schema";
import { Contador } from "../../shared/components/Contador";

export const MissionsDiary = () => {
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
  <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-4xl mx-auto mt-6">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-xl font-bold text-gray-800">🎯 Misiones del Día</h2>
      <Contador label="⏳" />
    </div>
    <div className="space-y-6">
      {missions.map((missionData) => {
        const progress = calculateMissionProgress(missionData.mission);
        const isCompleted = progress >= 100;
        const currentValue = stats[missionData.mission.stat_key] ?? 0;
        const targetValue = missionData.mission.stat_value;

        return (
          <div
            key={missionData.id}
            className="flex items-center gap-5 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
          >
            {/* ÍCONO */}
            <div className="flex-shrink-0">
              <img
                src="cofre-del-tesoro.svg" // puedes cambiar por íconos distintos según stat_key
                alt="Misión"
                className="w-10 h-10"
              />
            </div>

            {/* CONTENIDO */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-base font-semibold text-gray-800">
                  {missionData.mission.title}
                </span>
                <span className="text-sm text-gray-500">
                  {currentValue} / {targetValue}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                {missionData.mission.description}
              </p>

              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 h-3 rounded-full">
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
