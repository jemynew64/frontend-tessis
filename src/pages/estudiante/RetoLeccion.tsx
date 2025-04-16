import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import BarraProgreso from '../../shared/components/BarraProgreso'; 
import MostrarCorazones from '../../components/MostrarCorazones'; 
import { IoCloseCircleOutline } from 'react-icons/io5'; 
import { ExitModal } from '../../shared/components/modals/exit-modal'; 
import { useExitModal } from '../../shared/store/use-exit-modal'; 
import { obtenerLeccionConRetos } from '../../services/leccionesService'; 
import { FaHeart } from 'react-icons/fa';
import { Bolt } from 'lucide-react'; // Importar el icono de rayo de Lucide

interface Opcion {
  id: number;
  texto: string;
  esCorrecta: boolean;
}

interface Reto {
  id: number;
  tipo: string;
  pregunta: string;
  opciones: Opcion[];
}

interface LeccionConRetos {
  id: number;
  titulo: string;
  retos: Reto[];
}

const RetoLeccion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const leccionId: number = location.state?.leccionId || 1; 
  const origen = location.state?.origin; 

  const [leccion, setLeccion] = useState<LeccionConRetos | null>(null);
  const [preguntasRestantes, setPreguntasRestantes] = useState<Reto[]>([]);
  const [preguntaActualIndex, setPreguntaActualIndex] = useState<number>(0);
  const [progreso, setProgreso] = useState(0);
  const [vidas, setVidas] = useState(5); 
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
  const [mensajeFelicidades, setMensajeFelicidades] = useState(false); 
  const [isGameOver, setIsGameOver] = useState(false); 
  const [respuestaCorrecta, setRespuestaCorrecta] = useState<boolean | null>(null); // Guardar si la respuesta es correcta o incorrecta

  const { open } = useExitModal(); 

  useEffect(() => {
    const obtenerLeccion = async () => {
      try {
        const data = await obtenerLeccionConRetos(leccionId); 
        setLeccion(data);
        setPreguntasRestantes(data.retos); // Inicializa las preguntas restantes
      } catch (error) {
        console.error('Error al obtener la lección:', error);
      }
    };

    obtenerLeccion();
  }, [leccionId]);

  useEffect(() => {
    // Verificar si el progreso ha alcanzado el 100%
    if (progreso >= 100) {
      setMensajeFelicidades(true);
      setTimeout(() => {
        if (origen === 'matematicas') {
          navigate('/matematicas');
        } else if (origen === 'comunicacion') {
          navigate('/comunicacion');
        } else {
          navigate('/');
        }
      }, 2000); // Redirigir después de 2 segundos
    }
  }, [progreso, navigate, origen]); // Este efecto se ejecuta cada vez que el progreso cambia
  
  const manejarRespuesta = (esCorrecta: boolean) => {
    if (botonDeshabilitado) return;
    setBotonDeshabilitado(true);
    setRespuestaCorrecta(esCorrecta); // Almacenar si la respuesta es correcta o incorrecta
    setTimeout(() => setBotonDeshabilitado(false), 1000);
  
    if (esCorrecta) {
      toast.success('¡Respuesta correcta!');
      setProgreso((prev) => Math.min(prev + (100 / leccion!.retos.length), 100));
  
      // Avanzar a la siguiente pregunta
      if (preguntaActualIndex < preguntasRestantes.length - 1) {
        setPreguntaActualIndex(preguntaActualIndex + 1);
      }
    } else {
      toast.error('¡Respuesta incorrecta!');
      if (vidas > 1) {
        setVidas((prev) => prev - 1);
        // Mantener la pregunta en la lista
        const preguntaIncorrecta = preguntasRestantes[preguntaActualIndex];
        setPreguntasRestantes((prev) => [...prev.filter((pregunta) => pregunta.id !== preguntaIncorrecta.id), preguntaIncorrecta]);
      } else {
        setIsGameOver(true);
        toast.error('¡Game Over!');
      }
    }
  
    // Resetear el color de fondo después de un tiempo corto
    setTimeout(() => {
      setRespuestaCorrecta(null); // Esto restablecerá el color a su estado original
    }, 500); // Cambiar el color durante 1 segundo, luego lo restaura
  };
  
  

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => {
        if (origen === 'matematicas') {
          navigate('/matematicas');
        } else if (origen === 'comunicacion') {
          navigate('/comunicacion');
        } else {
          navigate('/');
        }
      }, 2000); 
    }
  }, [isGameOver, navigate, origen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-200 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl border-4 border-blue-300">
        <div className="flex items-center justify-between mb-4">
          <BarraProgreso porcentaje={progreso} color="bg-gradient-to-r from-green-400 to-green-600" />
          <button
            onClick={() => open()}
            className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
          >
            <IoCloseCircleOutline size={32} />
          </button>
        </div>
  
        <MostrarCorazones vidas={vidas} className="animate-pulse" />
  
        {mensajeFelicidades && !isGameOver && (
          <div className="text-center mb-6 p-6 bg-green-50 border border-green-300 rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              🎉 ¡Felicidades, has completado el reto! 🎉
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-4">
              <span className="text-3xl font-bold text-yellow-500 animate-pulse">+25</span>
              <Bolt className="h-8 w-8 text-yellow-500 animate-bounce" />
              <span className="text-3xl font-bold text-yellow-500 animate-pulse">+50</span>
              <img
                src="/points.svg"
                alt="Points icon"
                className="h-8 w-8 animate-bounce"
              />
            </div>
            <p className="text-lg text-gray-700">
              ¡Lo has hecho muy bien! Redirigiendo...
            </p>
          </div>
        )}
  
        {isGameOver && (
          <div className="text-center p-6 bg-red-50 border border-red-300 rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-2xl font-semibold text-red-600 mb-4 animate-pulse">
              💔 ¡Game Over! 💔
            </h2>
            <div className="flex justify-center items-center mb-4">
              <FaHeart className="text-red-600 h-10 w-10 animate-beat" />
            </div>
            <p className="text-lg text-gray-700">
              ¡Perdiste todas las vidas! Inténtalo nuevamente más tarde.
            </p>
          </div>
        )}
  
        {leccion && preguntasRestantes.length > 0 && !mensajeFelicidades && !isGameOver && (
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-800 underline decoration-wavy decoration-blue-500">
              {preguntasRestantes[preguntaActualIndex]?.pregunta}
            </h3>
            {preguntasRestantes[preguntaActualIndex]?.opciones.map((opcion) => (
              <button
                key={opcion.id}
                onClick={() => manejarRespuesta(opcion.esCorrecta)}
                disabled={botonDeshabilitado}
                className={`block w-full p-3 mb-3 text-white rounded-lg hover:scale-105 transition-transform transform 
                  ${respuestaCorrecta === true ? 'bg-green-500' : respuestaCorrecta === false ? 'bg-red-500 animate-shake' : 'bg-blue-500'}`}
              >
                {opcion.texto}
              </button>
            ))}
          </div>
        )}
      </div>
  
      <Toaster />
  
      <ExitModal
        onConfirm={() => {
          if (origen === "matematicas") {
            navigate("/matematicas");
          } else if (origen === "comunicacion") {
            navigate("/comunicacion");
          } else {
            navigate("/");
          }
        }}
      />
    </div>
  );
};

export default RetoLeccion;
