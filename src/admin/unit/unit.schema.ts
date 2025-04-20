import { z } from "zod";

export const UnitSchema = z.object({
  title: z.string().max(255, "El título no debe superar los 255 caracteres"),
  description: z.string(),
  order_num: z.number().min(1, "El orden debe ser un número positivo"),
  course_id: z.number().min(1, "Debe referenciar un curso válido"),
});

export type UnitFormType = z.infer<typeof UnitSchema>;

export type UnitType = {
  id: number;
  title: string;
  description: string;
  order_num: number;
  course_id: number;
  course: {
    title: string;
  };
};