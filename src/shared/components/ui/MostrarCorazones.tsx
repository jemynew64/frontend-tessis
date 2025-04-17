import { FaHeart } from 'react-icons/fa'; // Importamos el icono de corazón

interface MostrarCorazonesProps {
  vidas: number;
  className?: string;  // Añadir className como propiedad opcional
}

const MostrarCorazones = ({ vidas, className }: MostrarCorazonesProps) => {
  return (
    <div className={`flex items-center justify-center space-x-3 mb-4 ${className}`}>
      {/* Muestra un número de corazones basado en las vidas restantes */}
      {[...Array(vidas)].map((_, index) => (
        <FaHeart
          key={index}
          className="text-red-500 animate-beat transition-transform transform hover:scale-125"
          style={{
            animationDelay: `${index * 0.1}s`, // Los corazones aparecen de forma escalonada
          }}
        />
      ))}
    </div>
  );
};

export default MostrarCorazones;
