import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse, updateCourse, deleteCourse } from "./course.service";
import { CourseFormType } from "./course.schema";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["course"] }),
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CourseFormType> }) => updateCourse(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["course"] }),
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["course"] }),
  });
};