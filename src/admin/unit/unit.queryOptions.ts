import { queryOptions } from "@tanstack/react-query";
import { getAllUnits, getUnitById } from "./unit.service";

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
