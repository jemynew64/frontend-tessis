import { z } from "zod";

// unidad.ts (front-end)
export const UnitSchema = z.object({
  title: z.string()
    .min(1, "Este campo es obligatorio")
    .max(255, "El título no debe superar los 255 caracteres"),
  description: z.string()
    .min(1, "Este campo es obligatorio"),
  order_num: z.number()
    .min(1, "El orden debe ser un número positivo"),
  course_id: z.number()
    .min(1, "Debe referenciar un curso válido"),
  color: z.enum([
    "red", "orange", "amber", "yellow", "lime", "green", "emerald",
    "teal", "cyan", "sky", "blue", "indigo", "violet", "purple",
    "fuchsia", "pink", "rose", "slate", "gray", "zinc", "neutral", "stone"
  ]).default("green"), // campo opcional con valor por defecto
});

// Para formularios
export type UnitFormType = z.infer<typeof UnitSchema>;

// Tipo general con ID y relación a curso
export type UnitType = {
  id: number;
  title: string;
  description: string;
  order_num: number;
  course_id: number;
  color: z.infer<typeof UnitSchema>['color'];
  course: {
    title: string;
  };
};
