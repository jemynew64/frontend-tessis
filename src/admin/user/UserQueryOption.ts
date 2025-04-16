import { queryOptions } from "@tanstack/react-query";
import {obtenerTodosUsuarios,obtenerUsuarioPorId} from "./usuario.service"

export  function useUserQueryOptions() {
    return queryOptions({
        queryKey: ["user"],   //el de aca se nesecita para usar el cache y si le pasa un id digamos renderiza por id para diferenciar
        queryFn: () => obtenerTodosUsuarios(),  // aca es la consulta en mi caso es un get 
    });
}

export function useUserIdQueryOptions(id: number) {
    return queryOptions({
      queryKey: ["user", id], // importante incluir el ID en el key para diferenciar el cache
      queryFn: () => obtenerUsuarioPorId(id),
    });
  }
  