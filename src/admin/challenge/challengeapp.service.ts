import axiosAuth from '../../shared/utils/AxiosHeader';
//import { LessonType,LessonFormType } from "./lesson.schema";
import { ChallengeType } from "./challenge.schema";


// LessonFormType para todo lo que sea mandar en mi formulario
// LessonType para todo lo que sea que me llege de mi api get get id

const BaseURL = import.meta.env.VITE_BASE_URL;

// Obtener todos los retos (paginación opcional)
export const obtenerTodosretosdereto = async (id:number): Promise<ChallengeType[]> => {
  const response = await axiosAuth.get(`${BaseURL}reto/lesson/${id}`, {
  });
  return response.data;
};

// Obtener un reto por ID
export const obtenerretoPorId = async (id: number): Promise<ChallengeType> => {
  const response = await axiosAuth.get(`${BaseURL}reto/${id}/`);
  return response.data;
};

// Crear un nuevo reto
export const crearreto = async (reto: ChallengeType): Promise<ChallengeType> => {
  const response = await axiosAuth.post(`${BaseURL}reto/`, reto);
  return response.data;
};

// Actualizar un reto por ID
export const actualizarreto = async (id: number, reto: Partial<ChallengeType>): Promise<ChallengeType> => {
  const response = await axiosAuth.put(`${BaseURL}reto/${id}/`, reto);
  return response.data;
};

// Eliminar un reto por ID
export const eliminarreto = async (id: number): Promise<{ message: string }> => {
  const response = await axiosAuth.delete(`${BaseURL}reto/${id}/`);
  return response.data;
};
