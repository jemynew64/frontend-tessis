import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { HTMLAttributes } from "react";
// import { BookText } from "lucide-react"; // Icono estilo guía

interface LessonModuleProps extends HTMLAttributes<HTMLDivElement> {
  stage?: string;
  title: string;
  description?: string; // ✅ nuevo prop opcional
}

export const LessonModule = ({className,stage = "ETAPA 1",title,description,...props}: LessonModuleProps) => {
  const baseClasses = twMerge(
    clsx(
      "bg-lime-500 rounded-xl px-4 py-3 w-full flex justify-between items-center shadow-md",
      className
    )
  );

  return (
    <div className={baseClasses} {...props}>
      {/* Texto a la izquierda */}
      <div>
        <p className="text-xs text-lime-100 uppercase font-semibold">{stage}</p>
        <p className="text-white text-lg font-bold">{title}</p>
        {description && (
          <p className="text-sm text-lime-100 font-medium">{description}</p>
        )}
      </div>

      {/* Botón guía
      <button className="bg-lime-600 hover:bg-lime-700 transition-colors text-white text-sm font-bold rounded-lg px-3 py-1 flex items-center gap-1 border border-lime-700">
        <BookText size={16} />
        GUÍA
      </button> */}
    </div>
  );
};
