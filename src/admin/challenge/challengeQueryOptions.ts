import { queryOptions } from "@tanstack/react-query";
import { obtenerTodosretosdereto, obtenerretoPorId } from "./challengeapp.service";

export function useChallengeQueryOptions(id_leccion: number) {
  return queryOptions({
    queryKey: ["retos_por_leccion", id_leccion],
    queryFn: () => obtenerTodosretosdereto(id_leccion),
  });
}

export function useChallengeIdQueryOptions(id: number) {
  return queryOptions({
    queryKey: ["reto", id],
    queryFn: () => obtenerretoPorId(id),
  });
}