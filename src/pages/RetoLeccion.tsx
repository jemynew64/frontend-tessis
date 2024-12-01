import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import BarraProgreso from '../components/BarraProgreso';
import MostrarCorazones from '../components/MostrarCorazones';

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

  const [preguntaActual, setPreguntaActual] = useState<Pregunta | null>(reto[0]);
  const [preguntasRestantes, setPreguntasRestantes] = useState<Pregunta[]>(reto);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState<number>(0);
  const [progreso, setProgreso] = useState(0);
  const [vidas, setVidas] = useState(5);
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [mensajeFelicidades, setMensajeFelicidades] = useState(false);

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
            navigate('/matematicas');
        }, 2000);
    }
  }, [isGameOver, todasLasPreguntasRespondidas, mensajeFelicidades, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Reto de Lección</h1>

        <BarraProgreso porcentaje={progreso} color="bg-green-500" />
        <MostrarCorazones vidas={vidas} />

        {mensajeFelicidades && !isGameOver && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-green-600">¡Felicidades, has completado el reto!</h2>
            <p className="text-lg text-gray-700">¡Lo has hecho muy bien! Redirigiendo...</p>
          </div>
        )}

        {isGameOver && (
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-red-600">¡Game Over!</h2>
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
    </div>
  );
};

export default RetoLeccion;
