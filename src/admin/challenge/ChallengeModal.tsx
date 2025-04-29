import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChallengeSchema, ChallengeType } from "./challenge.schema";
import { useCrearChallenge, useActualizarChallenge } from "./challenge.mutations";
import { useQuery } from "@tanstack/react-query";
import { useChallengeIdQueryOptions } from "./challengeQueryOptions";
import { RemoteImage } from "../../shared/components/RemoteImage";
import { uploadImageToBackend } from "../../shared/utils/uploadImageToBackend";
import { Upload, Link as LinkIcon } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idChallenge?: number;
  idLeccion: number;
}

export const ChallengeModal = ({ isOpen, onClose, idChallenge, idLeccion }: Props) => {
  const isEditMode = !!idChallenge;

  const { data, isLoading } = useQuery({
    ...useChallengeIdQueryOptions(idChallenge!),
    enabled: isEditMode && isOpen,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ChallengeType>({
    resolver: zodResolver(ChallengeSchema),
    defaultValues: {
      type: "seleccionar", // 👈 Aquí también debe ir
      question: "",
      order_num: 1,
      lesson_id: idLeccion,
      image_src: "",
    },
  });

  const image_src = watch("image_src");
  const formValues = watch(); // 👈 mira todos los valores en tiempo real

  const { mutateAsync: crear, isPending: creando } = useCrearChallenge();
  const { mutateAsync: actualizar, isPending: actualizando } = useActualizarChallenge();

  useEffect(() => {
    if (isEditMode && data) {
      reset({
        ...data,
        type: data.type.toLowerCase() as "seleccionar" | "escribir",
        image_src: data.image_src ?? "", // 👈 convierte null a cadena vacía
      });
    }
  }, [data, isEditMode, reset]);
  

  useEffect(() => {
    if (!isEditMode && isOpen) {
      reset({
        type: "seleccionar", // 👈 Aquí también
        question: "",
        order_num: 1,
        lesson_id: idLeccion,
        image_src: "",
        id: 0,
      });
    }
  }, [isEditMode, isOpen, idLeccion, reset]);
  const [useUpload, setUseUpload] = useState(true); // al inicio del componente

  const onSubmit = async (formData: ChallengeType) => {
    try {
      console.log("✅ Validación pasó y se envía:", formData);
      if (isEditMode) {
        await actualizar({ id: idChallenge!, data: formData });
      } else {
        await crear(formData);
      }
      reset();
      onClose();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  if (!isOpen) return null;

  if (isEditMode && isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
        <div className="bg-white px-6 py-4 rounded shadow text-center">
          <p className="text-lg font-medium">Cargando reto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEditMode ? "Editar Reto" : "Crear Reto"}
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Pregunta</label>
              <input
                {...register("question")}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              />
              {errors.question && <p className="text-red-500 text-sm">{errors.question.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Tipo</label>
              <select
                {...register("type")}
                defaultValue="seleccionar"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="seleccionar">Seleccionar</option>
                <option value="escribir">Escribir</option>
              </select>

              {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
            </div>

            <div>
  <div className="flex items-center justify-between mb-1">
    <label className="text-sm font-medium text-gray-900">Imagen</label>
    <button
      type="button"
      className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
      onClick={() => setUseUpload((prev) => !prev)}
    >
      {useUpload ? (
        <>
          <LinkIcon className="w-4 h-4" />
          Usar URL
        </>
      ) : (
        <>
          <Upload className="w-4 h-4" />
          Subir imagen
        </>
      )}
    </button>
  </div>

  {useUpload ? (
    <input
      type="file"
      accept="image/*"
      className="block mt-2"
      onChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
          const url = await uploadImageToBackend(file);
          setValue("image_src", url);
        } catch (err) {
          console.error("Error al subir imagen:", err);
        }
      }}
    />
  ) : (
    <input
      {...register("image_src")}
      placeholder="https://ejemplo.com/imagen.jpg"
      className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 mt-2"
    />
  )}

  {image_src && (
    <div className="flex justify-center mt-4 mb-2">
      <RemoteImage src={image_src} alt="Vista previa" className="w-40 h-40 rounded object-cover" />
    </div>
  )}
</div>


            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Orden</label>
              <input
                type="number"
                {...register("order_num", { valueAsNumber: true })}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              />
              {errors.order_num && <p className="text-red-500 text-sm">{errors.order_num.message}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={creando || actualizando}
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                {(creando || actualizando) ? "Guardando..." : isEditMode ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
          <pre className="bg-gray-100 text-xs text-gray-800 p-2 rounded">
  {JSON.stringify(formValues, null, 2)}
</pre>

        </div>
      </div>
    </div>
  );
};
