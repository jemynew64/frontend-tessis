import {LearningUnitProgress} from "./LearningUnitProgress"
import { LessonModule } from "./LessonModule";
import { ButtonDuo } from "./ButtonDuo";
import { useQuery } from "@tanstack/react-query";
import { useUserQueryOptions } from "./CursotodoQueryOption";
import { useParams } from 'react-router-dom';
import { useAuthStore } from "../../shared/store/auth"; 

export const CursoListadosTotal = () => {
    const { id:course_id } = useParams(); // <-- capturamos el ID desde la URL
    const user = useAuthStore((state) => state.user); // <-- acceder al user del store

    const { data } = useQuery(
      useUserQueryOptions(Number(course_id), user?.id ?? 0) // fallback temporal para evitar error de tipo
    );    
    // Agregar un console.log para ver el contenido de data
    console.log("ID del mundo recibido:", course_id);
    console.log("Datos recibidos:", JSON.stringify(data, null, 2));
    return (
      <>
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

            {unidad.lesson.map((leccion) => {
              const progreso = leccion.lesson_progress?.[0];
              const estaCompletada = progreso?.completed === true;
              const estaBloqueada = false; // Aquí puedes añadir tu lógica si deseas bloquear lecciones
              
              return (
                <div key={leccion.id} className="mb-4">
                  <ButtonDuo
                    estaCompletada={estaCompletada}
                    estaBloqueada={estaBloqueada}
                    tooltip={leccion.title} // ✅ nuevo prop
                    onClick={() => console.log("Abrir lección", leccion.id)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </>
    );
  };