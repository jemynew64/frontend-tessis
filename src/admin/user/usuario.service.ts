import axiosAuth from '../../shared/utils/AxiosHeader';
import { StudentForm } from "./EstudianteSchema";

const BaseURL = import.meta.env.VITE_BASE_URL;

// Obtener todos los usuarios (paginación opcional)
export const obtenerTodosUsuarios = async (pagina: number = 1): Promise<StudentForm[]> => {
  const response = await axiosAuth.get(`${BaseURL}usuarios/`, {
    params: { page: pagina }
  });
  return response.data;
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = async (id: number): Promise<StudentForm> => {
  const response = await axiosAuth.get(`${BaseURL}usuarios/${id}/`);
  return response.data;
};

// Crear un nuevo usuario
export const crearUsuario = async (usuario: StudentForm): Promise<StudentForm> => {
  const response = await axiosAuth.post(`${BaseURL}usuarios/`, usuario);
  return response.data;
};

// Actualizar un usuario por ID
export const actualizarUsuario = async (id: number, usuario: Partial<StudentForm>): Promise<StudentForm> => {
  const response = await axiosAuth.put(`${BaseURL}usuarios/${id}/`, usuario);
  return response.data;
};

// Eliminar un usuario por ID
export const eliminarUsuario = async (id: number): Promise<{ message: string }> => {
  const response = await axiosAuth.delete(`${BaseURL}usuarios/${id}/`);
  return response.data;
};
