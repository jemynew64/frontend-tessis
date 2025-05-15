// import axiosAuth from "../../shared/utils/AxiosHeader";
import axiosAuth from "../../shared/utils/AxiosHeader";
import { MissionToday } from "./MissionsDiary.schema";
const BaseURL = import.meta.env.VITE_BASE_URL;

export const getMissionToday = async (): Promise<MissionToday[]> => {
  const res = await axiosAuth.get(`${BaseURL}misionUsuarios/today`);
  return res.data;
};

// achievements.service.ts
export const obtenerEstadisticasUsuario = async (): Promise<Record<string, number>> => {
  const response = await axiosAuth.get("stats/today"); // ajusta el endpoint según tu backend
  return response.data;
};
