import axiosAuth from "../../shared/utils/AxiosHeader";
import { ChallengeOptionType } from "./challengeOption.schema";

const BaseURL = import.meta.env.VITE_BASE_URL;

export const obtenerTodasOpciones = async (challengeId: number): Promise<ChallengeOptionType[]> => {
  const response = await axiosAuth.get(`${BaseURL}opcionReto/challengeoption/${challengeId}`);
  return response.data;
};

export const obtenerOpcionPorId = async (id: number): Promise<ChallengeOptionType> => {
  const response = await axiosAuth.get(`${BaseURL}opcionReto/${id}`);
  return response.data;
};

export const crearOpcion = async (data: ChallengeOptionType): Promise<ChallengeOptionType> => {
  const response = await axiosAuth.post(`${BaseURL}opcionReto/`, data);
  return response.data;
};

export const actualizarOpcion = async (id: number, data: Partial<ChallengeOptionType>): Promise<ChallengeOptionType> => {
  const response = await axiosAuth.put(`${BaseURL}opcionReto/${id}`, data);
  return response.data;
};

export const eliminarOpcion = async (id: number): Promise<{ message: string }> => {
  const response = await axiosAuth.delete(`${BaseURL}opcionReto/${id}`);
  return response.data;
};
