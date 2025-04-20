import { queryOptions } from "@tanstack/react-query";
import { getAllMissions, getMissionById } from "./mission.service";

export function useMissionQueryOptions() {
  return queryOptions({
    queryKey: ["mission"],
    queryFn: () => getAllMissions(),
  });
}

export function useMissionByIdQueryOptions(id: number) {
  return queryOptions({
    queryKey: ["mission", id],
    queryFn: () => getMissionById(id),
  });
}