import { z } from "zod";

//reto

export const ChallengeSchema = z.object({
  id: z.number().optional(),
  type: z.enum(["seleccionar", "escribir"], {
    errorMap: () => ({ message: "Debes seleccionar un tipo válido" }),
  }),
  question: z.string().min(1, "La pregunta es obligatoria"),
  order_num: z.number().min(1, "El orden debe ser un número positivo"),
  lesson_id: z.number().min(1, "Debe referenciar una lección válida"),
  image_src: z.string().optional(),
});



export type ChallengeType = z.infer<typeof ChallengeSchema>;
