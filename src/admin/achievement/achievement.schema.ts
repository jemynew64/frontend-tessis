import { z } from "zod";

export const AchievementSchema = z.object({
  title: z.string().max(255, "El título no debe superar los 255 caracteres").nonempty("La descripción es obligatoria"),
  description: z.string().max(255, "La descripción no debe superar los 255 caracteres").nonempty("La descripción es obligatoria"),
  image_src: z.string().max(255, "La URL de la imagen no debe superar los 255 caracteres"),
  required_experience: z.number().min(0, "La experiencia requerida no puede ser negativa"),
  required_level: z.number().min(1, "El nivel requerido debe ser al menos 1"),
});

export type AchievementFormType = z.infer<typeof AchievementSchema>;

export type AchievementType = {
  id: number;
  title: string;
  description: string;
  image_src: string;
  required_experience: number;
  required_level: number;
};