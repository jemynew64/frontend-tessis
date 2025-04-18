import axiosAuth from '../../shared/utils/AxiosHeader';
import { StudentForm } from "../../admin/user/EstudianteSchema";

const BaseURL = import.meta.env.VITE_BASE_URL;

// Obtener todos los usuarios (paginación opcional)
export const obtenerTodosUsuariosRanking = async (pagina: number = 1): Promise<StudentForm[]> => {
  const response = await axiosAuth.get(`${BaseURL}usuarios/`, {
    params: { page: pagina }
  });
  return response.data;
};