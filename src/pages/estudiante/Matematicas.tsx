import { useEffect, useState } from "react";
import { curso_detalle_matematicas } from "../../services/listar_cursos_detalle"; 
import { UserProgress } from '../../components/UserProgress';
import MissionsCard from '../../components/MissionsCard';
import UnitBanner from '../../components/UnitBanner';
import Header from '../../components/Header';
import LessonTrack from '../../components/LessonTrack';
import { useNavigate } from 'react-router-dom';
//import de types
import { Curso,Leccion } from '../../interfaces/index';
const Matematicas = () => {
  const navigate = useNavigate();
  // Estado para almacenar los detalles del curso de Matemáticas
  const [cursoMatematicas, setCursoMatematicas] = useState<Curso | null>(null); // Especifica el tipo Curso | null

  // Estado para manejar el estado de carga
  const [loading, setLoading] = useState(true);

  // Función para obtener los detalles del curso de Matemáticas cuando el componente se monta
  useEffect(() => {
    const fetchCursoMatematicas = async () => {
      try {
        const response = await curso_detalle_matematicas(); // Llamada a la API
        setCursoMatematicas(response); // Almacena los datos del curso en el estado
        console.log(response);
        setLoading(false); // Marca como cargado
      } catch (error) {
        console.error("Error al obtener los detalles del curso de Matemáticas:", error);
        setLoading(false); // Marca como cargado aunque haya error
      }
    };

    fetchCursoMatematicas(); // Llama a la función para obtener los detalles del curso
  }, []); // El array vacío significa que solo se ejecutará una vez al montar el componente

  // Si está cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay datos, muestra un mensaje de error
  if (!cursoMatematicas) {
    return <div>No se pudo cargar el curso de Matemáticas.</div>;
  }

  const handleStartLesson = (leccion: Leccion) => {
    navigate('/reto-leccion', { state: { leccionId: leccion.id, origin: 'matematicas' } });
  };
  
  

  return (
    <div className="flex min-h-screen">
      <div className="block lg:hidden">
        <UserProgress />
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
              onLeccionSeleccionada={handleStartLesson}  // Pasar la lección completa
            />
          </div>
        ))}
      </div>

      <div className="hidden lg:block w-[250px] bg-white p-4">
        <UserProgress />
        <MissionsCard />
      </div>
    </div>
  );
};

export default Matematicas;
