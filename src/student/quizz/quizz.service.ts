import axiosAuth from '../../shared/utils/AxiosHeader';

export interface QuizzType {
    id:               number;
    type:             string;
    question:         string;
    image_src:        null;
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

const BaseURL = import.meta.env.VITE_BASE_URL;

// Obtener un leccion por ID
export const obtenerQuizzforlesson = async (lessonId: number): Promise<QuizzType[]> => {
  const response = await axiosAuth.get(`${BaseURL}reto/quizz/${lessonId}`);
  return response.data;
};

