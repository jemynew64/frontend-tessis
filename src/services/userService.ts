import axiosAuth from '../shared/utils/AxiosHeader'; // Importamos la configuración de axios con autenticación

// Definimos la estructura de los datos de los usuarios
export interface User {
  id: number;
  nombre: string;
  email: string;
  user_type: string;
  // agrega los demás campos que puedas tener
}

// Obtener todos los usuarios con paginación
export const getUsersService = async (page: number = 10, limit: number = 1) => {
  const response = await axiosAuth.get(`usuarios?page=${page}&limit=${limit}`);
  return response.data;
};

// Obtener un usuario por ID
export const getUserByIdService = async (id: number) => {
  const response = await axiosAuth.get(`usuarios/${id}`);
  return response.data;
};

// Crear un nuevo usuario
export const createUserService = async (userData: Omit<User, 'id'>) => {
  const response = await axiosAuth.post('usuarios', userData);
  return response.data;
};

// Eliminar un usuario
export const deleteUserService = async (id: number) => {
  const response = await axiosAuth.delete(`usuarios/${id}`);
  return response.data;
};

// Actualizar los datos de un usuario
export const updateUserService = async (id: number, userData: Partial<User>) => {
  const response = await axiosAuth.put(`usuarios/${id}`, userData);
  return response.data;
};
