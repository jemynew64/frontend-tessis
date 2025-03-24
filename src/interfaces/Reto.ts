import { Opcion} from "./Opcion"
export interface Reto {
    id: number;
    tipo: string;
    pregunta: string;
    opciones: Opcion[];
  }