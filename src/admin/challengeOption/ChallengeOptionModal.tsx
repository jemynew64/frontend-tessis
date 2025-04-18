import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChallengeOptionSchema, ChallengeOptionType } from "./challengeOption.schema";
import { useCrearOption, useActualizarOption } from "./challengeOption.mutations";
import { useQuery } from "@tanstack/react-query";
import { useOptionIdQueryOptions } from "./challengeOptionQueryOptions";
//para manejar la imagen 
//import { RemoteImage } from "../../shared/components/RemoteImage";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idOpcion?: number;
  idChallenge: number;
}

export const ChallengeOptionModal = ({ isOpen, onClose, idOpcion, idChallenge }: Props) => {
  const enabled = !!idOpcion;
  const { data } = useQuery({ ...useOptionIdQueryOptions(idOpcion!), enabled });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChallengeOptionType>({
    resolver: zodResolver(ChallengeOptionSchema),
  });

  const { mutateAsync: crear, isPending: creando } = useCrearOption();
  const { mutateAsync: actualizar, isPending: actualizando } = useActualizarOption();

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  useEffect(() => {
    if (!idOpcion && isOpen) {
      reset({
        text: "",
        is_correct: false,
        image_src: "",
        audio_src: "",
        challenge_id: idChallenge,
      });
    }
  }, [idOpcion, isOpen, idChallenge, reset]);

  const onSubmit = async (formData: ChallengeOptionType) => {
    try {
      if (idOpcion) {
        await actualizar({ id: idOpcion, data: formData });
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
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
  <div className="relative w-full max-w-md mx-auto">
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          {idOpcion ? "Editar Opción" : "Crear Opción"}
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto</label>
          <input
            {...register("text")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.text && <p className="text-sm text-red-600 mt-1">{errors.text.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("is_correct")} className="accent-blue-600 w-4 h-4" />
          <label className="text-sm font-medium text-gray-700">¿Es correcta?</label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagen</label>
          <input
            {...register("image_src")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Audio</label>
          <input
            {...register("audio_src")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-700 border-gray-300 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={creando || actualizando}
          >
            {creando || actualizando ? "Guardando..." : idOpcion ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};
