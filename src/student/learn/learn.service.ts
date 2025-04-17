import axiosAuth from '../../shared/utils/AxiosHeader';
import { CourseType } from "./CourseSchema";

const BaseURL = import.meta.env.VITE_BASE_URL;

// Obtener todos los usuarios (paginación opcional)
export const obtenerTodosCursos = async (pagina: number = 1): Promise<CourseType[]> => {
  const response = await axiosAuth.get(`${BaseURL}cursos/`, {
    params: { page: pagina }
  });
  return response.data;
};
