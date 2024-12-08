import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import BarraProgreso from '../components/BarraProgreso';
import MostrarCorazones from '../components/MostrarCorazones';
import { Bolt } from 'lucide-react'; // Importar el icono de rayo de Lucide
import { FaHeart } from 'react-icons/fa'; // Icono de corazón
import { IoCloseCircleOutline } from 'react-icons/io5'; // Icono de salida (x)
import { ExitModal } from '../components/modals/exit-modal'; // Modal de salida
import { useExitModal } from '../store/use-exit-modal'; // Estado para abrir el modal

interface Opcion {
  id: number;
  texto: string;
  esCorrecta: boolean;
}

interface Pregunta {
  id: number;
  pregunta: string;
  opciones: Opcion[];
}

const RetoLeccion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reto: Pregunta[] = location.state?.reto || []; // Recibe el JSON desde la navegación
  const origen = location.state?.origin; // Lee el origen de la página (matematicas o comunicacion)

  const [preguntaActual, setPreguntaActual] = useState<Pregunta | null>(reto[0]);
  const [preguntasRestantes, setPreguntasRestantes] = useState<Pregunta[]>(reto);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState<number>(0);
  const [progreso, setProgreso] = useState(0);
  const [vidas, setVidas] = useState(5);
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [mensajeFelicidades, setMensajeFelicidades] = useState(false);

  const { open } = useExitModal(); // Hook para abrir el modal de salida

  const manejarRespuesta = (preguntaId: number, esCorrecta: boolean) => {
    if (botonDeshabilitado || isGameOver || mensajeFelicidades) return;

    setBotonDeshabilitado(true);
    setTimeout(() => {
      setBotonDeshabilitado(false);
    }, 1000);

    if (esCorrecta) {
      setRespuestasCorrectas((prev) => prev + 1);
      toast.success('¡Respuesta correcta!', {
        duration: 3000,
        position: 'top-center',
        style: { background: '#28a745', color: '#fff' },
      });

      const porcentajeProgreso = Math.min(
        (respuestasCorrectas + 1) / reto.length * 100,
        100
      );
      setProgreso(porcentajeProgreso);
      setPreguntasRestantes((prev) => prev.filter((pregunta) => pregunta.id !== preguntaId));
    } else {
      if (vidas > 1) {
        setVidas((prev) => prev - 1);
        toast.error('¡Respuesta incorrecta! Intenta nuevamente.', {
          duration: 3000,
          position: 'top-center',
          style: { background: '#dc3545', color: '#fff' },
        });
      } else {
        setIsGameOver(true);
        toast.error('¡Game Over! Has perdido todas tus vidas.', {
          duration: 3000,
          position: 'top-center',
          style: { background: '#dc3545', color: '#fff' },
        });
      }

      const preguntaIncorrecta = preguntasRestantes.find((pregunta) => pregunta.id === preguntaId);
      if (preguntaIncorrecta) {
        setPreguntasRestantes((prev) => [...prev.filter((pregunta) => pregunta.id !== preguntaId), preguntaIncorrecta]);
      }
    }

    if (preguntasRestantes.length === 1) {
      setPreguntaActual(preguntasRestantes[0]);
    } else {
      const siguientePregunta = preguntasRestantes.find((pregunta) => pregunta.id !== preguntaId) || null;
      setPreguntaActual(siguientePregunta);
    }
  };

  const todasLasPreguntasRespondidas = preguntasRestantes.length === 0 && respuestasCorrectas === reto.length;

  useEffect(() => {
    if ((isGameOver || todasLasPreguntasRespondidas) && !mensajeFelicidades) {
      setMensajeFelicidades(true);
      setTimeout(() => {
        if (origen === 'matematicas') {
          navigate('/matematicas');
        } else if (origen === 'comunicacion') {
          navigate('/comunicacion');
        } else {
          navigate('/'); // Si no se encuentra el origen, redirige al login o a la página principal
        }
      }, 2000);
    }
  }, [isGameOver, todasLasPreguntasRespondidas, mensajeFelicidades, origen, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <BarraProgreso porcentaje={progreso} color="bg-green-500" />
          {/* Icono de salida */}
          <button onClick={() => open()} className="text-red-500 hover:text-red-700">
        <IoCloseCircleOutline size={32} />
      </button>
        </div>

        <MostrarCorazones vidas={vidas} />

        {mensajeFelicidades && !isGameOver && (
          <div className="text-center mb-6 p-6 bg-green-50 border border-green-300 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              ¡Felicidades, has completado el reto!
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-4">
              <span className="text-3xl font-bold text-yellow-500 animate-pulse">+25</span>
              <Bolt className="h-8 w-8 text-yellow-500 animate-bounce" />
              <span className="text-3xl font-bold text-yellow-500 animate-pulse">+50</span>
              <img src="/points.svg" alt="Points icon" className="h-8 w-8 animate-bounce" />
            </div>
            <p className="text-lg text-gray-700">¡Lo has hecho muy bien! Redirigiendo...</p>
          </div>
        )}

        {isGameOver && (
          <div className="text-center p-6 bg-red-50 border border-red-300 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-red-600 mb-4 animate-pulse">¡Game Over!</h2>
            <div className="flex justify-center items-center mb-4">
              <FaHeart className="text-red-600 h-10 w-10 animate-bounce" />
            </div>
            <p className="text-lg text-gray-700">¡Perdiste todas las vidas! Inténtalo nuevamente más tarde.</p>
          </div>
        )}

        {!isGameOver && !mensajeFelicidades && preguntaActual && (
          <div>
            <h3 className="text-lg font-medium mb-3">{preguntaActual.pregunta}</h3>
            {preguntaActual.opciones.map((opcion) => (
              <button
                key={opcion.id}
                onClick={() => manejarRespuesta(preguntaActual.id, opcion.esCorrecta)}
                className="block w-full p-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {opcion.texto}
              </button>
            ))}
          </div>
        )}
      </div>
      <Toaster />
      {/* Modal de salida */}
      <ExitModal
        onConfirm={() => {
          if (origen === "matematicas") {
            navigate("/matematicas");
          } else if (origen === "comunicacion") {
            navigate("/comunicacion");
          } else {
            navigate("/"); // Ruta predeterminada
          }
        }}
      />    
      </div>
  );
};

export default RetoLeccion;