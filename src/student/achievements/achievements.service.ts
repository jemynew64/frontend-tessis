import axiosAuth from '../../shared/utils/AxiosHeader';
import {AchievementType} from  "./AchievementSchema"


// Obtener todos los usuarios (paginación opcional)
export const obtenerTodosLogros = async (pagina: number = 1): Promise<AchievementType[]> => {
  const response = await axiosAuth.get(`logros/`, {
    params: { page: pagina }
  });
  return response.data;
};

// achievements.service.ts
export const obtenerEstadisticasUsuario = async (): Promise<Record<string, number>> => {
  const response = await axiosAuth.get("stats"); // ajusta el endpoint según tu backend
  return response.data;
};
