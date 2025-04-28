import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { obtenerTodosLogros, CrearRelacionlogrousuario } from "./achievements.service";
import { AchievementType } from "./AchievementSchema";

interface AchievementsProps {
  userExperience: number; // Solo pasamos la experiencia del usuario
  userId: number;         // 🔥 también pasamos el userId necesario para la relación
}

export const Achievements = ({ userExperience, userId }: AchievementsProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["achievement"],
    queryFn: () => obtenerTodosLogros(),
  });

  const mutationCrearRelacion = useMutation({
    mutationFn: CrearRelacionlogrousuario,
    onSuccess: () => {
      console.log("¡Relación logro-usuario creada con éxito!");
    },
    onError: (error) => {
      console.error("Error al crear relación logro-usuario:", error);
    },
  });

  useEffect(() => {
    if (data) {
      data.forEach((logro: AchievementType) => {
        const isCompleted = userExperience >= logro.required_experience;

        if (isCompleted) {
          // Cada vez que se detecta que se completó, creamos la relación
          mutationCrearRelacion.mutate({
            achievement_id: logro.id,
            user_id: userId,
          });
        }
      });
    }
  }, [data, userExperience, userId]);

  if (isLoading) return <p className="text-center text-gray-500">Cargando logros...</p>;
  if (error) return <p className="text-center text-red-500">Error al cargar logros.</p>;

  return (
    <section className="w-full px-6 py-10 bg-white">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Logros</h2>

      <div className="flex flex-col gap-4 items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {data?.map((logro: AchievementType) => {
          const isCompleted = userExperience >= logro.required_experience;
          const progress = Math.min((userExperience / logro.required_experience) * 100, 100);

          return (
            <div
              key={logro.id}
              className={`flex items-center w-full p-4 rounded-xl shadow-md gap-4 sm:max-w-md transition-all ${
                isCompleted ? "bg-yellow-100" : "bg-slate-100"
              }`}
            >
              <div className="flex-shrink-0">
                <img
                  alt={logro.title}
                  src={logro.image_src}
                  className={`w-16 h-16 object-cover rounded-full ${
                    isCompleted ? "" : "opacity-70 grayscale"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">{logro.title}</h3>
                  <span className="text-sm text-gray-400">
                    {userExperience}/{logro.required_experience}
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full my-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isCompleted ? "bg-green-400" : "bg-yellow-400"
                    }`}
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{logro.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
