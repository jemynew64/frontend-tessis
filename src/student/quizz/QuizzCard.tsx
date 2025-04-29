import { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ExitModal } from "../../shared/components/modals/exit-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { useNavigate } from "react-router-dom";

// 🎵 Sonidos Cloudinary
const correctSound = new Audio("https://res.cloudinary.com/dkbydlqen/video/upload/v1745948236/opcion_correcta_vzfox9.wav");
const incorrectSound = new Audio("https://res.cloudinary.com/dkbydlqen/video/upload/v1745948242/opcion_incorrecta_qgpuct.wav");

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
      correctSound.play().catch(() => {}); // 🎵 sonido correcto
      // navigator.vibrate?.(100); // (opcional vibración corta)
    } else {
      toast.error("¡Respuesta incorrecta!");
      incorrectSound.play().catch(() => {}); // 🎵 sonido incorrecto
      navigator.vibrate?.(200); // vibración larga si falla
    }

    onAnswer?.(opcion.is_correct);

    setTimeout(() => {
      setSelectedOptionId(null);
      setDisabled(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200 relative">
      {/* Botón de cerrar para salir */}
      <button
        onClick={() => open()}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
      >
        <IoCloseCircleOutline size={28} />
      </button>

      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">{question}</h2>

      {image_src && (
        <div className="mb-6 max-h-[70vh] overflow-auto rounded-lg border">
          <img
            src={image_src}
            alt="Imagen del reto"
            className="w-full object-contain"
          />
        </div>
      )}

      {options.map((opcion) => {
        const isSelected = opcion.id === selectedOptionId;
        const isCorrect = opcion.is_correct;

        let buttonClasses = "w-full mb-3 py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ";

        if (selectedOptionId === null) {
          buttonClasses += "bg-blue-600 hover:bg-blue-700";
        } else {
          if (isSelected && isCorrect) {
            buttonClasses += "bg-green-500 animate-pulse"; // Correcto
          } else if (isSelected && !isCorrect) {
            buttonClasses += "bg-red-500 animate-shake"; // Incorrecto
          } else {
            buttonClasses += "bg-blue-600 opacity-50"; // Otros apagados
          }
        }

        return (
          <button
            key={opcion.id}
            onClick={() => manejarRespuesta(opcion)}
            disabled={disabled}
            className={buttonClasses}
          >
            {opcion.text}
          </button>
        );
      })}

      {/* Modal de salida */}
      <ExitModal onConfirm={() => navigate(-1)} />
    </div>
  );
};
