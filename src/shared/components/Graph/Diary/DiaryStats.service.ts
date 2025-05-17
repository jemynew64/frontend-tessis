// UserGraph.service.ts
import axiosAuth from "../../../utils/AxiosHeader";

export interface DailyUserStat {
  date: string;
  lessons_completed: number;
  lessons_perfect: number;
  challenges_completed: number;
  correct_answers: number;
  wrong_answers: number;
  experience_gained: number;
  points_gained: number;
  time_spent_minutes: number;
  quizzes_completed: number;
}

export const obtenerStatsDiarios = async (idUsuarioIndicado?: string): Promise<DailyUserStat[]> => {
  const response = await axiosAuth.get("/stats/totaldays", {
    params: idUsuarioIndicado ? { usuarioindicadoid: idUsuarioIndicado } : {}
  });
  return response.data;
};
