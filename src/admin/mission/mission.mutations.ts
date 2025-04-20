import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMission, updateMission, deleteMission } from "./mission.service";
import { MissionFormType } from "./mission.schema";

export const useCreateMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMission,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mission"] }),
  });
};

export const useUpdateMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<MissionFormType> }) => updateMission(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mission"] }),
  });
};

export const useDeleteMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMission,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mission"] }),
  });
};
