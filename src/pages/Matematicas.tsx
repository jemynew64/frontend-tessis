import { UserProgress } from '../components/UserProgress';
import MissionsCard from '../components/MissionsCard';
import UnitBanner from '../components/UnitBanner';
import Header from '../components/Header';
import LessonTrack from '../components/LessonTrack';
import { useNavigate } from 'react-router-dom';

const Matematicas = () => {
  const navigate = useNavigate();

  // JSON del curso
  const cursoMatematicas = {
    "id": 1,
    "titulo": "Matemáticas",
    "descripcion": "Aprende sobre operaciones matemáticas, números y más.",
    "unidades": [
      {
        "id": 1,
        "titulo": "Suma y Resta",
        "descripcion": "Aprende a sumar y restar números.",
        "lecciones": [
          {
            "id": 1,
            "titulo": "Suma de Números",
            "estaBloqueada": false,
            "estaCompletada": false,
            "reto": [
              {
                "id": 1,
                "pregunta": "¿Cuánto es 5 + 3?",
                "tipo": "SELECCIONAR",
                "opciones": [
                  { "id": 1, "texto": "7", "esCorrecta": false },
                  { "id": 2, "texto": "8", "esCorrecta": true },
                  { "id": 3, "texto": "9", "esCorrecta": false }
                ]
              },
              {
                "id": 2,
                "pregunta": "¿Cuánto es 8 + 6?",
                "tipo": "SELECCIONAR",
                "opciones": [
                  { "id": 1, "texto": "13", "esCorrecta": false },
                  { "id": 2, "texto": "14", "esCorrecta": true },
                  { "id": 3, "texto": "15", "esCorrecta": false }
                ]
              },
              {
                "id": 3,
                "pregunta": "¿Cuánto es 10 + 5?",
                "tipo": "SELECCIONAR",
                "opciones": [
                  { "id": 1, "texto": "14", "esCorrecta": false },
                  { "id": 2, "texto": "15", "esCorrecta": true },
                  { "id": 3, "texto": "16", "esCorrecta": false }
                ]
              }
            ]
          },
          {
            "id": 2,
            "titulo": "Resta de Números",
            "estaBloqueada": false,
            "estaCompletada": false,
            "reto": [
              {
                "id": 1,
                "pregunta": "¿Cuánto es 10 - 4?",
                "tipo": "SELECCIONAR",
                "opciones": [
                  { "id": 1, "texto": "5", "esCorrecta": false },
                  { "id": 2, "texto": "6", "esCorrecta": true },
                  { "id": 3, "texto": "7", "esCorrecta": false }
                ]
              },
              {
                "id": 2,
                "pregunta": "¿Cuánto es 15 - 7?",
                "tipo": "SELECCIONAR",
                "opciones": [
                  { "id": 1, "texto": "8", "esCorrecta": true },
                  { "id": 2, "texto": "7", "esCorrecta": false },
                  { "id": 3, "texto": "6", "esCorrecta": false }
                ]
              },
              {
                "id": 3,
                "pregunta": "¿Cuánto es 20 - 10?",
                "tipo": "SELECCIONAR",
                "opciones": [
                  { "id": 1, "texto": "9", "esCorrecta": false },
                  { "id": 2, "texto": "10", "esCorrecta": true },
                  { "id": 3, "texto": "11", "esCorrecta": false }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "titulo": "Multiplicación de Números",
        "descripcion": "Aprende a multiplicar números.",
        "lecciones": [
          {
            "id": 1,
            "titulo": "Multiplicación Básica",
            "estaBloqueada": false,
            "estaCompletada": false,
            "reto": [
              {
                "id": 1,
                "pregunta": "¿Cuánto es 3 x 4?",
                "tipo": "SELECCIONAR",
                "opciones": [
                  { "id": 1, "texto": "12", "esCorrecta": true },
                  { "id": 2, "texto": "10", "esCorrecta": false },
                  { "id": 3, "texto": "14", "esCorrecta": false }
                ]
              },
              {
                "id": 2,
                "pregunta": "¿Cuánto es 6 x 5?",
                "tipo": "SELECCIONAR",
                "opciones": [
                  { "id": 1, "texto": "30", "esCorrecta": true },
                  { "id": 2, "texto": "28", "esCorrecta": false },
                  { "id": 3, "texto": "35", "esCorrecta": false }
                ]
              },
              {
                "id": 3,
                "pregunta": "¿Cuánto es 2 x 8?",
                "tipo": "SELECCIONAR",
                "opciones": [
                  { "id": 1, "texto": "16", "esCorrecta": true },
                  { "id": 2, "texto": "14", "esCorrecta": false },
                  { "id": 3, "texto": "18", "esCorrecta": false }
                ]
              }
            ]
          }
        ]
      }
    ]
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
        <Header titulo={cursoMatematicas.titulo} />

        {cursoMatematicas.unidades.map((unidad) => (
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

export default Matematicas;
