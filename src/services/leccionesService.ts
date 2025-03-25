import axios from 'axios';
import {LeccionConRetos} from "../interfaces/index"
// Define las interfaces para los datos que esperas recibir
const BaseURl=import.meta.env.VITE_BASE_URL


// Configuración básica de axios (ajusta la URL según lo necesites)
const API_URL = `${BaseURl}api/lecciones/`; // Asegúrate de que esta URL sea correcta

export const obtenerLeccionConRetos = async (leccionId: number): Promise<LeccionConRetos> => {
  try {
    // Realizar la solicitud GET a la API
    const response = await axios.get<LeccionConRetos>(`${API_URL}${leccionId}/detalle/`);
    
    // Retornar la data obtenida
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener la lección con los retos:", error);
    throw error;
  }
};
