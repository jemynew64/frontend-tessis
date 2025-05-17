import { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ExitModal } from "../../shared/components/modals/exit-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { useNavigate } from "react-router-dom";
import { QuizOptionButton } from "./QuizOptionButton"; // Ajusta el path si es necesario

// 🎵 Sonidos Cloudinary
// const correctSound = new Audio("https://res.cloudinary.com/dkbydlqen/video/upload/v1745948236/opcion_correcta_vzfox9.wav");
// const incorrectSound = new Audio("https://res.cloudinary.com/dkbydlqen/video/upload/v1745948242/opcion_incorrecta_qgpuct.wav");
const correctSound = new Audio("/audio/opcion_correcta.wav");
const incorrectSound = new Audio("/audio/opcion_incorrecta.wav");

interface Option {
  id: number;
  text: string;
  is_correct: boolean;
}

interface QuizzCardProps {
  image_src?: string | null;
  question: string;
  options: Option[];
  onAnswer?: (isCorrect: boolean) => void;
}

export const QuizzCard = ({ question, options, onAnswer, image_src }: QuizzCardProps) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);
  const { open } = useExitModal();
  const navigate = useNavigate();

  const manejarRespuesta = (opcion: Option) => {
    if (disabled) return;

    setDisabled(true);
    setSelectedOptionId(opcion.id);

    if (opcion.is_correct) {
      toast.success("¡Respuesta correcta!");
      correctSound.play().catch(() => {});
    } else {
      toast.error("¡Respuesta incorrecta!");
      incorrectSound.play().catch(() => {});
      navigator.vibrate?.(200);
    }

    onAnswer?.(opcion.is_correct);

    setTimeout(() => {
      setSelectedOptionId(null);
      setDisabled(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-2xl border-2 border-blue-200 relative animate-fade-in">
      {/* Botón de cerrar para salir */}
      <button
        onClick={() => open()}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
      >
        <IoCloseCircleOutline size={28} />
      </button>

      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-custom-purple">{question}</h2>

      {image_src && (
        <div className="mb-6 max-h-[60vh] overflow-auto rounded-xl border-2 border-gray-200">
          <img
            src={image_src}
            alt="Imagen del reto"
            className="w-full object-contain rounded-xl"
          />
        </div>
      )}

      <div className="space-y-3">
        {options.map((opcion) => {
          return (
        <QuizOptionButton
          key={opcion.id}
          text={opcion.text}
          isSelected={selectedOptionId === opcion.id}
          isCorrect={opcion.is_correct}
          disabled={disabled}
          onClick={() => manejarRespuesta(opcion)}
        />
          );
        })}
      </div>

      {selectedOptionId !== null && (
        <p className="mt-4 text-center text-sm font-semibold text-gray-600">
          {options.find((o) => o.id === selectedOptionId)?.is_correct
            ? "¡Bien hecho!"
            : "Sigue intentándolo"}
        </p>
      )}

      {/* Modal de salida */}
      <ExitModal onConfirm={() => navigate(-1)} />
    </div>
  );
};
