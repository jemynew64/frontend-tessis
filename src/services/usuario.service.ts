import axios from 'axios';

// Define las interfaces para los datos que esperas recibir

// Configuración básica de axios (ajusta la URL según lo necesites)
const API_URL = 'http://localhost:8000/api/usuarios/'; // Asegúrate de que esta URL sea correcta

export const obtenerTodosusuarios = async () => {
  try {
    // Realizar la solicitud GET a la API
    const response = await axios.get(`${API_URL}`);
    
    // Retornar la data obtenida
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener los usuarios con los retos:", error);
    throw error;
  }
};
