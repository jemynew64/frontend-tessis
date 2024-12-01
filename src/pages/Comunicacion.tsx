import { UserProgress } from '../components/UserProgress';
import MissionsCard from '../components/MissionsCard';
import UnitBanner from '../components/UnitBanner';
import Header from '../components/Header';
import LessonTrack from '../components/LessonTrack';
import { useNavigate } from 'react-router-dom';

const Comunicacion = () => {
  const navigate = useNavigate();

  // JSON del curso
  const cursoComunicacion = {
    id: 2,
    titulo: "Comunicación",
    descripcion: "Desarrolla tus habilidades de expresión verbal y no verbal.",
    unidades: [
      {
        id: 1,
        titulo: "Comunicación Verbal",
        descripcion: "Aprende a expresarte de manera efectiva con palabras.",
        lecciones: [
          {
            id: 1,
            titulo: "Técnicas de Habla en Público",
            estaBloqueada: false,
            estaCompletada: false,
            reto: [
              {
                id: 1,
                pregunta: "¿Qué es lo más importante al hablar en público?",
                tipo: "SELECCIONAR",
                opciones: [
                  { id: 1, texto: "Tener un tono claro y seguro", esCorrecta: true },
                  { id: 2, texto: "Hablar rápidamente", esCorrecta: false },
                  { id: 3, texto: "Evitar el contacto visual", esCorrecta: false },
                ],
              },
              {
                id: 2,
                pregunta: "¿Cuál de estos es un buen consejo para hablar en público?",
                tipo: "SELECCIONAR",
                opciones: [
                  { id: 1, texto: "Leer todo el discurso", esCorrecta: false },
                  { id: 2, texto: "Mantener contacto visual", esCorrecta: true },
                  { id: 3, texto: "Hablar sin pausas", esCorrecta: false },
                ],
              },
            ],
          },
          {
            id: 2,
            titulo: "Escucha Activa",
            estaBloqueada: false,
            estaCompletada: false,
            reto: [
              {
                id: 1,
                pregunta: "¿Qué significa escucha activa?",
                tipo: "SELECCIONAR",
                opciones: [
                  { id: 1, texto: "Solo oír al interlocutor", esCorrecta: false },
                  { id: 2, texto: "Mostrar interés y dar retroalimentación", esCorrecta: true },
                  { id: 3, texto: "Interrumpir con tus ideas", esCorrecta: false },
                ],
              },
              {
                id: 2,
                pregunta: "¿Qué no es parte de la escucha activa?",
                tipo: "SELECCIONAR",
                opciones: [
                  { id: 1, texto: "Evitar interrumpir", esCorrecta: false },
                  { id: 2, texto: "Ignorar el lenguaje corporal", esCorrecta: true },
                  { id: 3, texto: "Reformular lo que escuchas", esCorrecta: false },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        titulo: "Comunicación No Verbal",
        descripcion: "Aprende a comunicarte más allá de las palabras.",
        lecciones: [
          {
            id: 1,
            titulo: "Lenguaje Corporal",
            estaBloqueada: false,
            estaCompletada: false,
            reto: [
              {
                id: 1,
                pregunta: "¿Qué es importante en el lenguaje corporal?",
                tipo: "SELECCIONAR",
                opciones: [
                  { id: 1, texto: "Postura abierta y segura", esCorrecta: true },
                  { id: 2, texto: "Cruzar los brazos", esCorrecta: false },
                  { id: 3, texto: "Evitar gestos", esCorrecta: false },
                ],
              },
              {
                id: 2,
                pregunta: "¿Qué comunica un apretón de manos firme?",
                tipo: "SELECCIONAR",
                opciones: [
                  { id: 1, texto: "Confianza", esCorrecta: true },
                  { id: 2, texto: "Indiferencia", esCorrecta: false },
                  { id: 3, texto: "Inseguridad", esCorrecta: false },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const handleStartLesson = (reto: unknown) => {
    // Navega a la página del reto y pasa el JSON como estado
    navigate('/reto-leccion', { state: { reto } });
  };

  return (
    <div className="flex min-h-screen">
      <div className="block lg:hidden">
        <UserProgress puntos={500} vidas={4} />
      </div>

      <div className="flex-1 p-8 lg:pl-[256px]">
        <Header titulo={cursoComunicacion.titulo} />

        {cursoComunicacion.unidades.map((unidad) => (
          <div key={unidad.id} className="mb-8">
            <UnitBanner 
              titulo={unidad.titulo}
              descripcion={unidad.descripcion}
            />
            <LessonTrack
              lecciones={unidad.lecciones}
              onLeccionSeleccionada={(leccion) => handleStartLesson(leccion.reto)}
            />
          </div>
        ))}
      </div>

      <div className="hidden lg:block w-[250px] bg-white p-4">
        <UserProgress puntos={500} vidas={4} />
        <MissionsCard />
      </div>
    </div>
  );
};

export default Comunicacion;
