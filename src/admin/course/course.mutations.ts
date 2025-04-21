import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse, updateCourse, deleteCourse } from "./course.service";
import { CourseFormType } from "./course.schema";
import { showSuccessToast, showErrorToast } from "../../shared/utils/mutationToastHandler";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
      showSuccessToast("Curso creado correctamente", "📘");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al crear curso", error, "❌");
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CourseFormType> }) => updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
      showSuccessToast("Curso actualizado correctamente", "✏️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al actualizar curso", error, "❌");
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
      showSuccessToast("Curso eliminado correctamente", "🗑️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al eliminar curso", error, "⚠️");
    },
  });
};
