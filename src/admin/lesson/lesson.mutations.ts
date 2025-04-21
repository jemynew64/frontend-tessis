import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  crearleccion,
  actualizarleccion,
  eliminarleccion,
} from "./lessonapp.service";
import { LessonFormType } from "./lesson.schema";
import { showSuccessToast, showErrorToast } from "../../shared/utils/mutationToastHandler";

export const useCrearLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearleccion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leccion"] });
      showSuccessToast("Lección creada correctamente", "📕");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al crear lección", error, "❌");
    },
  });
};

export const useActualizarLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<LessonFormType> }) =>
      actualizarleccion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leccion"] });
      showSuccessToast("Lección actualizada correctamente", "✏️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al actualizar lección", error, "❌");
    },
  });
};

export const useEliminarLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarleccion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leccion"] });
      showSuccessToast("Lección eliminada correctamente", "🗑️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al eliminar lección", error, "⚠️");
    },
  });
};
