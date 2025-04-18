import axiosAuth from "./AxiosHeader";
import type { AxiosError } from "axios";

const BaseURL = import.meta.env.VITE_BASE_URL;

export const uploadImageToBackend = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axiosAuth.post(`${BaseURL}reto/upload-image`, formData, {
      withCredentials: false,
    });

    return data.image_url;
  } catch (error) {
    if ((error as AxiosError).response) {
      console.error("Error al subir imagen (respuesta):", (error as AxiosError).response);
    } else {
      console.error("Error al subir imagen (otro):", error);
    }
    throw new Error("No se pudo subir la imagen al servidor.");
  }
};
