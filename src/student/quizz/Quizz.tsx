import { useQuery } from "@tanstack/react-query";
import { useQuizzQueryOptions } from "./quizzQueryOption";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QuizzType,Aumentarpuntos } from "./quizz.service";
// import { UserMissionType } from "../../shared/interfaces/UserMissionSchema";
import { Bolt } from 'lucide-react';

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
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const { id_lesson } = useParams();
  const leccionid = Number(id_lesson);

  const { data, isLoading, error } = useQuery(useQuizzQueryOptions(leccionid));

  const [cola, setCola] = useState<QuizzType[]>([]);
  const [preguntaActual, setPreguntaActual] = useState<QuizzType | null>(null);
  const [finalizado, setFinalizado] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [resultado, setResultado] = useState<{ points: number; experience: number } | null>(null);

  // Contador de intentos
  const [intentosRestantes, setIntentosRestantes] = useState(8);
  const [gameOver, setGameOver] = useState(false); // Estado para controlar Game Over

  const { shouldRedirect, markForRedirect, reset } = useSafeRedirect();

  useEffect(() => {
    if (data?.length) {
      setCola([...data]);
      setPreguntaActual(data[0]);
      setFinalizado(false);
      setMostrarBoton(false);
    }
    return () => reset();
  }, [data, reset, location.key]);

  const handleAnswer = (isCorrect: boolean) => {
    if (!preguntaActual || gameOver) return;  // No hacer nada si el juego ya terminó o si no hay preguntas

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

  // Mostrar botón después de unos segundos en pantalla final
  useEffect(() => {
    if (finalizado) {
      const timeout = setTimeout(() => {
        setMostrarBoton(true);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [finalizado, location.key]);

  // Mostrar la pantalla de Game Over si se agotaron los intentos
  useEffect(() => {
    if (gameOver) {
      const timeout = setTimeout(() => {
        navigate(-1); // Redirigir después de mostrar el Game Over
      }, 2000); // Esperar 2 segundos para mostrar Game Over antes de redirigir
      return () => clearTimeout(timeout);
    }
  }, [gameOver, navigate]);

  if (isLoading) return <p className="text-center">Cargando...</p>;
  if (error || !data) return <p className="text-center text-red-500">Error al cargar el quizz</p>;

  // Mezclar las opciones antes de pasarlas al QuizzCard
  const opcionesMezcladas = preguntaActual
    ? [...preguntaActual.challenge_option].sort(() => Math.random() - 0.5) // Mezclamos las opciones
    : [];

  if (finalizado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-xl font-semibold text-white space-y-4 bg-gradient-to-tr from-green-300 via-green-00 to-green-700">
        <div className="mb-6 text-4xl font-bold text-black">🎉 ¡Has completado correctamente todas las preguntas!</div>

        {resultado && (


        <div className="text-base space-y-6 text-center">
          {/* Puntos */}
          <div className="flex items-center justify-center gap-4 mb-4 bg-purple-600/65 p-4 rounded-lg shadow-lg">
            <img src="/points.svg" alt="Puntos" className="w-10 h-10 object-contain" />
            <span className="font-semibold text-lg text-gray-800">Puntos obtenidos:</span>
            <span className="font-extrabold text-yellow-400 text-4xl">
            {resultado.points}
            </span>
            <span className="font-medium text-gray-800 text-xl">POINTS</span>
          </div>

          {/* Experiencia */}
          <div className="flex items-center justify-center gap-4 mb-4 bg-purple-600/70 p-4 rounded-lg shadow-lg">
            <Bolt className="w-8 h-8 text-yellow-500" />
            <span className="font-semibold text-lg text-gray-800">Experiencia obtenida:</span>
            <span className="font-extrabold text-yellow-400 text-4xl">
            {resultado.points}
            </span>
            <span className="font-medium text-gray-800 text-xl">EXP</span>
          </div>
        </div>
        )}

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

  if (gameOver) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-xl font-semibold text-red-600 space-y-4">
        <h2>Game Over</h2>
        <p>Lo siento, se han agotado tus intentos.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-5 py-2 bg-gray-600 text-white rounded-lg text-base hover:bg-gray-700 transition"
        >
          Volver a la lección
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-200 flex flex-col items-center justify-center p-6 ">
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
          options={opcionesMezcladas} // Pasamos las opciones mezcladas
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};
