import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseFormType, CourseSchema } from "./course.schema";
import { useCreateCourse, useUpdateCourse } from "./course.mutations";
import { useCourseByIdQueryOptions } from "./course.queryOptions";
import { useQuery } from "@tanstack/react-query";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idCourse?: number;
}

export const CourseModal = ({ isOpen, onClose, idCourse }: Props) => {
  const enabled = !!idCourse;
  const { data } = useQuery({ ...useCourseByIdQueryOptions(idCourse!), enabled });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CourseFormType>({
    resolver: zodResolver(CourseSchema),
  });

  const { mutateAsync: create, isPending: creating } = useCreateCourse();
  const { mutateAsync: update, isPending: updating } = useUpdateCourse();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  useEffect(() => {
    if (!idCourse && isOpen) {
      reset({ title: "", image_src: "" });
    }
  }, [idCourse, isOpen, reset]);

  const onSubmit = async (formData: CourseFormType) => {
    try {
      if (idCourse) {
        await update({ id: idCourse, data: formData });
      } else {
        await create(formData);
      }
      reset();
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              {idCourse ? "Editar Curso" : "Crear Curso"}
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Título</label>
              <input {...register("title")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">URL de la imagen</label>
              <input {...register("image_src")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.image_src && <p className="text-red-500 text-sm">{errors.image_src.message}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600">Cancelar</button>
              <button type="submit" disabled={creating || updating} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                {creating || updating ? "Guardando..." : idCourse ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
