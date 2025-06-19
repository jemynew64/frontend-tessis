import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UnitFormType, UnitSchema } from "./unit.schema";
import { useCreateUnit, useUpdateUnit } from "./unit.mutations";
import { useUnitByIdQueryOptions, useCourseQueryOptions } from "./unit.queryOptions";
import { useQuery } from "@tanstack/react-query";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idUnit?: number;
}

// Lista de colores para el select (mismos del enum)
const colorOptions = [
  "red","orange","amber","yellow","lime","green","emerald",
  "teal","cyan","sky","blue","indigo","violet","purple",
  "fuchsia","pink","rose","slate","gray","zinc","neutral","stone"
] as const;

type ColorOption = typeof colorOptions[number];

export const UnitModal = ({ isOpen, onClose, idUnit }: Props) => {
  const { data: listacurso } = useQuery(useCourseQueryOptions());
  const enabled = !!idUnit;
  const { data } = useQuery({ ...useUnitByIdQueryOptions(idUnit!), enabled });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<UnitFormType>({
    resolver: zodResolver(UnitSchema),
  });

  // Obtenemos el color seleccionado para mostrar indicador
  const selectedColor = watch("color");

  const { mutateAsync: create, isPending: creating } = useCreateUnit();
  const { mutateAsync: update, isPending: updating } = useUpdateUnit();

  // Poblado de datos en edición
  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        description: data.description,
        order_num: data.order_num,
        course_id: data.course_id,
        color: data.color as ColorOption,
      });
    }
  }, [data, reset]);

  // Valores por defecto al abrir modal en creación
  useEffect(() => {
    if (!idUnit && isOpen) {
      reset({
        title: "",
        description: "",
        order_num: 1,
        course_id: listacurso?.[0]?.id ?? 1,
        color: "green",
      });
    }
  }, [idUnit, isOpen, reset, listacurso]);

  const onSubmit = async (formData: UnitFormType) => {
    try {
      if (idUnit) {
        await update({ id: idUnit, data: formData });
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
              {idUnit ? "Editar Unidad" : "Crear Unidad"}
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 space-y-4">
            {/* Título */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Título</label>
              <input
                {...register("title")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            {/* Descripción */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Descripción</label>
              <textarea
                {...register("description")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Orden */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Orden</label>
              <input
                type="number"
                {...register("order_num", { valueAsNumber: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
              {errors.order_num && <p className="text-red-500 text-sm">{errors.order_num.message}</p>}
            </div>

            {/* Curso */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Curso</label>
              <select
                {...register("course_id", { valueAsNumber: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">Selecciona un curso</option>
                {listacurso?.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.title}
                  </option>
                ))}
              </select>
              {errors.course_id && <p className="text-red-500 text-sm">{errors.course_id.message}</p>}
            </div>

            {/* Color con indicador */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Color</label>
              <div className="flex items-center gap-2">
                <select
                  {...register("color")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                  {colorOptions.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
                {/* Indicador de color */}
                <span
                  className={`w-6 h-6 rounded-full border border-gray-300 bg-${selectedColor}-500`}
                />
              </div>
              {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={creating || updating}
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                {creating || updating ? "Guardando..." : idUnit ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
