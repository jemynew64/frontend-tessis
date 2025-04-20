import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAchievement, updateAchievement, deleteAchievement } from "./achievement.service";
import { AchievementFormType } from "./achievement.schema";

export const useCreateAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAchievement,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["achievement"] }),
  });
};

export const useUpdateAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AchievementFormType> }) => updateAchievement(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["achievement"] }),
  });
};

export const useDeleteAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAchievement,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["achievement"] }),
  });
};
