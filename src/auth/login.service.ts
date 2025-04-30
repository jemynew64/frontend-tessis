import axios from 'axios';
import type { AxiosError } from "axios";

// const BaseURl=import.meta.env.VITE_BASE_URL
// const BaseURl="http://localhost:3000/api/"
const BaseURL = import.meta.env.VITE_BASE_URL;
console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);

console.log("URL del backend:", BaseURL); // debería mostrar http://localhost:3000/api/
interface UserLogin {
  email: string;  
  password: string;  
}

const axiosAuth = axios.create({
  baseURL: BaseURL,  // Cambia la URL según tu backend
});

export const loginPost = async (userData: UserLogin) => {
  try {
    const response = await axiosAuth.post('auth/login/', userData);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error: string }>;
    const mensaje = axiosError.response?.data?.error || "Error desconocido";
    const status = axiosError.response?.status;
    return { success: false, status, mensaje };
  }
};
