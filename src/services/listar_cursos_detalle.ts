import axios from "axios";

import {Curso } from "../interfaces/index"
// URLs de los cursos
const URL_CURSO_MATEMATICAS = "http://127.0.0.1:8000/api/cursos/1/detalle/";
const URL_CURSO_COMUNICACION = "http://127.0.0.1:8000/api/cursos/2/detalle/";


// Función para obtener los detalles del curso de Matemáticas
export const curso_detalle_matematicas = async (): Promise<Curso | null> => {
  try {
    const response = await axios.get(URL_CURSO_MATEMATICAS);
    console.log("Detalles del curso de Matemáticas:", response.data);

    // Verifica la estructura del objeto antes de retornarlo
    if (response.data && response.data.id && Array.isArray(response.data.unidades)) {
      return response.data as Curso; // Asegura que los datos son del tipo 'Curso'
    } else {
      console.error("La respuesta no tiene la estructura esperada.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los detalles del curso de Matemáticas:", error);
    return null;
  }
};

// Función para obtener los detalles del curso de Comunicación
export const curso_detalle_comunicacion = async (): Promise<Curso | null> => {
  try {
    const response = await axios.get(URL_CURSO_COMUNICACION);
    console.log("Detalles del curso de Comunicación:", response.data);

    // Verifica la estructura del objeto antes de retornarlo
    if (response.data && response.data.id && Array.isArray(response.data.unidades)) {
      return response.data as Curso; // Asegura que los datos son del tipo 'Curso'
    } else {
      console.error("La respuesta no tiene la estructura esperada.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los detalles del curso de Comunicación:", error);
    return null;
  }
};
