import axiosAuth from "../../shared/utils/AxiosHeader";
import { UnitFormType, UnitType } from "./unit.schema";

const BaseURL = import.meta.env.VITE_BASE_URL;

export const getAllUnits = async (): Promise<UnitType[]> => {
  const res = await axiosAuth.get(`${BaseURL}unidades/`);
  return res.data;
};

export const getUnitById = async (id: number): Promise<UnitType> => {
  const res = await axiosAuth.get(`${BaseURL}unidades/${id}/`);
  return res.data;
};

export const createUnit = async (unit: UnitFormType): Promise<UnitFormType> => {
  const res = await axiosAuth.post(`${BaseURL}unidades/`, unit);
  return res.data;
};

export const updateUnit = async (id: number, unit: Partial<UnitFormType>): Promise<UnitFormType> => {
  const res = await axiosAuth.put(`${BaseURL}unidades/${id}/`, unit);
  return res.data;
};

export const deleteUnit = async (id: number): Promise<{ message: string }> => {
  const res = await axiosAuth.delete(`${BaseURL}unidades/${id}/`);
  return res.data;
};

//para el select
import { CourseType } from "../course/course.schema";

export const getAllCourses = async (): Promise<CourseType[]> => {
  const res = await axiosAuth.get(`${BaseURL}cursos/`);
  return res.data;
};