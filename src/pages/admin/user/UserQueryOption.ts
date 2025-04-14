import { queryOptions } from "@tanstack/react-query";
import {obtenerTodosusuarios} from "./usuario.service"
//import {useState} from "react"
//aca solo estoy pasando las opciones que nesesitara para funcionar
//const [page, setpage] = useState(1)
export default function useUserQueryOptions() {
    return queryOptions({
        queryKey: ["user"],   //el de aca se nesecita para usar el cache y si le pasa un id digamos renderiza por id para diferenciar
        queryFn: () => obtenerTodosusuarios(),  // aca es la consulta en mi caso es un get 
    });
}