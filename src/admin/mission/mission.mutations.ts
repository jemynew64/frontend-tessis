import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMission, updateMission, deleteMission } from "./mission.service";
import { MissionFormType } from "./mission.schema";
import { showSuccessToast, showErrorToast } from "../../shared/utils/mutationToastHandler";

export const useCreateMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mission"] });
      showSuccessToast("Misión creada correctamente", "🚀");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al crear misión", error, "❌");
    },
  });
};

export const useUpdateMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<MissionFormType> }) =>
      updateMission(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mission"] });
      showSuccessToast("Misión actualizada correctamente", "✏️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al actualizar misión", error, "❌");
    },
  });
};

export const useDeleteMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mission"] });
      showSuccessToast("Misión eliminada correctamente", "🗑️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al eliminar misión", error, "⚠️");
    },
  });
};
