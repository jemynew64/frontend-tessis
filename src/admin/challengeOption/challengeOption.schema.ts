import { z } from "zod";

// opcionReto.schema.ts
export const ChallengeOptionSchema = z.object({
  id: z.number().optional(),
  text: z.string().min(1, "El texto no puede estar vacío"),
  is_correct: z.boolean(),
  image_src: z.string().optional(),
  audio_src: z.string().optional(),
  challenge_id: z.number().min(1, "Debe referenciar un reto válido"),
});

export type ChallengeOptionType = z.infer<typeof ChallengeOptionSchema>;
