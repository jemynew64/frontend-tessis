import axiosAuth from "../../shared/utils/AxiosHeader";
import { MissionFormType, MissionType } from "./mission.schema";

const BaseURL = import.meta.env.VITE_BASE_URL;

export const getAllMissions = async (): Promise<MissionType[]> => {
  const res = await axiosAuth.get(`${BaseURL}misiones/`);
  return res.data;
};

export const getMissionById = async (id: number): Promise<MissionType> => {
  const res = await axiosAuth.get(`${BaseURL}misiones/${id}/`);
  return res.data;
};

export const createMission = async (data: MissionFormType): Promise<MissionFormType> => {
  const res = await axiosAuth.post(`${BaseURL}misiones/`, data);
  return res.data;
};

export const updateMission = async (id: number, data: Partial<MissionFormType>): Promise<MissionFormType> => {
  const res = await axiosAuth.put(`${BaseURL}misiones/${id}/`, data);
  return res.data;
};

export const deleteMission = async (id: number): Promise<{ message: string }> => {
  const res = await axiosAuth.delete(`${BaseURL}misiones/${id}/`);
  return res.data;
};
