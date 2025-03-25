import {z  } from "zod"

export const estudianteSchema = z.object({
    nombre: z.string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { message: "El nombre no puede superar los 50 caracteres." }),
  
  email: z.string()
    .email({ message: "El correo electrónico no es válido." }),
  
  contraseña: z.string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
    .max(30, { message: "La contraseña no puede superar los 100 caracteres." }),
  
  corazones: z.number()
    .int({ message: "Las vidas deben ser un número entero." })
    .min(1, { message: "Debe haber al menos 1 vida." })
    .max(5, { message: "No puedes tener más de 5 vidas." }),
  
  puntos: z.number()
    .int({ message: "Los puntos deben ser un número entero." })
    .min(0, { message: "Los puntos no pueden ser negativos." }),
  
  experiencia: z.number()
    .int({ message: "La experiencia debe ser un número entero." })
    .min(0, { message: "La experiencia no puede ser negativa." }),
  
  tipo_usuario: z.enum(["estudiante", "admin"], {
    message: "El tipo de usuario debe ser 'estudiante' o 'admin'."
  })
});

export type FormEstudiante = z.infer<typeof estudianteSchema>;
