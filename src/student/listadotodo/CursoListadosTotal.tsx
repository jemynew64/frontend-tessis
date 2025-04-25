import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

// cosas hechas por ti
import { useUserQueryOptions } from "./CursotodoQueryOption";
import { useAuthStore } from "../../shared/store/auth"; 
import { LearningUnitProgress } from "./LearningUnitProgress";
import { LessonModule } from "./LessonModule";
import { ButtonDuo } from "./ButtonDuo";
import { iniciarLeccion } from "./cursotodo.service";
import { useRestoreScrollById } from "../../shared/hooks/useRestoreScroll";

export const CursoListadosTotal = () => {
  const navigate = useNavigate();
  const { id: course_id } = useParams();
  const user = useAuthStore((state) => state.user);
  const { data } = useQuery(
    useUserQueryOptions(Number(course_id), user?.id ?? 0)
  );

  // Referencias por lección
  const refs = useRef<Record<number, HTMLDivElement | null>>({});
  useRestoreScrollById(refs); // Hook que hace el scroll automático al regresar

  const handleIniciarLeccion = async (lessonId: number) => {
    if (!user?.id) return;
    try {
      sessionStorage.setItem("scrollY", window.scrollY.toString());
      sessionStorage.setItem("lessonId", lessonId.toString());
      await iniciarLeccion(lessonId, user.id);
      navigate(`/quizz/${lessonId}`);
    } catch (error) {
      console.error("Error al iniciar la lección:", error);
    }
  };

  return (
    <div className="flex-1 p-8 lg:pl-[256px]">
      <div className="max-w-5xl mx-auto">
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
                <div
                  key={leccion.id}
                  ref={(el) => { refs.current[leccion.id] = el }}
                  className="flex flex-col items-center mb-6"
                >
                  <div className={`relative ${esPar ? 'translate-x-[-25px]' : 'translate-x-[40px]'}`}>
                    <ButtonDuo
                      estaCompletada={estaCompletada}
                      estaBloqueada={estaBloqueada}
                      tooltip={leccion.title}
                      onClick={() => handleIniciarLeccion(leccion.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};