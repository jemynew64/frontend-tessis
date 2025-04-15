// components/UserModal.tsx
import { StudentForm, studentSchema } from "./EstudianteSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCrearUsuario } from "./usuario.mutations";
//import {useUserIdQueryOptions } from "./UserQueryOption"
//import { useSuspenseQuery } from "@tanstack/react-query";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  idusuario? : number;
}

export const UserModal = ({ isOpen, onClose }: Props) => {
  //const userQuery = useSuspenseQuery(useUserIdQueryOptions(idusuario));
  //console.log(userQuery)
  //llamando a mi mutacion para hacer el create
  const { mutateAsync, isPending } = useCrearUsuario();

  //esto de aca solo es para el formulario
  const {register,handleSubmit,reset,formState: { errors },} = useForm<StudentForm>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      user_type: "student", // 👈 valor por defecto aquí
    },
  });
  

  const onSubmit = async (data: StudentForm) => {
    try {
      console.log("Datos enviados:", data);
      await mutateAsync(data); // 👈 Esperamos la mutación
      reset();     // Limpiar el formulario
      onClose();   // Cerrar el modal
    } catch (error) {
      console.error("Error al crear usuario:", error);
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
          Crear Usuario
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>

      {/* Body con el formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 space-y-4">
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">Nombre</label>
          <input {...register("name")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">Correo</label>
          <input {...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">Contraseña</label>
          <input type="password" {...register("password")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Corazones</label>
            <input type="number" {...register("hearts", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
            {errors.hearts && <p className="text-red-500 text-sm">{errors.hearts.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Puntos</label>
            <input type="number" {...register("points", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
            {errors.points && <p className="text-red-500 text-sm">{errors.points.message}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">Experiencia</label>
          <input type="number" {...register("experience", { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
          {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">Tipo de Usuario</label>
          <select {...register("user_type")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5">
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          {errors.user_type && <p className="text-red-500 text-sm">{errors.user_type.message}</p>}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600">Cancelar</button>
          <button 
            type="submit" 
            disabled={isPending}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isPending ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


  );
};
