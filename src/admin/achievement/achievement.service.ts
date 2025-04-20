import axiosAuth from "../../shared/utils/AxiosHeader";
import { AchievementFormType, AchievementType } from "./achievement.schema";

const BaseURL = import.meta.env.VITE_BASE_URL;

export const getAllAchievements = async (): Promise<AchievementType[]> => {
  const res = await axiosAuth.get(`${BaseURL}logros/`);
  return res.data;
};

export const getAchievementById = async (id: number): Promise<AchievementType> => {
  const res = await axiosAuth.get(`${BaseURL}logros/${id}/`);
  return res.data;
};

export const createAchievement = async (data: AchievementFormType): Promise<AchievementFormType> => {
  const res = await axiosAuth.post(`${BaseURL}logros/`, data);
  return res.data;
};

export const updateAchievement = async (id: number, data: Partial<AchievementFormType>): Promise<AchievementFormType> => {
  const res = await axiosAuth.put(`${BaseURL}logros/${id}/`, data);
  return res.data;
};

export const deleteAchievement = async (id: number): Promise<{ message: string }> => {
  const res = await axiosAuth.delete(`${BaseURL}logros/${id}/`);
  return res.data;
};