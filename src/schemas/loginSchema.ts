import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("El correo debe ser válido").nonempty("El correo es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").nonempty("La contraseña es obligatoria"),
});

export type LoginForm = z.infer<typeof loginSchema>;
