import { queryOptions } from "@tanstack/react-query";
import { getAllUnits, getUnitById,getAllCourses } from "./unit.service";

export function useUnitQueryOptions() {
  return queryOptions({
    queryKey: ["unit"],
    queryFn: () => getAllUnits(),
  });
}

export function useUnitByIdQueryOptions(id: number) {
  return queryOptions({
    queryKey: ["unit", id],
    queryFn: () => getUnitById(id),
  });
}

export function useCourseQueryOptions() {
  return queryOptions({
    queryKey: ["course"],
    queryFn: () => getAllCourses(),
  });
}