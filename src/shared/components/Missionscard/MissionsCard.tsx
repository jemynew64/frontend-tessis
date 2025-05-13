import { useQuery } from "@tanstack/react-query";
import { getMissionToday, obtenerEstadisticasUsuario } from "./MissionsCard.service";
import { MissionToday } from "./MisionToday.schema";
import { Mission } from "./MisionToday.schema";

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
    <div className="bg-white p-4 rounded-lg shadow-md w-full mt-4">
      <h2 className="text-lg font-semibold mb-4">Misiones del Día</h2>
      <div className="space-y-4">
        {missions.map((missionData) => {
          const progress = calculateMissionProgress(missionData.mission); // Calcular el progreso de la misión
          const isCompleted = progress >= 100; // Verifica si el progreso alcanza o supera el 100%

          return (
            <div key={missionData.id} className="flex items-center space-x-4">
              <img
                src="/points.svg"
                alt="Points icon"
                className="h-6 w-6 text-yellow-500"
              />
              <div className="flex-1">
                <span className="text-gray-700 font-medium">
                  {missionData.mission.title}
                </span>
                <p className="text-xs text-gray-500">{missionData.mission.description}</p>
                <div className="w-full bg-gray-200 h-2 mt-2 rounded">
                  <div
                    className={`${
                      isCompleted ? "bg-green-500" : "bg-blue-500"
                    } h-full rounded transition-all`}
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
