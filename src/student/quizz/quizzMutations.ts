// src/student/quizz/quizzMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Aumentarpuntos,
  completarLeccion,
  enviarEstadisticas,
  VerificarMisiones,
} from "./quizz.service";

export const useCompletarLeccionMutation = () =>
  useMutation({
    mutationFn: ({ lessonId, userId }: { lessonId: number; userId: number }) =>
      completarLeccion(lessonId, userId),
  });

export const useAumentarPuntosMutation = () =>
  useMutation({
    mutationFn: ({ userId, lessonId }: { userId: number; lessonId: number }) =>
      Aumentarpuntos(userId, lessonId),
  });

export const useEnviarEstadisticasMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (stats: Record<string, number>) => {
      // Primero enviamos las estadísticas
      await enviarEstadisticas(stats);

      // Luego verificamos misiones
      await VerificarMisiones();

      // Invalidamos el caché de las misiones actualizadas
      queryClient.invalidateQueries({ queryKey: ["missionsToday"] });
    },
  });
};
