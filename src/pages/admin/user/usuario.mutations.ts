import { useMutation } from "@tanstack/react-query";
import {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "./usuario.service";
import { StudentForm } from "./EstudianteSchema";

// Crear usuario
export const useCrearUsuario = () => {
  return useMutation({
    mutationFn: crearUsuario,
  });
};

// Actualizar usuario
export const useActualizarUsuario = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<StudentForm> }) =>
      actualizarUsuario(id, data),
  });
};

// Eliminar usuario
export const useEliminarUsuario = () => {
  return useMutation({
    mutationFn: (id: number) => eliminarUsuario(id),
  });
};
