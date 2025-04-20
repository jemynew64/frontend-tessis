import { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ExitModal } from "../../shared/components/modals/exit-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { useNavigate } from "react-router-dom";

interface Option {
  id: number;
  text: string;
  is_correct: boolean;
}

interface QuizzCardProps {
  question: string;
  options: Option[];
  onAnswer?: (isCorrect: boolean) => void;
}

export const QuizzCard = ({ question, options, onAnswer }: QuizzCardProps) => {
  const [disabled, setDisabled] = useState(false);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState<boolean | null>(null);
  const { open } = useExitModal();
  const navigate = useNavigate();

  const manejarRespuesta = (isCorrect: boolean) => {
    if (disabled) return;

    setDisabled(true);
    setRespuestaCorrecta(isCorrect);

    if (isCorrect) {
      toast.success("¡Respuesta correcta!");
    } else {
      toast.error("¡Respuesta incorrecta!");
    }

    onAnswer?.(isCorrect);

    setTimeout(() => {
      setRespuestaCorrecta(null);
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

      <h2 className="text-xl font-semibold mb-4 text-gray-800">{question}</h2>

      {options.map((opcion) => (
        <button
          key={opcion.id}
          onClick={() => manejarRespuesta(opcion.is_correct)}
          disabled={disabled}
          className={`w-full mb-3 py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 
            ${respuestaCorrecta === true && opcion.is_correct ? 'bg-green-500'
            : respuestaCorrecta === false && opcion.is_correct ? 'bg-green-500'
            : respuestaCorrecta === false && !opcion.is_correct ? 'bg-red-500 animate-shake'
            : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {opcion.text}
        </button>
      ))}

      {/* Modal de salida */}
      <ExitModal onConfirm={() => navigate(-1)} />
    </div>
  );
};