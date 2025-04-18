import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChallengeSchema, ChallengeType } from "./challenge.schema";
import { useCrearChallenge, useActualizarChallenge } from "./challenge.mutations";
import { useQuery } from "@tanstack/react-query";
import { useChallengeIdQueryOptions } from "./challengeQueryOptions";
//para manejar la imagen 
import { RemoteImage } from "../../shared/components/RemoteImage";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  idChallenge?: number;
  idLeccion: number;
}

export const ChallengeModal = ({ isOpen, onClose, idChallenge, idLeccion }: Props) => {
  const enabled = !!idChallenge;
  const { data } = useQuery({ ...useChallengeIdQueryOptions(idChallenge!), enabled });

  const { register, handleSubmit, reset, formState: { errors },watch } = useForm<ChallengeType>({
    resolver: zodResolver(ChallengeSchema),
  });

  //para que se vea la imagen
  const image_src = watch("image_src");

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
  <div className="relative p-4 w-full max-w-md max-h-full">
    {/* Contenedor principal del modal */}
    <div className="relative bg-white rounded-lg shadow">
      
      {/* Header del modal */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
        <h3 className="text-lg font-semibold text-gray-900">
          {idChallenge ? "Editar Reto" : "Crear Reto"}
        </h3>
      </div>

      {/* Body con el formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 space-y-4">
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">Pregunta</label>
          <input {...register("question")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
          {errors.question && <p className="text-red-500 text-sm">{errors.question.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">Tipo</label>
          <input {...register("type")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">URL de Imagen (opcional)</label>
          <input {...register("image_src")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                <div className="flex justify-center mt-4 mb-2">
                    <RemoteImage src={image_src} alt="Vista previa" className="w-40 h-40" />
                </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">Orden</label>
          <input type="number" {...register("order_num", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
          {errors.order_num && <p className="text-red-500 text-sm">{errors.order_num.message}</p>}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={creando || actualizando}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {(creando || actualizando) ? "Guardando..." : idChallenge ? "Actualizar" : "Guardar"}
          </button>
        </div>

      </form>
    </div>
  </div>
</div>

  );
};