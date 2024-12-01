import { Bolt, Heart } from 'lucide-react';

type ProgresoUsuarioProps = {
  puntos: number;
  vidas: number;
};

export const UserProgress = ({ puntos, vidas }: ProgresoUsuarioProps) => {
  return (
    <div className="bg-white p-2 rounded-lg shadow-md fixed top-0 left-0 right-0 w-full lg:static lg:w-auto lg:p-4 lg:rounded-lg lg:shadow-md z-50 flex justify-center lg:flex-col items-center lg:items-start">
      <div className="flex items-center space-x-2 mx-4">
        <span className="text-gray-600 flex items-center">
          <Bolt className="h-5 w-5 text-yellow-500 mr-1" />
          Puntos:
        </span>
        <span className="text-lg font-bold text-blue-600">{puntos}</span>
      </div>

      <div className="flex items-center space-x-2 mx-4">
        <span className="text-gray-600 flex items-center">
          <Heart className="h-5 w-5 text-red-500 mr-1" />
          Vidas:
        </span>
        <span className="text-lg font-bold text-red-600">{vidas}/5</span>
      </div>
    </div>
  );
};
