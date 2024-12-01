import { Link } from 'react-router-dom';
import { FaCheck, FaStar, FaLock } from 'react-icons/fa';

interface LessonButtonProps {
  id: number;
  titulo: string;
  estaBloqueada: boolean;
  estaCompletada: boolean;
  totalCount: number;
  index: number;
}

const LessonButton = ({ id, titulo, estaBloqueada, estaCompletada, totalCount, index }: LessonButtonProps) => {
  const Icon = estaCompletada ? FaCheck : estaBloqueada ? FaLock : FaStar;

  // Cálculo para la posición de cada ícono, para el "camino"
  const rightPosition = (index / totalCount) * 100;

  return (
    <Link to={`/lesson/${id}`} className="relative mb-4 flex items-center justify-center">
      <div
        className="flex flex-col items-center justify-center relative"
        style={{
          marginLeft: `${rightPosition}%`, // Ajusta la posición de cada lección en el "camino"
        }}
      >
        <button
          className={`w-16 h-16 rounded-full flex items-center justify-center 
            ${estaBloqueada ? 'bg-gray-400' : 'bg-green-500'} shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-110`}
          disabled={estaBloqueada}
          style={{
            boxShadow: estaBloqueada
              ? 'inset 0px 2px 5px rgba(0,0,0,0.2), 0px 4px 6px rgba(0,0,0,0.2)'
              : '0px 10px 20px rgba(0, 0, 0, 0.15), 0px 5px 15px rgba(0, 0, 0, 0.15)',
            background: estaBloqueada
              ? 'linear-gradient(145deg, #f0f0f0, #e0e0e0)'  // Sombra más sutil para los bloqueados
              : 'linear-gradient(145deg, #6ee7b7, #34d399)', // Gradiente verde para las lecciones
          }}
        >
          <Icon className={`text-2xl ${estaBloqueada ? 'text-gray-700' : 'text-white'}`} />
        </button>
        {/* Mantener el color del texto del título con texto blanco cuando no está bloqueado */}
        <p className={`mt-2 text-center text-lg ${estaBloqueada ? 'text-gray-500' : 'text-gray-900'}`}>{titulo}</p>
      </div>
    </Link>
  );
};

export default LessonButton;
