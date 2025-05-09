// import axiosAuth from "../../shared/utils/AxiosHeader";
import axiosAuth from "../../../shared/utils/AxiosHeader";
import { MissionToday } from "./MisionToday.schema";
const BaseURL = import.meta.env.VITE_BASE_URL;

export const getMissionToday = async (): Promise<MissionToday[]> => {
  const res = await axiosAuth.get(`${BaseURL}misionUsuarios/today`);
  return res.data;
};
