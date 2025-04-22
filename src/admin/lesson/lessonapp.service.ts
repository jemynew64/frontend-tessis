import axiosAuth from '../../shared/utils/AxiosHeader';
import { LessonType,LessonFormType } from "./lesson.schema";


// LessonFormType para todo lo que sea mandar en mi formulario
// LessonType para todo lo que sea que me llege de mi api get get id

const BaseURL = import.meta.env.VITE_BASE_URL;

// Obtener todos los leccions (paginación opcional)
export const obtenerTodosleccions = async (pagina: number = 1): Promise<LessonType[]> => {
  const response = await axiosAuth.get(`${BaseURL}lecciones/`, {
    params: { page: pagina }
  });
  return response.data;
};

// Obtener un leccion por ID
export const obtenerleccionPorId = async (id: number): Promise<LessonType> => {
  const response = await axiosAuth.get(`${BaseURL}lecciones/${id}/`);
  return response.data;
};

// Crear un nuevo leccion
export const crearleccion = async (leccion: LessonFormType): Promise<LessonFormType> => {
  const response = await axiosAuth.post(`${BaseURL}lecciones/`, leccion);
  return response.data;
};

// Actualizar un leccion por ID
export const actualizarleccion = async (id: number, leccion: Partial<LessonFormType>): Promise<LessonFormType> => {
  const response = await axiosAuth.put(`${BaseURL}lecciones/${id}/`, leccion);
  return response.data;
};

// Eliminar un leccion por ID
export const eliminarleccion = async (id: number): Promise<{ message: string }> => {
  const response = await axiosAuth.delete(`${BaseURL}lecciones/${id}/`);
  return response.data;
};

//solo para el select 
import { UnitType } from "../unit/unit.schema";

export const getAllUnits = async (): Promise<UnitType[]> => {
  const res = await axiosAuth.get(`${BaseURL}unidades/`);
  return res.data;
};