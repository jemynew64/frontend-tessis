import { z } from "zod";

export const studentSchema = z.object({
  id: z.number().optional(),
  name: z.string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { message: "El nombre no puede superar los 50 caracteres." }),

  email: z.string()
    .email({ message: "El correo electrónico no es válido." }),

  password: z.string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
    .max(30, { message: "La contraseña no puede superar los 100 caracteres." }),

  hearts: z.number()
    .int({ message: "Las vidas deben ser un número entero." })
    .min(1, { message: "Debe haber al menos 1 vida." })
    .max(5, { message: "No puedes tener más de 5 vidas." }),

  points: z.number()
    .int({ message: "Los puntos deben ser un número entero." })
    .min(0, { message: "Los puntos no pueden ser negativos." }),

  experience: z.number()
    .int({ message: "La experiencia debe ser un número entero." })
    .min(0, { message: "La experiencia no puede ser negativa." }),

  user_type: z.enum(["student", "admin"], {
    message: "El tipo de usuario debe ser 'student' o 'admin'."
  }),
  // Campo opcional de imagen (URL)
  profile_image: z.string()
    .optional()
});

export type StudentForm = z.infer<typeof studentSchema>;
