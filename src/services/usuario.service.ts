import axios from 'axios';

// Configuración básica de axios (ajusta la URL según lo necesites)
//const API_URL = 'http://localhost:8000/api/usuarios/'; // Asegúrate de que esta URL sea correcta

const BaseURl=import.meta.env.VITE_BASE_URL
// Función para obtener todos los usuarios
export const obtenerTodosusuarios = async () => {
  try {
    
    const response = await axios.get(`${BaseURl}/api/usuarios/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Función para obtener un usuario por ID
export const obtenerUsuarioPorId = async (id: number) => {
  try {
    const response = await axios.get(`${BaseURl}/api/usuarios/}${id}/`);
    return response.data;  // Retorna el usuario encontrado
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw error;
  }
};
