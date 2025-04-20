import { z } from "zod";

export const MissionSchema = z.object({
  title: z.string().max(255, "El título no debe superar los 255 caracteres"),
  description: z.string().nonempty("La descripción es obligatoria"),
  granted_experience: z.number().int().min(0, "La experiencia no puede ser negativa"),
});

export type MissionFormType = z.infer<typeof MissionSchema>;

export type MissionType = {
  id: number;
  title: string;
  description: string;
  granted_experience: number;
};