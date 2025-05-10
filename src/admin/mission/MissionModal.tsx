import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MissionFormType, MissionSchema } from "./mission.schema";
import { useCreateMission, useUpdateMission } from "./mission.mutations";
import { useMissionByIdQueryOptions } from "./mission.queryOptions";
import { useQuery } from "@tanstack/react-query";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idMission?: number;
}

const statKeyOptions = [
  { value: "lessons_completed", label: "Lecciones completadas" },
  { value: "lessons_perfect", label: "Lecciones perfectas" },
  { value: "challenges_completed", label: "Retos completados" },
  { value: "correct_answers", label: "Respuestas correctas" },
  { value: "wrong_answers", label: "Respuestas incorrectas" },
  { value: "experience_gained", label: "Experiencia ganada" },
  { value: "points_gained", label: "Puntos ganados" },
  { value: "time_spent_minutes", label: "Minutos activos" },
];

const statConditionOptions = [
  { value: "gte", label: "≥ Mayor o igual" },
  { value: "lte", label: "≤ Menor o igual" },
  { value: "eq",  label: "= Igual a" },
  { value: "gt",  label: "> Mayor que" },
  { value: "lt",  label: "< Menor que" },
];

export const MissionModal = ({ isOpen, onClose, idMission }: Props) => {
  const enabled = !!idMission;
  const { data } = useQuery({ ...useMissionByIdQueryOptions(idMission!), enabled });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<MissionFormType>({
    resolver: zodResolver(MissionSchema),
  });

  const { mutateAsync: create, isPending: creating } = useCreateMission();
  const { mutateAsync: update, isPending: updating } = useUpdateMission();

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  useEffect(() => {
    if (!idMission && isOpen) {
      reset({
        title: "",
        description: "",
        granted_experience: 0,
        stat_key: "lessons_completed",
        stat_condition: "gte",
        stat_value: 1,
      });
    }
  }, [idMission, isOpen, reset]);

  const onSubmit = async (formData: MissionFormType) => {
    try {
      if (idMission) {
        await update({ id: idMission, data: formData });
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
              {idMission ? "Editar Misión" : "Crear Misión"}
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Título</label>
              <input {...register("title")} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Descripción</label>
              <textarea {...register("description")} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Exp. Otorgada</label>
              <input type="number" {...register("granted_experience", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" />
              {errors.granted_experience && <p className="text-red-500 text-sm">{errors.granted_experience.message}</p>}
            </div>

            {/* NUEVOS CAMPOS */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Campo Evaluado</label>
              <select {...register("stat_key")} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
                {statKeyOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.stat_key && <p className="text-red-500 text-sm">{errors.stat_key.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Condición</label>
              <select {...register("stat_condition")} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
                {statConditionOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.stat_condition && <p className="text-red-500 text-sm">{errors.stat_condition.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Valor a cumplir</label>
              <input type="number" {...register("stat_value", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" />
              {errors.stat_value && <p className="text-red-500 text-sm">{errors.stat_value.message}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600">Cancelar</button>
              <button type="submit" disabled={creating || updating} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                {creating || updating ? "Guardando..." : idMission ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
