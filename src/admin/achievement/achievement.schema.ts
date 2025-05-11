import { z } from "zod";

export const AchievementSchema = z.object({
  id: z.number().optional(), // solo necesario si estás editando
  title: z.string().min(1, "El título es obligatorio").max(255),
  description: z.string().min(1, "La descripción es obligatoria").max(255),
  image_src: z.string().max(255), // ✅ Ya no es obligatoria
  stat_key: z.enum([
    "total_lessons",
    "total_lessons_perfect",
    "total_challenges",
    "total_correct_answers",
    "total_wrong_answers",
    "total_units_completed",
    "total_missions",
    "total_points",
    "total_experience",
    "quizzes_completed"
  ]),
  stat_condition: z.enum(["gte", "lte", "eq", "gt", "lt"]),
  stat_value: z.number().int().min(0),
});

export type AchievementFormType = z.infer<typeof AchievementSchema>; // Para formularios
export type AchievementType = AchievementFormType & { id: number };  // Para mostrar y editar
