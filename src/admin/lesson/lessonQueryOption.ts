import { queryOptions } from "@tanstack/react-query";
import {obtenerTodosleccions,obtenerleccionPorId ,getAllUnits} from "./lessonapp.service"

export  function useLessonQueryOptions() {
    return queryOptions({
        queryKey: ["leccion"],   //el de aca se nesecita para usar el cache y si le pasa un id digamos renderiza por id para diferenciar
        queryFn: () => obtenerTodosleccions(),  // aca es la consulta en mi caso es un get 
    });
}

export function useLessonIdQueryOptions(id: number) {
    return queryOptions({
      queryKey: ["leccion", id], // importante incluir el ID en el key para diferenciar el cache
      queryFn: () => obtenerleccionPorId(id),
    });
  }
  
export function useUnitQueryOptions() {
  return queryOptions({
    queryKey: ["unit"],
    queryFn: () => getAllUnits(),
  });
}