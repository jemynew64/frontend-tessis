import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
//cosas echas por mi
import { useUserQueryOptions } from "./CursotodoQueryOption";
import { useAuthStore } from "../../shared/store/auth"; 
import { UserProgress } from '../../shared/components/UserProgress'; 
import {MissionsCard} from '../../shared/components/MissionsCard';
import {LearningUnitProgress} from "./LearningUnitProgress"
import { LessonModule } from "./LessonModule";
import { ButtonDuo } from "./ButtonDuo";


export const CursoListadosTotal = () => {
  const { id: course_id } = useParams();
  const user = useAuthStore((state) => state.user);
  const { data } = useQuery(
    useUserQueryOptions(Number(course_id), user?.id ?? 0)
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Contenido principal */}
      <div className="flex-1 p-4">
        <LearningUnitProgress>
          {data?.title ?? "Cargando..."}
        </LearningUnitProgress>

        {data?.unit.map((unidad, unidadIndex) => (
          <div key={unidadIndex}>
            <LessonModule
              title={unidad.title}
              description={unidad.description}
              stage={`Lección ${unidadIndex + 1}`}
              className="bg-lime-700 mb-4"
            />

            {unidad.lesson.map((leccion, idx) => {
              const progreso = leccion.lesson_progress?.[0];
              const estaCompletada = progreso?.completed === true;
              const estaBloqueada = false;
              const esPar = idx % 2 === 0;

              return (
                <div key={leccion.id} className="flex flex-col items-center mb-6">
                  {/* Botón con leve desplazamiento tipo zigzag sutil */}
                  <div className={`relative ${esPar ? 'translate-x-[-20px]' : 'translate-x-[20px]'}`}>
                    <ButtonDuo
                      estaCompletada={estaCompletada}
                      estaBloqueada={estaBloqueada}
                      tooltip={leccion.title}
                      onClick={() => console.log("Abrir lección", leccion.id)}
                    />
                  </div>

                  {/* Conector hacia la siguiente lección */}
                </div>
              );
            })}

          </div>
        ))}
      </div>

      {/* Sidebar derecha */}
      <div className="hidden lg:flex flex-col w-[250px]  p-4 shadow-md">
        <UserProgress />
        <MissionsCard />
      </div>
    </div>
  );
};
