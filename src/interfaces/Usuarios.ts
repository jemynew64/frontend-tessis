
export interface User  {
    id: number;
    nombre: string;
    email: string;
    imagen_perfil: string;
    corazones: number;
    puntos: number;
    experiencia: number;
    nivel: number;        
    tipo_usuario: "admin" | "estudiante";  
  };