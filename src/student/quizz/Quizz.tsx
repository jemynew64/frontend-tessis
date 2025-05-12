import { useQuery } from "@tanstack/react-query";
import { useQuizzQueryOptions } from "./quizzQueryOption";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QuizzType } from "./quizz.service";
import { Win } from "./Win";
import { Gameover } from "./Gameover";
import { create } from "zustand";
import { QuizzCard } from "./QuizzCard";
import { useAuthStore } from "../../shared/store/auth";

// ✅ Mutaciones externas
import {
  useAumentarPuntosMutation,
  useCompletarLeccionMutation,
  useEnviarEstadisticasMutation,
} from "./quizzMutations";

const completeSound = new Audio("https://res.cloudinary.com/dkbydlqen/video/upload/v1745948220/sonido_completar_quizz_he8ahr.wav");

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
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { id_lesson } = useParams();
  const leccionid = Number(id_lesson);

  const { data, isLoading, error } = useQuery(useQuizzQueryOptions(leccionid));

  const completarLeccion = useCompletarLeccionMutation();
  const aumentarPuntos = useAumentarPuntosMutation();
  const enviarEstadisticas = useEnviarEstadisticasMutation();

  const [cola, setCola] = useState<QuizzType[]>([]);
  const [preguntaActual, setPreguntaActual] = useState<QuizzType | null>(null);
  const [finalizado, setFinalizado] = useState(false);
  const [resultado, setResultado] = useState<{ points: number; experience: number } | null>(null);

  const [correctas, setCorrectas] = useState(0);
  const [incorrectas, setIncorrectas] = useState(0);
  const [startTime] = useState(Date.now());

  const [intentosRestantes, setIntentosRestantes] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const { shouldRedirect, markForRedirect, reset } = useSafeRedirect();

  useEffect(() => {
    if (data?.length) {
      setCola([...data]);
      setPreguntaActual(data[0]);
      setFinalizado(false);
    }
    return () => reset();
  }, [data, reset, location.key]);

  const handleAnswer = (isCorrect: boolean) => {
    if (!preguntaActual || gameOver) return;

    if (isCorrect) {
      setCorrectas((prev) => prev + 1);
    } else {
      setIncorrectas((prev) => prev + 1);
      setIntentosRestantes((prev) => {
        const nuevo = prev - 1;
        if (nuevo <= 0) setGameOver(true);
        return nuevo;
      });
    }

    const siguienteCola = [...cola];
    siguienteCola.shift();
    if (!isCorrect) siguienteCola.push(preguntaActual);

    setTimeout(() => {
      if (siguienteCola.length === 0 || gameOver) {
        if (!gameOver && user?.id) {
          setPreguntaActual(null);
          setFinalizado(true);
          markForRedirect();
          completeSound.play().catch(() => {});

          completarLeccion.mutate({ lessonId: leccionid, userId: user.id });

          aumentarPuntos.mutate(
            { lessonId: leccionid, userId: user.id },
            {
              onSuccess: setResultado,
              onError: () => {
                setResultado({ points: 0, experience: 0 });
              },
            }
          );
        }
      } else {
        setPreguntaActual(siguienteCola[0]);
      }
      setCola(siguienteCola);
    }, 900);
  };

  useEffect(() => {
    if (finalizado && resultado && data) {
      const duracionMs = Date.now() - startTime;
      const minutos = Math.ceil(duracionMs / 60000);
      const fuePerfecta = incorrectas === 0 && correctas === data.length;

      const statsPayload = {
        lessons_completed: 1,
        lessons_perfect: fuePerfecta ? 1 : 0,
        challenges_completed: data.length,
        correct_answers: correctas,
        wrong_answers: incorrectas,
        experience_gained: resultado.experience,
        points_gained: resultado.points,
        time_spent_minutes: minutos,
        quizzes_completed: 1,
      };

      enviarEstadisticas.mutate(statsPayload);
    }
  }, [finalizado, resultado, correctas, incorrectas, startTime, data]);

  useEffect(() => {
    if (shouldRedirect) {
      const timeout = setTimeout(() => {
        reset();
        navigate(-1);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [shouldRedirect, navigate, reset]);

  useEffect(() => {
    if (gameOver) {
      const timeout = setTimeout(() => {
        navigate(-1);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [gameOver, navigate]);

  if (isLoading) return <p className="text-center">Cargando...</p>;
  if (error || !data) return <p className="text-center text-red-500">Error al cargar el quizz</p>;

  const opcionesMezcladas = preguntaActual
    ? [...preguntaActual.challenge_option].sort(() => Math.random() - 0.5)
    : [];

  if (finalizado && resultado) {
    return (
      <Win
        points={resultado.points}
        experience={resultado.experience}
        onReturn={() => navigate(-1)}
      />
    );
  }

  if (gameOver) {
    return <Gameover onReturn={() => navigate(-1)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-200 flex flex-col items-center justify-center p-6">
      {preguntaActual && (
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-300">
          <div
            className="h-2 bg-custom-purple transition-all duration-300"
            style={{
              width: `${((data.length - cola.length) / data.length) * 100}%`,
            }}
          ></div>
        </div>
      )}

      <div className="text-center text-xl mb-4">
        <p>Intentos restantes: {intentosRestantes}</p>
      </div>

      {preguntaActual && (
        <QuizzCard
          question={preguntaActual.question}
          image_src={preguntaActual.image_src}
          options={opcionesMezcladas}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};
