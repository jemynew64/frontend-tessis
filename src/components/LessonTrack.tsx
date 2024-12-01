import LessonButton from './LessonButton';

interface Lesson {
  id: number;
  titulo: string;
  estaBloqueada: boolean;
  estaCompletada: boolean;
  reto?: Array<{
    id: number;
    pregunta: string;
    tipo: string;
    opciones: Array<{
      id: number;
      texto: string;
      esCorrecta: boolean;
    }>;
  }>;
}

interface LessonTrackProps {
  lecciones: Lesson[]; 
  onLeccionSeleccionada: (leccion: Lesson) => void; // Prop que maneja la selección
}

const LessonTrack: React.FC<LessonTrackProps> = ({ lecciones, onLeccionSeleccionada }) => {
  return (
    <div className="flex justify-center items-start w-full py-16 relative">
      {/* Línea de camino visual */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gray-300"></div>

      {/* Contenedor de las lecciones */}
      <div className="flex flex-col items-center gap-4 w-full">
        {lecciones.map((leccion, index) => {
          let transformStyle = '';
          const verticalMovement = index * 10;
          const horizontalMovement =
            index % 2 === 0 ? (index % 4 === 0 ? 0 : 20) : (index % 4 === 1 ? -20 : 0);

          transformStyle = `translateY(${verticalMovement}px) translateX(${horizontalMovement}px)`;

          return (
            <div
              key={leccion.id}
              className="relative mb-4"
              style={{
                transform: transformStyle,
                transition: 'transform 0.5s ease',
              }}
            >
              <div
                className={`relative ${leccion.estaBloqueada ? 'pointer-events-none' : ''}`}
                onClick={() => !leccion.estaBloqueada && onLeccionSeleccionada(leccion)}
              >
                <LessonButton
                  id={leccion.id}
                  titulo={leccion.titulo}
                  estaBloqueada={leccion.estaBloqueada}
                  estaCompletada={leccion.estaCompletada}
                  totalCount={lecciones.length}
                  index={index}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonTrack;
