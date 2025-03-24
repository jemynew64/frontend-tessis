export interface Leccion {
    id: number;
    titulo: string;
    estaBloqueada: boolean;
    estaCompletada: boolean;
}

export interface Unidad {
    id: number;
    titulo: string;
    descripcion: string;
    lecciones: Leccion[];
}

export interface Curso {
    id: number;
    titulo: string;
    unidades: Unidad[];
}
