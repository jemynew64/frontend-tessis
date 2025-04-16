import axiosAuth from '../../shared/utils/AxiosHeader';
import { CursotodoSchema } from "./CursotodoSchema";

const BaseURL = import.meta.env.VITE_BASE_URL;

// Obtener todos los usuarios (paginación opcional)
export const obtenerTodosUsuarios = async (pagina: number = 1): Promise<CursotodoSchema[]> => {
  const response = await axiosAuth.get(`${BaseURL}cursos/1/2/v2/`, {
    params: { page: pagina }
  });
  return response.data;
};