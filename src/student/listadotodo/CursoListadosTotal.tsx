import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
//cosas echas por mi
import { useUserQueryOptions } from "./CursotodoQueryOption";
import { useAuthStore } from "../../shared/store/auth"; 
import { UserProgress } from '../../shared/components/UserProgress'; 
import {MissionsCard} from '../../shared/components/MissionsCard';
import {LearningUnitProgress} from "./LearningUnitProgress"
import { LessonModule } from "./LessonModule";
import { ButtonDuo } from "./ButtonDuo";
//la el inicio del quiz
import { iniciarLeccion } from "./cursotodo.service";

export const CursoListadosTotal = () => {

  const handleIniciarLeccion = async (lessonId: number) => {
    if (!user?.id) return;
  
    try {
      await iniciarLeccion(lessonId, user.id);
      navigate(`/quizz/${lessonId}`);
    } catch (error) {
      console.error("Error al iniciar la lección:", error);
    }
  };

  const navigate = useNavigate();

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
            const estaCompletada = leccion.completed === true;
            const estaBloqueada = !leccion.unlocked;

              const esPar = idx % 2 === 0;

              return (
                <div key={leccion.id} className="flex flex-col items-center mb-6">
                  {/* Botón con leve desplazamiento tipo zigzag sutil */}
                  <div className={`relative ${esPar ? 'translate-x-[-20px]' : 'translate-x-[20px]'}`}>
                    <ButtonDuo
                      estaCompletada={estaCompletada}
                      estaBloqueada={estaBloqueada}
                      tooltip={leccion.title}
                      onClick={() => handleIniciarLeccion(leccion.id)}
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
