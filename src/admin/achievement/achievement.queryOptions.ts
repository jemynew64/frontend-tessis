import { queryOptions } from "@tanstack/react-query";
import { getAllAchievements, getAchievementById } from "./achievement.service";

export function useAchievementQueryOptions() {
  return queryOptions({
    queryKey: ["achievement"],
    queryFn: () => getAllAchievements(),
  });
}

export function useAchievementByIdQueryOptions(id: number) {
  return queryOptions({
    queryKey: ["achievement", id],
    queryFn: () => getAchievementById(id),
  });
}