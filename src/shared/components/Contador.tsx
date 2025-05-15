import { useEffect, useState } from "react";

interface CountdownToMidnightProps {
  label?: string;
  className?: string;
}

export const Contador = ({ label = "", className = "" }: CountdownToMidnightProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0); // Día siguiente a las 00:00

      const diffMs = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // Ejecutar inmediatamente
    const interval = setInterval(updateCountdown, 1000); // Actualizar cada segundo
    return () => clearInterval(interval); // Limpiar al desmontar
  }, []);

  return (
    <span className={`text-xs text-orange-500 font-medium ${className}`}>
      {label && <span>{label} </span>}
      {timeLeft}
    </span>
  );
};
