import { FaHeart } from 'react-icons/fa'; // Importamos el icono de corazón

const MostrarCorazones = ({ vidas }: { vidas: number }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-4">
      {/* Muestra un número de corazones basado en las vidas restantes */}
      {[...Array(vidas)].map((_, index) => (
        <FaHeart key={index} className="text-red-500" />
      ))}
    </div>
  );
};

export default MostrarCorazones;
