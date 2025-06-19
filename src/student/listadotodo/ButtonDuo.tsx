import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, useId } from "react";
import { FaCheck, FaStar, FaLock } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { ColorName, colorMap } from "../../shared/utils/color";  // ajusta la ruta

interface ButtonDuoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  estaBloqueada: boolean;
  estaCompletada: boolean;
  tooltip: string;
  color?: ColorName; // usamos el tipo concreto
}

export const ButtonDuo = ({
  className,
  size = "md",
  estaCompletada,
  estaBloqueada,
  tooltip,
  color = "green",
  ...props
}: ButtonDuoProps) => {
  const Icon = estaCompletada ? FaCheck : estaBloqueada ? FaLock : FaStar;
  const tooltipId = useId();

  const lockedClasses =
    "bg-gradient-to-br from-gray-300 to-gray-100 border-gray-400 cursor-not-allowed text-gray-700";

  // aquí usamos el mapa
  const c = colorMap[color];
  const unlockedClasses = clsx(
    "bg-gradient-to-br border-b-4 hover:brightness-110 cursor-pointer text-white",
    c.from,
    c.to,
    c.border,
    c.ring
  );

  const baseClasses = twMerge(
    clsx(
      "relative flex items-center justify-center font-bold rounded-full",
      "transform transition-transform active:translate-y-1 active:border-b-0",
      "shadow-lg",
      "focus:outline-none focus:ring-2 focus:ring-opacity-50",
      "overflow-hidden",
      {
        "w-12 h-12 text-base": size === "sm",
        "w-16 h-16 text-lg": size === "md",
        "w-20 h-20 text-xl": size === "lg",
      }
    ),
    estaBloqueada ? lockedClasses : unlockedClasses,
    className
  );

  return (
    <>
      <button
        className={baseClasses}
        disabled={estaBloqueada}
        aria-disabled={estaBloqueada}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltip}
        {...props}
      >
        <span className="relative z-10 drop-shadow-md">
          <Icon className="text-2xl" />
        </span>
      </button>

      <Tooltip
        id={tooltipId}
        place="top"
        className="!bg-gray-900 !text-white !text-sm !rounded-lg !px-3 !py-2 shadow"
      />
    </>
  );
};
