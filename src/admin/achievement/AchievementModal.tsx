import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AchievementFormType, AchievementSchema } from "./achievement.schema";
import { useCreateAchievement, useUpdateAchievement } from "./achievement.mutations";
import { useAchievementByIdQueryOptions } from "./achievement.queryOptions";
import { useQuery } from "@tanstack/react-query";
import { uploadImageToBackend } from "../../shared/utils/uploadImageToBackend";
import { RemoteImage } from "../../shared/components/RemoteImage";
import { Upload, Link as LinkIcon } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idAchievement?: number;
}

export const AchievementModal = ({ isOpen, onClose, idAchievement }: Props) => {
  
  const enabled = !!idAchievement;
  const { data } = useQuery({ ...useAchievementByIdQueryOptions(idAchievement!), enabled });
  
  const { register, handleSubmit, reset, formState: { errors },watch,setValue } = useForm<AchievementFormType>({
    resolver: zodResolver(AchievementSchema),
  });
  
  const [useUpload, setUseUpload] = useState(true);
  const image_src = watch("image_src"); // <-- para vista previa
  const { mutateAsync: create, isPending: creating } = useCreateAchievement();
  const { mutateAsync: update, isPending: updating } = useUpdateAchievement();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  useEffect(() => {
    if (!idAchievement && isOpen) {
      reset({
        title: "",
        description: "",
        image_src: "",
        required_experience: 0,
        required_level: 1,
      });
    }
  }, [idAchievement, isOpen, reset]);

  const onSubmit = async (formData: AchievementFormType) => {
    try {
      if (idAchievement) {
        await update({ id: idAchievement, data: formData });
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
              {idAchievement ? "Editar Logro" : "Crear Logro"}
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Título</label>
              <input {...register("title")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Descripción</label>
              <input {...register("description")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
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
                      Usar URL manual
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
                <>
                  <input
                    {...register("image_src")}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-2"
                  />
                  {errors.image_src && <p className="text-red-500 text-sm">{errors.image_src.message}</p>}
                </>
              )}

              {image_src && (
                <div className="flex justify-center mt-4 mb-2">
                  <RemoteImage src={image_src} alt="Vista previa" className="w-40 h-40 rounded object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Experiencia Requerida</label>
              <input type="number" {...register("required_experience", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.required_experience && <p className="text-red-500 text-sm">{errors.required_experience.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Nivel Requerido</label>
              <input type="number" {...register("required_level", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.required_level && <p className="text-red-500 text-sm">{errors.required_level.message}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600">Cancelar</button>
              <button type="submit" disabled={creating || updating} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                {creating || updating ? "Guardando..." : idAchievement ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};