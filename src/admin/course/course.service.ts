import axiosAuth from "../../shared/utils/AxiosHeader";
import { CourseFormType, CourseType } from "./course.schema";

const BaseURL = import.meta.env.VITE_BASE_URL;

export const getAllCourses = async (): Promise<CourseType[]> => {
  const res = await axiosAuth.get(`${BaseURL}cursos/`);
  return res.data;
};

export const getCourseById = async (id: number): Promise<CourseType> => {
  const res = await axiosAuth.get(`${BaseURL}cursos/${id}/`);
  return res.data;
};

export const createCourse = async (data: CourseFormType): Promise<CourseFormType> => {
  const res = await axiosAuth.post(`${BaseURL}cursos/`, data);
  return res.data;
};

export const updateCourse = async (id: number, data: Partial<CourseFormType>): Promise<CourseFormType> => {
  const res = await axiosAuth.put(`${BaseURL}cursos/${id}/`, data);
  return res.data;
};

export const deleteCourse = async (id: number): Promise<{ message: string }> => {
  const res = await axiosAuth.delete(`${BaseURL}cursos/${id}/`);
  return res.data;
};