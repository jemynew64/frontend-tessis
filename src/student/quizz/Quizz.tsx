import { useQuery } from "@tanstack/react-query";
import { useQuizzQueryOptions } from "./quizzQueryOption";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QuizzType,Aumentarpuntos } from "./quizz.service";
// import { UserMissionType } from "../../shared/interfaces/UserMissionSchema";

import { create } from "zustand";
import { QuizzCard } from "./QuizzCard";

import { useAuthStore } from "../../shared/store/auth"; 
import { completarLeccion } from "./quizz.service";
// import { CompletarMision } from "./quizz.service"
const completeSound = new Audio("https://res.cloudinary.com/dkbydlqen/video/upload/v1745948220/sonido_completar_quizz_he8ahr.wav");

// 🔐 Estado global como en ExitModal (persistente durante la sesión)
type SafeRedirectState = {
  shouldRedirect: boolean;
  markForRedirect: () => void;
  reset: () => void;
};

const useSafeRedirect = create<SafeRedirectState>((set) => ({
  shouldRedirect: false,
  markForRedirect: () => set({ shouldRedirect: true }),
  reset: () => set({ shouldRedirect: false }),
}));

export const Quizz = () => {
  // en el user.id esta el id que nesecito para el completar leccion
  const user = useAuthStore((state) => state.user);


  const navigate = useNavigate();
  const location = useLocation(); // 👈 Detecta cambio de navegación

  const { id_lesson } = useParams();
  const leccionid = Number(id_lesson);

  const { data, isLoading, error } = useQuery(useQuizzQueryOptions(leccionid));

  const [cola, setCola] = useState<QuizzType[]>([]);
  const [preguntaActual, setPreguntaActual] = useState<QuizzType | null>(null);
  const [finalizado, setFinalizado] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(false); // 👈 Nuevo estado

  const { shouldRedirect, markForRedirect, reset } = useSafeRedirect();

  // 🔁 Inicializar quizz o reiniciar si el usuario vuelve a esta ruta
  useEffect(() => {
    if (data?.length) {
      setCola([...data]);
      setPreguntaActual(data[0]);
      setFinalizado(false);
      setMostrarBoton(false);
    }
    return () => reset();
  }, [data, reset, location.key]); // 👈 clave: reinicia al volver

  const handleAnswer = (isCorrect: boolean) => {
    if (!preguntaActual) return;

    const siguienteCola = [...cola];
    siguienteCola.shift();

    if (!isCorrect) siguienteCola.push(preguntaActual);

    if (siguienteCola.length === 0) {
      setPreguntaActual(null);
      setFinalizado(true);
      markForRedirect();
      completeSound.play().catch(() => {});
      
      if (user?.id) {
        completarLeccion(leccionid, user.id).catch((err) =>
          console.error("Error al completar lección:", err)
        );
        Aumentarpuntos(user.id, leccionid).catch((err) =>
          console.error("Error al aumentar puntos:", err)
        );
        // const misionusuario: UserMissionType = {
        //   user_id: user.id,
        //   depsueslo completo 
        // }
        // CompletarMision()

      }
    } else {
      setPreguntaActual(siguienteCola[0]);
    }

    setCola(siguienteCola);
  };

  // Redirección segura por si se quedó en estado "finalizado"
  useEffect(() => {
    if (shouldRedirect) {
      const timeout = setTimeout(() => {
        reset();
        navigate(-1);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [shouldRedirect, navigate, reset]);

  // 👇 Mostrar botón después de unos segundos en pantalla final
  useEffect(() => {
    if (finalizado) {
      const timeout = setTimeout(() => {
        setMostrarBoton(true);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [finalizado, location.key]);

  if (isLoading) return <p className="text-center">Cargando...</p>;
  if (error || !data) return <p className="text-center text-red-500">Error al cargar el quizz</p>;

  if (finalizado) {
    return (
      <div className="min-h-screen flex flex-col gap-6 items-center justify-center text-2xl font-semibold text-green-600">
        🎉 ¡Has completado correctamente todas las preguntas!
        {mostrarBoton && (
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg text-base hover:bg-blue-700 transition"
          >
            Volver a la lección
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-200 flex items-center justify-center p-6">
      {preguntaActual && (
        <QuizzCard
          question={preguntaActual.question}
          image_src={preguntaActual.image_src}
          options={preguntaActual.challenge_option.map((op) => ({
            id: op.id,
            text: op.text,
            is_correct: op.is_correct,
          }))}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};
