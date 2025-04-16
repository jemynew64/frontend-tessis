import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "./usuario.service";
import { StudentForm } from "./EstudianteSchema";

// Crear usuario
export const useCrearUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // Refresca lista
    },
  });
};

// Actualizar usuario
export const useActualizarUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<StudentForm> }) =>
      actualizarUsuario(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // Refresca lista
    },
  });
};

// Eliminar usuario
export const useEliminarUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // Refresca lista
    },
  });
};
