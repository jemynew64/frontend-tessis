// src/student/quizz/quizzMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  buy_life_service,
} from "./Shop.service";

export const useEnviarEstadisticasMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await buy_life_service(); 
      // Invalidamos el caché de las misiones actualizadas
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
    },
  });
};
