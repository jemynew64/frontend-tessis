import axiosAuth from '../../../utils/AxiosHeader';

// achievements.service.ts
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
}

export const obtenerStatsDiarios = async (): Promise<DailyUserStat[]> => {
  const response = await axiosAuth.get("/stats/totaldays"); // Tu endpoint real
  return response.data;
};