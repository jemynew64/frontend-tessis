import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  crearreto,
  actualizarreto,
  eliminarreto,
} from "./challengeapp.service";
import { ChallengeType } from "./challenge.schema";


export const useCrearChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearreto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retos_por_leccion"] });
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
    },
  });
};

export const useEliminarChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarreto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retos_por_leccion"] });
    },
  });
};
