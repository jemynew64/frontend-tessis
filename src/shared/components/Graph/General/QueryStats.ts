// QueryStats.ts
import { useQuery } from "@tanstack/react-query";
import { obtenerEstadisticasUsuario } from "./UserGraph.service";

export const useUserGeneralStats = (idUsuarioIndicado?: string) =>
  useQuery({
    queryKey: ["userGeneralStats", idUsuarioIndicado],
    queryFn: () => obtenerEstadisticasUsuario(idUsuarioIndicado),
  });
