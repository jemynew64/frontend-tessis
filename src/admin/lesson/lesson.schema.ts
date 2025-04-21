import { z } from "zod";

// leccion.ts
export const LessonSchema = z.object({
  id: z.number().optional(),
  title: z.string().max(255, "El título no debe superar los 255 caracteres").min(1,"este campo es obligatorio"),
  order_num: z.number().min(1, "El orden debe ser un número positivo"),
  unit_id: z.number().min(1, "Debe referenciar una unidad válida"),
});


export type LessonFormType = z.infer<typeof LessonSchema>; // <-- ✅ este es el tipo que espera tu formulario


export type LessonType = {
    id:        number;
    title:     string;
    order_num: number;
    unit_id:   number;
    unit:      Unit;
}

export interface Unit {
    title: string;
}