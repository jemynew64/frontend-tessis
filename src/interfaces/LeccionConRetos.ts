import { Reto} from "./Reto"

export  interface LeccionConRetos {
    id: number;
    titulo: string;
    retos: Reto[];
  }