import { queryOptions } from "@tanstack/react-query";
import {obtenerTodosCursos} from "./learn.service"

export  function useUserQueryOptions() {
    return queryOptions({
        queryKey: ["listarcursos"],   //el de aca se nesecita para usar el cache y si le pasa un id digamos renderiza por id para diferenciar
        queryFn: () => obtenerTodosCursos(),  // aca es la consulta en mi caso es un get 
    });
}
