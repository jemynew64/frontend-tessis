import { z } from "zod";

export const CourseSchema = z.object({
  title: z.string().max(255, "El título no debe superar los 255 caracteres").min(1,"este campo es obligatorio"),
  image_src: z.string().max(255, "La URL de la imagen no debe superar los 255 caracteres"),
});

export type CourseFormType = z.infer<typeof CourseSchema>;

export type CourseType = {
  id: number;
  title: string;
  image_src: string;
};