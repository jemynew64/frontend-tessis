import { z } from "zod";

// mision_usuario.ts
export const UserMissionSchema = z.object({
  user_id: z.number().int(),
  daily_mission_id: z.number().int(),
  completed: z.boolean(),
  completed_at: z.date(),
});

export type UserMissionType = z.infer<typeof UserMissionSchema>;