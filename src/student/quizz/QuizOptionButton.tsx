import { CheckCircle, XCircle } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface QuizOptionButtonProps {
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const QuizOptionButton = ({
  text,
  isSelected,
  isCorrect,
  disabled,
  onClick,
}: QuizOptionButtonProps) => {
    const buttonClass = twMerge(
        clsx(
          "w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-between transition-all duration-300",
          {
            "bg-blue-600 text-white hover:bg-blue-700": !disabled && !isSelected,
            "bg-green-500 text-white animate-pulse": isSelected && isCorrect,
            "bg-red-500 text-white animate-shake": isSelected && !isCorrect,
            // Este bloque solo se aplica cuando el botón NO fue seleccionado pero está deshabilitado
            "bg-gray-300 text-gray-500 cursor-not-allowed": !isSelected && disabled,
          }
        )
      );
      
      

  return (
<button onClick={onClick} disabled={disabled && !isSelected} className={buttonClass}>
<span>{text}</span>
      {isSelected && (
        isCorrect ? (
          <CheckCircle className="ml-2 w-5 h-5" />
        ) : (
          <XCircle className="ml-2 w-5 h-5" />
        )
      )}
    </button>
  );
};
