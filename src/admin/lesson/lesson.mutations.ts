import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  crearleccion,
  actualizarleccion,
  eliminarleccion,
} from "./lessonapp.service";
import { LessonFormType } from "./lesson.schema";

// Crear usuario
export const useCrearLesson= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearleccion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leccion"] }); // Refresca lista
    },
  });
};

// Actualizar usuario
export const useActualizarLesson= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<LessonFormType> }) =>
      actualizarleccion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leccion"] }); // Refresca lista
    },
  });
};

// Eliminar usuario
export const useEliminarLesson= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarleccion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leccion"] }); // Refresca lista
    },
  });
};
