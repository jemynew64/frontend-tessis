import { queryOptions } from "@tanstack/react-query";
import {obtenerTodosUsuariosRanking} from "./ranking.service"

export  function useRankingQueryOptions() {
    return queryOptions({
        queryKey: ["user"],   //el de aca se nesecita para usar el cache y si le pasa un id digamos renderiza por id para diferenciar
        queryFn: () => obtenerTodosUsuariosRanking(),  // aca es la consulta en mi caso es un get 
    });
}
