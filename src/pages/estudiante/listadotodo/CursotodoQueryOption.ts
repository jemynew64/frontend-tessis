import { queryOptions } from "@tanstack/react-query";
import {obtenerTodosUsuarios} from "./cursotodo.service"

export  function useUserQueryOptions() {
    return queryOptions({
        queryKey: ["listartodo"],   //el de aca se nesecita para usar el cache y si le pasa un id digamos renderiza por id para diferenciar
        queryFn: () => obtenerTodosUsuarios(),  // aca es la consulta en mi caso es un get 
    });
}
