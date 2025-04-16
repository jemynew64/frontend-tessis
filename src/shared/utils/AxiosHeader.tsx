import axios from "axios";
import { useAuthStore } from "../store/auth";

const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
});

// Obtener el token directamente del estado de la tienda
const token = useAuthStore.getState().token;

// Interceptor para incluir el token de autorización en las solicitudes
axiosAuth.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Interceptor para manejar errores de respuesta
axiosAuth.interceptors.response.use(
    (response) => response, // Si la respuesta es exitosa, la pasa directamente
    (error) => {
        // Manejo de error aquí, por ejemplo, alertar al usuario
        console.error('Error en la respuesta:', error);
        return Promise.reject(error); // Rechazar la promesa para que el error sea propagado
    }
);

export default axiosAuth;
