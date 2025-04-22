// src/admin/lesson/LessonModal.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LessonSchema,LessonFormType } from "./lesson.schema";
import { useCrearLesson, useActualizarLesson } from "./lesson.mutations";
import { useLessonIdQueryOptions ,useUnitQueryOptions} from "./lessonQueryOption";
import { useQuery } from "@tanstack/react-query";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  idleccion?: number;
}

export const LessonModal = ({ isOpen, onClose, idleccion }: Props) => {

  const enabled = !!idleccion;
  const { data } = useQuery({ ...useLessonIdQueryOptions(idleccion!), enabled });
  //solo para el select
  const { data:todoslasunidades } = useQuery(useUnitQueryOptions());

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LessonFormType>({
    resolver: zodResolver(LessonSchema),
  });

  const { mutateAsync: crear, isPending: creando } = useCrearLesson();
  const { mutateAsync: actualizar, isPending: actualizando } = useActualizarLesson();

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        order_num: data.order_num,
        unit_id: data.unit_id,
      });
    }
  }, [data, reset]);

  useEffect(() => {
    if (!idleccion && isOpen) {
      reset({
        title: "",
        order_num: 1,
        unit_id: 1,
      });
    }
  }, [idleccion, isOpen, reset]);

  const onSubmit = async (formData: LessonFormType) => {
    try {
      if (idleccion) {
        await actualizar({ id: idleccion, data: formData });
      } else {
        await crear(formData);
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
              {idleccion ? "Editar Lección" : "Crear Lección"}
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Título</label>
              <input {...register("title")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Orden</label>
              <input type="number" {...register("order_num", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.order_num && <p className="text-red-500 text-sm">{errors.order_num.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Unidad</label>
              <select
                {...register("unit_id", { valueAsNumber: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">Selecciona una unidad</option>
                {todoslasunidades?.map((unidad) => (
                  <option key={unidad.id} value={unidad.id}>
                    {unidad.title}
                  </option>
                ))}
              </select>
              {errors.unit_id && <p className="text-red-500 text-sm">{errors.unit_id.message}</p>}
            </div>


            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600">
                Cancelar
              </button>
              <button
                type="submit"
                disabled={creando || actualizando}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {creando || actualizando ? "Guardando..." : idleccion ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

