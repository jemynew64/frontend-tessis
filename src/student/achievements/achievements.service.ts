import axiosAuth from '../../shared/utils/AxiosHeader';
import {AchievementType} from  "./AchievementSchema"

interface AchievementrelacionType {
  achievement_id: number;
  user_id: number;
}

// Obtener todos los usuarios (paginación opcional)
export const obtenerTodosLogros = async (pagina: number = 1): Promise<AchievementType[]> => {
  const response = await axiosAuth.get(`logros/`, {
    params: { page: pagina }
  });
  return response.data;
};

export const CrearRelacionlogrousuario = async (relacion:AchievementrelacionType)=> {
  const response = await axiosAuth.post(`logroObtenido/`,relacion )
  return response.data;
};
