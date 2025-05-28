// components/UserModal.tsx
import { StudentForm, studentSchema } from "./EstudianteSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCrearUsuario, useActualizarUsuario } from "./usuario.mutations";
import { useUserIdQueryOptions } from "./UserQueryOption";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import profileImages from "./Imagen_perfil.json";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idusuario?: number;
}

export const UserModal = ({ isOpen, onClose, idusuario }: Props) => {
  const enabled = !!idusuario;
  const { data } = useQuery({
    ...useUserIdQueryOptions(idusuario!),
    enabled,
  });

  const { mutateAsync: crearusuario, isPending: usuariopendiente } = useCrearUsuario();
  const { mutateAsync: actualizarusuario, isPending: actualizacionpendiente } = useActualizarUsuario();

const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<StudentForm>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      user_type: "student",
      profile_image: "/images/iconomorado.jpg",
    },
  });
  const selectedImage = watch("profile_image");

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        email: data.email || "",
        password: "",
        hearts: data.hearts || 5,
        points: data.points || 0,
        experience: data.experience || 0,
        user_type: data.user_type || "student",
        profile_image: data.profile_image || "/images/iconomorado.jpg",
      });
    }
  }, [data, reset]);

  useEffect(() => {
    if (!idusuario && isOpen) {
      reset({
        name: "",
        email: "",
        password: "",
        hearts: 5,
        points: 0,
        experience: 0,
        user_type: "student",
        profile_image: "/images/iconomorado.jpg",
      });
    }
  }, [idusuario, isOpen, reset]);

  const onSubmit = async (formData: StudentForm) => {
    try {
      if (idusuario) {
        await actualizarusuario({ id: idusuario, data: formData });
      } else {
        await crearusuario(formData);
      }
      reset();
      onClose();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  if (!isOpen) return null;

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              {idusuario ? "Editar Usuario" : "Crear Usuario"}
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Nombre</label>
              <input {...register("name")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Correo</label>
              <input {...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Contraseña</label>
              <input type="password" {...register("password")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">Corazones</label>
                <input type="number" {...register("hearts", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                {errors.hearts && <p className="text-red-500 text-sm">{errors.hearts.message}</p>}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">Puntos</label>
                <input type="number" {...register("points", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                {errors.points && <p className="text-red-500 text-sm">{errors.points.message}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Experiencia</label>
              <input type="number" {...register("experience", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Tipo de Usuario</label>
              <select {...register("user_type")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
              {errors.user_type && <p className="text-red-500 text-sm">{errors.user_type.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Imagen de Perfil</label>
              <select {...register("profile_image")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                {profileImages.map((img) => (
                  <option key={img.value} value={img.value}>{img.label}</option>
                ))}
              </select>
              {errors.profile_image && <p className="text-red-500 text-sm">{errors.profile_image.message}</p>}

              {/* Vista previa de la imagen seleccionada */}
              <div className="mt-2 flex justify-center">
                <img
                  src={selectedImage}
                  alt="Vista previa"
                  className="h-16 w-16 rounded-full object-cover border"
                />
              </div>
            </div>


            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={handleCancel} className="px-4 py-2 border rounded text-gray-600">
                Cancelar
              </button>
              <button
                type="submit"
                disabled={usuariopendiente || actualizacionpendiente}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {(usuariopendiente || actualizacionpendiente)
                  ? "Guardando..."
                  : idusuario
                  ? "Actualizar"
                  : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
