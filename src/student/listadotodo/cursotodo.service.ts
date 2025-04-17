import axiosAuth from '../../shared/utils/AxiosHeader';
import { CursotodoSchema } from "./CursotodoSchema";

const BaseURL = import.meta.env.VITE_BASE_URL;

// Obtener todos los usuarios (paginación opcional)
export const obtenerTodosUsuarios = async ( course_id:number,user_id:number , pagina: number = 1): Promise<CursotodoSchema> => {
  const response = await axiosAuth.get(`${BaseURL}cursos/${course_id}/${user_id}/v2/`, {
    params: { page: pagina }
  });
  return response.data;
};