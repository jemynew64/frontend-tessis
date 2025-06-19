import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";

import { useUserQueryOptions } from "./CursotodoQueryOption";
import { useAuthStore } from "../../shared/store/auth";
import { LearningUnitProgress } from "./LearningUnitProgress";
import { LessonModule } from "./LessonModule";
import { ButtonDuo } from "./ButtonDuo";
import { iniciarLeccion } from "./cursotodo.service";
import type { ColorName } from "../../shared/utils/color";
const UNITS_PER_PAGE = 5;

export const CursoListadosTotal = () => {
  const navigate = useNavigate();
  const { id: course_id } = useParams();
  const user = useAuthStore((state) => state.user);
  const { data } = useQuery(useUserQueryOptions(Number(course_id), user?.id ?? 0));

  //lo de aca es para la paginacion y redireccion
  const refs = useRef<Record<number, HTMLDivElement | null>>({});
  const [paginaActual, setPaginaActual] = useState(1);
  const [scrollPending, setScrollPending] = useState<number | null>(null);

  // 1. Al cargar datos, buscar la unidad que contiene el lessonId almacenado
  useEffect(() => {
    if (!data?.unit) return;

    const storedLessonId = Number(sessionStorage.getItem("lessonId"));
    if (!storedLessonId) return;

    let unidadIndex = 0;
    for (let i = 0; i < data.unit.length; i++) {
      if (data.unit[i].lesson.some((l) => l.id === storedLessonId)) {
        unidadIndex = i;
        break;
      }
    }

    const paginaCorrecta = Math.floor(unidadIndex / UNITS_PER_PAGE) + 1;
    setPaginaActual(paginaCorrecta);
    setScrollPending(storedLessonId); // <- lo guardamos para después hacer scroll
  }, [data]);

  // 2. Una vez se monta esa página, hacemos scroll si tenemos el ref
  useEffect(() => {
    if (scrollPending && refs.current[scrollPending]) {
      refs.current[scrollPending]?.scrollIntoView({ behavior: 'smooth' });
      setScrollPending(null); // limpiamos
    }
  }, [scrollPending, paginaActual]);

  const handleIniciarLeccion = async (lessonId: number) => {
    if (!user?.id) return;
    try {
      sessionStorage.setItem("scrollY", window.scrollY.toString());
      sessionStorage.setItem("lessonId", lessonId.toString());
      sessionStorage.setItem("courseId", course_id!.toString()); 
      await iniciarLeccion(lessonId, user.id);
      navigate(`/quizz/${lessonId}`);
    } catch (error) {
      console.error("Error al iniciar la lección:", error);
    }
  };

  if (!data?.unit) return <p>Cargando curso...</p>;

  const totalUnidades = data.unit.length;
  const totalPaginas = Math.ceil(totalUnidades / UNITS_PER_PAGE);
  const inicio = (paginaActual - 1) * UNITS_PER_PAGE;
  const fin = inicio + UNITS_PER_PAGE;
  const unidadesPaginadas = data.unit.slice(inicio, fin);

  return (
    <div className="flex-1 p-8 lg:pl-[256px]">
      <div className="max-w-5xl mx-auto">
        <LearningUnitProgress>
          {data?.title ?? "Cargando..."}
        </LearningUnitProgress>

        {unidadesPaginadas.map((unidad, unidadIndex) => {
          const realIndex = inicio + unidadIndex;
          const colorProp = (unidad.color ?? "green") as ColorName;
          return (
            <div key={realIndex}>
              <LessonModule
                title={unidad.title}
                description={unidad.description}
                stage={`Unidad ${realIndex + 1}`}
                className=" mb-4"
                color={colorProp} 
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
                        color={colorProp} 
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
          );
        })}

        {/* Paginación de unidades */}
        {totalPaginas > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPaginas }).map((_, i) => (
              <button
                key={i}
                className={`px-4 py-2 mb-10 rounded font-semibold transition ${
                  paginaActual === i + 1
                    ? "bg-lime-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setPaginaActual(i + 1)}
              >
                Página {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
