import axiosAuth from '../../../utils/AxiosHeader';

// achievements.service.ts
export const obtenerEstadisticasUsuario = async (): Promise<{
  total_lessons: number;
  total_lessons_perfect: number;
  total_challenges: number;
  total_correct_answers: number;
  total_wrong_answers: number;
  total_units_completed: number;
  total_missions: number;
  total_points: number;
  total_experience: number;
  quizzes_completed: number;
}> => {
  const response = await axiosAuth.get("/stats"); // Ajusta según tu endpoint
  return response.data;
};