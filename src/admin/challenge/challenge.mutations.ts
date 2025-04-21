import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  crearreto,
  actualizarreto,
  eliminarreto,
} from "./challengeapp.service";
import { ChallengeType } from "./challenge.schema";
import { showSuccessToast, showErrorToast } from "../../shared/utils/mutationToastHandler"; // 👈 importa tus helpers

export const useCrearChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearreto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retos_por_leccion"] });
      showSuccessToast("Reto creado correctamente", "🎯");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al crear reto", error, "⚠️");
    },
  });
};

export const useActualizarChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ChallengeType> }) =>
      actualizarreto(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retos_por_leccion"] });
      showSuccessToast("Reto actualizado correctamente", "✅");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al actualizar reto", error, "❌");
    },
  });
};

export const useEliminarChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarreto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retos_por_leccion"] });
      showSuccessToast("Reto eliminado correctamente", "🗑️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al eliminar reto", error, "⚠️");
    },
  });
};
