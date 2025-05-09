import axiosAuth from '../../shared/utils/AxiosHeader';
import { UserMissionType } from "../../shared/interfaces/UserMissionSchema"

export interface QuizzType {
    id:               number;
    type:             string;
    question:         string;
    image_src?: string | null;
    order_num:        number;
    lesson_id:        number;
    challenge_option: ChallengeOption[];
}

export interface ChallengeOption {
    id:           number;
    text:         string;
    is_correct:   boolean;
    image_src:    null | string;
    audio_src:    null | string;
    challenge_id: number;
}

// LessonFormType para todo lo que sea mandar en mi formulario
// LessonType para todo lo que sea que me llege de mi api get get id


// Obtener un leccion por ID
export const obtenerQuizzforlesson = async (lessonId: number): Promise<QuizzType[]> => {
  const response = await axiosAuth.get(`reto/quizz/${lessonId}`);
  return response.data;
};

export const completarLeccion = async (lessonId: number, userId: number) => {
  return await axiosAuth.post(`lecciones/completar/${lessonId}/${userId}`);
};

//aca acabo de modificar el type deuser misions
export const CompletarMision = async (misionusuario:UserMissionType) => {
  return await axiosAuth.post(`misionUsuarios/`,misionusuario);
};

export const Aumentarpuntos = async (user_id: number, lesson_id: number) => {
  const response = await axiosAuth.post(`quizzpoints/`,{user_id,lesson_id});
  return response.data.datos;
};

