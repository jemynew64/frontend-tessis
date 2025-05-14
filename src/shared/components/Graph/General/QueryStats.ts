import { useQuery } from "@tanstack/react-query";
import { obtenerEstadisticasUsuario } from "./UserGraph.service";

export const useUserGeneralStats = () =>
  useQuery({
    queryKey: ["userGeneralStats"],
    queryFn: obtenerEstadisticasUsuario,
  });
