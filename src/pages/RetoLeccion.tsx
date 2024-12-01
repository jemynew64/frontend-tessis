import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';  // Importar toast y Toaster
import BarraProgreso from '../components/BarraProgreso';
import { ExitModal } from '../components/modals/exit-modal'; // Modal de salida
import MostrarCorazones from '../components/MostrarCorazones'; // Asegúrate de importar el nuevo componente

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
  const reto: Pregunta[] = [
    {
      id: 1,
      pregunta: "¿Cuánto es 3 x 4?",
      opciones: [
        { id: 1, texto: "12", esCorrecta: true },
        { id: 2, texto: "10", esCorrecta: false },
        { id: 3, texto: "14", esCorrecta: false }
      ]
    },
    {
      id: 2,
      pregunta: "¿Cuánto es 6 x 5?",
      opciones: [
        { id: 1, texto: "30", esCorrecta: true },
        { id: 2, texto: "28", esCorrecta: false },
        { id: 3, texto: "35", esCorrecta: false }
      ]
    },
    {
      id: 3,
      pregunta: "¿Cuánto es 2 x 8?",
      opciones: [
        { id: 1, texto: "16", esCorrecta: true },
        { id: 2, texto: "14", esCorrecta: false },
        { id: 3, texto: "18", esCorrecta: false }
      ]
    },
    {
      id: 4,
      pregunta: "¿Cuánto es 12 x 1?",
      opciones: [
        { id: 1, texto: "12", esCorrecta: true },
        { id: 2, texto: "14", esCorrecta: false },
        { id: 3, texto: "18", esCorrecta: false }
      ]
    },
    {
      id: 5,
      pregunta: "¿Cuánto es 1 x 8?",
      opciones: [
        { id: 1, texto: "8", esCorrecta: true },
        { id: 2, texto: "14", esCorrecta: false },
        { id: 3, texto: "18", esCorrecta: false }
      ]
    },
  ];

  const [preguntaActual, setPreguntaActual] = useState<Pregunta | null>(reto[0]);
  const [preguntasRestantes, setPreguntasRestantes] = useState<Pregunta[]>(reto);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState<number>(0);
  const [progreso, setProgreso] = useState(0);
  const [vidas, setVidas] = useState(5);  // Estado para las vidas
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);  // Estado para controlar si el botón está deshabilitado
  const [isGameOver, setIsGameOver] = useState(false); // Estado para manejar el estado de "Game Over"
  const [mensajeFelicidades, setMensajeFelicidades] = useState(false); // Nuevo estado para mostrar el mensaje de felicitaciones
  const navigate = useNavigate();

  // Función para manejar la respuesta a una pregunta
  const manejarRespuesta = (preguntaId: number, esCorrecta: boolean) => {
    if (botonDeshabilitado || isGameOver) return; // Si el botón está deshabilitado o ya se ha terminado el juego, no hacer nada

    // Deshabilitar el botón temporalmente (1 segundo)
    setBotonDeshabilitado(true);
    setTimeout(() => {
      setBotonDeshabilitado(false);  // Habilitar el botón nuevamente después del retraso
    }, 1000);  // 1000 milisegundos = 1 segundo

    if (esCorrecta) {
      setRespuestasCorrectas((prev) => prev + 1);
      toast.success('¡Respuesta correcta!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#28a745',
          color: '#fff',
        },
      });

      const porcentajeProgreso = Math.min(
        (respuestasCorrectas + 1) / reto.length * 100,
        100
      );
      setProgreso(porcentajeProgreso);
      
      setPreguntasRestantes((prev) => prev.filter((pregunta) => pregunta.id !== preguntaId));
    } else {
      // Restar vida si la respuesta es incorrecta
      setVidas((prev) => prev - 1);

      toast.error('¡Respuesta incorrecta! Intenta nuevamente.', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#dc3545',
          color: '#fff',
        },
      });

      if (vidas === 1) {
        // Si solo queda 1 vida, mantenemos la pregunta actual en la cola
        const preguntaIncorrecta = preguntasRestantes.find((pregunta) => pregunta.id === preguntaId);
        if (preguntaIncorrecta) {
          setPreguntasRestantes((prev) => [...prev.filter((pregunta) => pregunta.id !== preguntaId), preguntaIncorrecta]);
        }
      }

      // Verificar si las vidas llegaron a 0
      if (vidas <= 0) {
        setIsGameOver(true);
      }
    }

    if (preguntasRestantes.length === 1) {
      setPreguntaActual(preguntasRestantes[0]);
    } else {
      const siguientePregunta = preguntasRestantes.find((pregunta) => pregunta.id !== preguntaId) || null;
      setPreguntaActual(siguientePregunta);
    }
  };

  // Comprobar si ya se han respondido todas las preguntas correctamente
  const todasLasPreguntasRespondidas = preguntasRestantes.length === 0 && respuestasCorrectas === reto.length;

  // Si ya se respondieron todas las preguntas correctamente, mostrar el mensaje de felicitaciones y redirigir
  if (todasLasPreguntasRespondidas && !mensajeFelicidades) {
    setMensajeFelicidades(true); // Mostrar mensaje de felicitación
    setTimeout(() => {
      navigate('/matematicas'); // Redirigir después de 2 segundos
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Reto de Lección</h1>

        {/* Barra de progreso */}
        <BarraProgreso porcentaje={progreso} color="bg-green-500" />
        <MostrarCorazones vidas={vidas} /> 

        {/* Muestra mensaje de felicitaciones cuando se hayan respondido todas las preguntas correctamente */}
        {mensajeFelicidades && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-green-600">¡Felicidades, has completado el reto!</h2>
            <p className="text-lg text-gray-700">¡Lo has hecho muy bien! Redirigiendo...</p>
          </div>
        )}

        {/* Muestra mensaje de "Game Over" si se quedaron sin vidas */}
        {isGameOver ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600">¡Game Over!</h2>
            <p className="text-lg text-gray-700">¡Perdiste todas las vidas! Inténtalo nuevamente más tarde.</p>
            <ExitModal /> {/* Modal para salir o reiniciar */}
          </div>
        ) : (
          <>
            {preguntaActual && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Responde la siguiente pregunta:</h2>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">{preguntaActual.pregunta}</h3>
                  <div className="space-y-2">
                    {preguntaActual.opciones.map((opcion) => (
                      <button
                        key={opcion.id}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={() => manejarRespuesta(preguntaActual.id, opcion.esCorrecta)}
                        disabled={botonDeshabilitado}  // Deshabilitar el botón mientras esté en cooldown
                      >
                        {opcion.texto}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Contenedor de Toasts */}
      <Toaster />
    </div>
  );
};

export default RetoLeccion;
