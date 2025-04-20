import { queryOptions } from "@tanstack/react-query";
import { getAllCourses, getCourseById } from "./course.service";

export function useCourseQueryOptions() {
  return queryOptions({
    queryKey: ["course"],
    queryFn: () => getAllCourses(),
  });
}

export function useCourseByIdQueryOptions(id: number) {
  return queryOptions({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
  });
}