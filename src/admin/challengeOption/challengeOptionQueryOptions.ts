import { queryOptions } from "@tanstack/react-query";
import { obtenerTodasOpciones, obtenerOpcionPorId } from "./challengeOption.service";

export function useOptionQueryOptions(challengeId: number) {
  return queryOptions({
    queryKey: ["opciones_por_reto", challengeId],
    queryFn: () => obtenerTodasOpciones(challengeId),
  });
}

export function useOptionIdQueryOptions(id: number) {
  return queryOptions({
    queryKey: ["opcionReto", id],
    queryFn: () => obtenerOpcionPorId(id),
  });
}
