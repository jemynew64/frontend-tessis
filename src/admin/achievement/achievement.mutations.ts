import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAchievement, updateAchievement, deleteAchievement } from "./achievement.service";
import { AchievementFormType } from "./achievement.schema";
import { showSuccessToast, showErrorToast } from "../../shared/utils/mutationToastHandler";

export const useCreateAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievement"] });
      showSuccessToast("Logro creado correctamente", "🏆");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al crear logro", error, "❌");
    },
  });
};

export const useUpdateAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AchievementFormType> }) => updateAchievement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievement"] });
      showSuccessToast("Logro actualizado correctamente", "✏️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al actualizar logro", error, "❌");
    },
  });
};

export const useDeleteAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievement"] });
      showSuccessToast("Logro eliminado correctamente", "🗑️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al eliminar logro", error, "⚠️");
    },
  });
};