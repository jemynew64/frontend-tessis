import { useQuery } from "@tanstack/react-query";
import { useQuizzQueryOptions } from "./quizzQueryOption";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QuizzType, Aumentarpuntos } from "./quizz.service";
import { Win } from './Win'; // Importamos el componente Win
import { Gameover } from './Gameover'; // Importamos el componente Gameover

import { create } from "zustand";
import { QuizzCard } from "./QuizzCard";

import { useAuthStore } from "../../shared/store/auth"; 
import { completarLeccion } from "./quizz.service";
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
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const { id_lesson } = useParams();
  const leccionid = Number(id_lesson);

  const { data, isLoading, error } = useQuery(useQuizzQueryOptions(leccionid));

  const [cola, setCola] = useState<QuizzType[]>([]);
  const [preguntaActual, setPreguntaActual] = useState<QuizzType | null>(null);
  const [finalizado, setFinalizado] = useState(false);
  const [resultado, setResultado] = useState<{ points: number; experience: number } | null>(null);

  // Contador de intentos
  const [intentosRestantes, setIntentosRestantes] = useState(10);
  const [gameOver, setGameOver] = useState(false); // Estado para controlar Game Over

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

    // Si la respuesta es incorrecta, reduce los intentos restantes
    if (!isCorrect) {
      setIntentosRestantes((prevIntentos) => {
        const nuevosIntentos = prevIntentos - 1;
        if (nuevosIntentos <= 0) {
          setGameOver(true);  // Si los intentos llegan a 0, marca Game Over
        }
        return nuevosIntentos;
      });
    }

    const siguienteCola = [...cola];
    siguienteCola.shift();

    if (!isCorrect) siguienteCola.push(preguntaActual);

    setTimeout(() => {
      if (siguienteCola.length === 0 || gameOver) {
        if (!gameOver) {
          setPreguntaActual(null);
          setFinalizado(true);
          markForRedirect();
          completeSound.play().catch(() => {});

          if (user?.id) {
            completarLeccion(leccionid, user.id).catch(console.error);
            Aumentarpuntos(user.id, leccionid)
              .then(setResultado)
              .catch((err) => {
                console.error("Error al aumentar puntos:", err);
                setResultado({ points: 0, experience: 0 });
              });
          }
        }
      } else {
        setPreguntaActual(siguienteCola[0]);
      }

      setCola(siguienteCola);
    }, 900);
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

  // Redirección automática en caso de Game Over
  useEffect(() => {
    if (gameOver) {
      const timeout = setTimeout(() => {
        navigate(-1); // Redirige después de mostrar el Game Over
      }, 2000); // Espera 2 segundos para mostrar Game Over antes de redirigir
      return () => clearTimeout(timeout);
    }
  }, [gameOver, navigate]);

  if (isLoading) return <p className="text-center">Cargando...</p>;
  if (error || !data) return <p className="text-center text-red-500">Error al cargar el quizz</p>;

  // Mezclar las opciones antes de pasarlas al QuizzCard
  const opcionesMezcladas = preguntaActual
    ? [...preguntaActual.challenge_option].sort(() => Math.random() - 0.5) // Mezclamos las opciones
    : [];

  // Aquí usamos el componente `Win` para mostrar el resultado
  if (finalizado && resultado) {
    return (
      <Win
        points={resultado.points}
        experience={resultado.experience}
        onReturn={() => navigate(-1)} // Función para volver a la lección
      />
    );
  }

  if (gameOver) {
    return (
      <Gameover
        onReturn={() => navigate(-1)} // Función para volver a la lección
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-200 flex flex-col items-center justify-center p-6">
      {preguntaActual && (
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-300">
          <div
            className="h-2 bg-custom-purple transition-all duration-300"
            style={{ width: `${((data.length - cola.length) / data.length) * 100}%` }}
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
