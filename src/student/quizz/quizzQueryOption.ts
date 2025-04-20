import { queryOptions } from "@tanstack/react-query";
import {obtenerQuizzforlesson} from "./quizz.service"

export  function useQuizzQueryOptions(lessonId: number) {
    return queryOptions({
        queryKey: ["quizz"],   //el de aca se nesecita para usar el cache y si le pasa un id digamos renderiza por id para diferenciar
        queryFn: () => obtenerQuizzforlesson(lessonId),  // aca es la consulta en mi caso es un get 
    });
}
