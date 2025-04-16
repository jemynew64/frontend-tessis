import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes } from "react";
import { FaCheck, FaStar, FaLock } from 'react-icons/fa';

//extiendo pero de react 
interface ButtonDuoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    //establesco los tamaños en 3 y despues lo codeo
  size?: "sm" | "md" | "lg"; //tamaños del react 
  estaBloqueada: boolean;
  estaCompletada: boolean;
}
//aca le puedo pasara mi componente se puede poner class el tamaño md es por defecto
// se le pasara un icono 
//el children es cuanto le paso algo escrito por dentro
export const ButtonDuo = ({className, size = "md", estaCompletada, estaBloqueada, ...props}: ButtonDuoProps) => {
    const Icon = estaCompletada ? FaCheck : estaBloqueada ? FaLock : FaStar;

    const baseClasses = twMerge(
        clsx(
            "relative flex items-center justify-center",
            "font-bold rounded-full",
            "transform transition-transform active:translate-y-1 active:border-b-0",
            "shadow-lg",
            "focus:outline-none focus:ring-2 focus:ring-opacity-50",
            "overflow-hidden",
            {
                "w-12 h-12 text-base": size === "sm",
                "w-16 h-16 text-lg": size === "md",
                "w-20 h-20 text-xl": size === "lg",
                // Estilos cuando está bloqueado
                "bg-gradient-to-br from-gray-300 to-gray-100 border-gray-400 cursor-not-allowed text-gray-700": estaBloqueada,
                // Estilos cuando no está bloqueado
                "bg-gradient-to-br from-green-300 to-green-500 border-green-700 hover:brightness-110 cursor-pointer text-white": !estaBloqueada,
                "border-b-4": !estaBloqueada, // Solo mostrar borde inferior si no está bloqueado
                "focus:ring-green-400": !estaBloqueada,
            }
        ),
        className
    );

    return (
        <button className={baseClasses} disabled={estaBloqueada} aria-disabled={estaBloqueada}{...props}
        >
            <span className="relative z-10 drop-shadow-md">
                <Icon className={`text-2xl `} />
            </span>
        </button>
    );
};