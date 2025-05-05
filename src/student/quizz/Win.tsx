import { Bolt } from 'lucide-react';

interface WinProps {
  points: number;
  experience: number;
  onReturn: () => void;
}

export const Win = ({ points, experience, onReturn }: WinProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-xl font-semibold text-white space-y-4 bg-gradient-to-tr from-green-500 via-green-600 to-green-700 p-4">
      <div className="mb-6 text-4xl font-bold text-white sm:text-3xl md:text-4xl">🎉 ¡Has completado correctamente todas las preguntas!</div>

      <div className="text-base space-y-6 text-center sm:w-full md:w-4/5 lg:w-3/5">
        {/* Puntos */}
        <div className="flex items-center justify-center gap-4 mb-4 bg-purple-500/80 p-4 rounded-lg shadow-lg sm:p-3 md:p-4">
          <img src="/points.svg" alt="Puntos" className="w-10 h-10 object-contain sm:w-8 sm:h-8" />
          <span className="font-semibold text-lg text-white">Puntos obtenidos:</span>
          <span className="font-extrabold text-yellow-300 text-4xl sm:text-3xl">
            {points}
          </span>
          <span className="font-medium text-white text-xl">POINTS</span>
        </div>

        {/* Experiencia */}
        <div className="flex items-center justify-center gap-4 mb-4 bg-purple-600/80 p-4 rounded-lg shadow-lg sm:p-3 md:p-4">
          <Bolt className="w-8 h-8 text-yellow-400 sm:w-6 sm:h-6" />
          <span className="font-semibold text-lg text-white">Experiencia obtenida:</span>
          <span className="font-extrabold text-yellow-300 text-4xl sm:text-3xl">
            {experience}
          </span>
          <span className="font-medium text-white text-xl">EXP</span>
        </div>
      </div>

      <button
        onClick={onReturn}
        className="mt-4 px-5 py-2 bg-green-800 text-white rounded-lg text-base hover:bg-green-900 transition sm:w-full md:w-auto"
      >
        Volver a la lección
      </button>
    </div>
  );
};
