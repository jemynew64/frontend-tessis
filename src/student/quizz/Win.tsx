import { Bolt } from 'lucide-react';

interface WinProps {
  points: number;
  experience: number;
  onReturn: () => void;
}

export const Win = ({ points, experience, onReturn }: WinProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-xl font-semibold text-white space-y-4 bg-gradient-to-tr from-green-300 via-green-00 to-green-700">
      <div className="mb-6 text-4xl font-bold text-black">🎉 ¡Has completado correctamente todas las preguntas!</div>

      <div className="text-base space-y-6 text-center">
        {/* Puntos */}
        <div className="flex items-center justify-center gap-4 mb-4 bg-purple-600/65 p-4 rounded-lg shadow-lg">
          <img src="/points.svg" alt="Puntos" className="w-10 h-10 object-contain" />
          <span className="font-semibold text-lg text-gray-800">Puntos obtenidos:</span>
          <span className="font-extrabold text-yellow-400 text-4xl">
            {points}
          </span>
          <span className="font-medium text-gray-800 text-xl">POINTS</span>
        </div>

        {/* Experiencia */}
        <div className="flex items-center justify-center gap-4 mb-4 bg-purple-600/70 p-4 rounded-lg shadow-lg">
          <Bolt className="w-8 h-8 text-yellow-500" />
          <span className="font-semibold text-lg text-gray-800">Experiencia obtenida:</span>
          <span className="font-extrabold text-yellow-400 text-4xl">
            {experience}
          </span>
          <span className="font-medium text-gray-800 text-xl">EXP</span>
        </div>
      </div>

      <button
        onClick={onReturn}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg text-base hover:bg-blue-700 transition"
      >
        Volver a la lección
      </button>
    </div>
  );
};
