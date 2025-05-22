// src/student/quizz/quizzMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Aumentarpuntos,
  completarLeccion,
  enviarEstadisticas,
  VerificarMisiones,
    VerificarLogros,
    QuitarvidaService,
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
      await enviarEstadisticas(stats);        // 1. Envía stats
      await VerificarMisiones();              // 2. Verifica misiones
      await VerificarLogros();                // 3. Verifica logros (nuevo)
      // Invalidamos el caché de las misiones actualizadas
      queryClient.invalidateQueries({ queryKey: ["missionsToday"] });
      queryClient.invalidateQueries({ queryKey: ["achievement"] }); // opcional: refrescar logros
    },
  });
};

export const QuitarvidaMutation = () =>
  useMutation({
    mutationFn: () =>
      QuitarvidaService(),
  });