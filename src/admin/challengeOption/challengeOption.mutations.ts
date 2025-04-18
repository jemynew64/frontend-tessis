import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  crearOpcion,
  actualizarOpcion,
  eliminarOpcion,
} from "./challengeOption.service";
import { ChallengeOptionType } from "./challengeOption.schema";

export const useCrearOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearOpcion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opciones_por_reto"] });
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
    },
  });
};

export const useEliminarOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarOpcion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opciones_por_reto"] });
    },
  });
};
