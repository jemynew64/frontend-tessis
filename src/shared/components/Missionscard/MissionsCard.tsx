import { useQuery } from "@tanstack/react-query";
import { getMissionToday } from "./MissionsCard.service";
import { MissionToday } from "./MisionToday.schema";

export const MissionsCard = () => {
  const { data: missions, isLoading, isError } = useQuery<MissionToday[]>({
    queryKey: ["missionsToday"],
    queryFn: getMissionToday,
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
  });

  if (isLoading) return <p className="text-sm text-gray-500">Cargando misiones...</p>;
  if (isError || !missions) return <p className="text-sm text-red-500">Error al cargar misiones.</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full mt-4">
      <h2 className="text-lg font-semibold mb-4">Misiones del Día</h2>
      <div className="space-y-4">
        {missions.map((missionData) => {
          const progress = missionData.completed ? 1 : 0;
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
                      progress === 1 ? "bg-green-500" : "bg-blue-500"
                    } h-full rounded transition-all`}
                    style={{ width: `${progress * 100}%` }}
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
