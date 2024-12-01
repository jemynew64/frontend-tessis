// types.ts
export interface Option {
    id: number;
    texto: string;
    esCorrecta: boolean;
  }
  
  export interface RetoType { // Renombramos Reto a RetoType
    id: number;
    pregunta: string;
    tipo: string;
    opciones: Option[];
  }
  
  export interface Lesson {
    id: number;
    titulo: string;
    estaBloqueada: boolean;
    estaCompletada: boolean;
    reto?: RetoType[]; // Usamos RetoType aquí
  }
  
  export interface Unidad {
    id: number;
    titulo: string;
    descripcion: string;
    lecciones: Lesson[];
  }
  
  export interface Curso {
    id: number;
    titulo: string;
    descripcion: string;
    unidades: Unidad[];
  }
  