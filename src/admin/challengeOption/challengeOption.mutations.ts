import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  crearOpcion,
  actualizarOpcion,
  eliminarOpcion,
} from "./challengeOption.service";
import { ChallengeOptionType } from "./challengeOption.schema";
import { showSuccessToast, showErrorToast } from "../../shared/utils/mutationToastHandler";

export const useCrearOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearOpcion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opciones_por_reto"] });
      showSuccessToast("Opción creada correctamente", "🧩");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al crear opción", error, "❌");
    },
  });
};

export const useActualizarOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ChallengeOptionType> }) =>
      actualizarOpcion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opciones_por_reto"] });
      showSuccessToast("Opción actualizada correctamente", "✏️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al actualizar opción", error, "❌");
    },
  });
};

export const useEliminarOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarOpcion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opciones_por_reto"] });
      showSuccessToast("Opción eliminada correctamente", "🗑️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al eliminar opción", error, "⚠️");
    },
  });
};
