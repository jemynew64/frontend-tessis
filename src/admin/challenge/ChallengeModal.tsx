import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChallengeSchema, ChallengeType } from "./challenge.schema";
import { useCrearChallenge, useActualizarChallenge } from "./challenge.mutations";
import { useQuery } from "@tanstack/react-query";
import { useChallengeIdQueryOptions } from "./challengeQueryOptions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idChallenge?: number;
  idLeccion: number;
}

export const ChallengeModal = ({ isOpen, onClose, idChallenge, idLeccion }: Props) => {
  const enabled = !!idChallenge;
  const { data } = useQuery({ ...useChallengeIdQueryOptions(idChallenge!), enabled });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChallengeType>({
    resolver: zodResolver(ChallengeSchema),
  });

  const { mutateAsync: crear, isPending: creando } = useCrearChallenge();
  const { mutateAsync: actualizar, isPending: actualizando } = useActualizarChallenge();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  useEffect(() => {
    if (!idChallenge && isOpen) {
      reset({
        type: "",
        question: "",
        order_num: 1,
        lesson_id: idLeccion,
        image_src: "",
        id: 0,
      });
    }
  }, [idChallenge, isOpen, idLeccion, reset]);

  const onSubmit = async (formData: ChallengeType) => {
    try {
      if (idChallenge) {
        await actualizar({ id: idChallenge, data: formData });
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
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {idChallenge ? "Editar Reto" : "Crear Reto"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Pregunta</label>
            <input {...register("question")} className="input input-bordered w-full" />
            {errors.question && <p className="text-red-500 text-sm">{errors.question.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Tipo</label>
            <input {...register("type")} className="input input-bordered w-full" />
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>
          <div>
            <label className="block mb-1">URL Imagen</label>
            <input {...register("image_src")} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block mb-1">Orden</label>
            <input type="number" {...register("order_num", { valueAsNumber: true })} className="input input-bordered w-full" />
            {errors.order_num && <p className="text-red-500 text-sm">{errors.order_num.message}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-outline">Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={creando || actualizando}>
              {creando || actualizando ? "Guardando..." : idChallenge ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};