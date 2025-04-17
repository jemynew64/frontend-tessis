import { queryOptions } from "@tanstack/react-query";
import {obtenerTodosUsuarios} from "./cursotodo.service"

// ✅ Puedes hacerlo opcional, por defecto en `true`
export function useUserQueryOptions(course_id: number,user_id: number,enabled: boolean = true) {
    return queryOptions({
      queryKey: ["listartodo", course_id, user_id],
      queryFn: () => obtenerTodosUsuarios(course_id, user_id),
      enabled,
    });
  }
  