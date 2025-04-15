import { useState } from "react";
import {useUserQueryOptions} from "./UserQueryOption";
import { useQuery  } from "@tanstack/react-query";
import {StudentForm} from "./EstudianteSchema"
import { UserModal } from "./UserModal";
import {  DeleteModal} from '../../../components/modals/delete-modal'; 
import { useExitModal } from '../../../store/use-exit-modal'; 

export const PageUser = () => {
 //para abrir o cerrar el modal
 const { open } = useExitModal(); 

  const { data,isLoading, error  } = useQuery (useUserQueryOptions());
  const [isModalOpen, setIsModalOpen] = useState(false);
  //console.log(data); // Verifica si los datos se están obteniendo correctamente
  
  const handleEdit = (id: number) => {
    console.log("Editar usuario con ID:", id);
  };
  
  // const handleDelete = (id: number) => {
  //   console.log("Eliminar usuario con ID:", id);
  // };
  if (isLoading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error al cargar usuarios</div>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Usuarios</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4"
      >
        Crear
      </button>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
  <thead>
    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
      <th className="py-3 px-4 border-b">Nombre</th>
      <th className="py-3 px-4 border-b">Correo</th>
      <th className="py-3 px-4 border-b">Corazones</th>
      <th className="py-3 px-4 border-b">Puntos</th>
      <th className="py-3 px-4 border-b">Experiencia</th>
      <th className="py-3 px-4 border-b">Tipo</th>
      <th className="py-3 px-4 border-b">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {data?.map((user: StudentForm) => (
      <tr key={user.id} className="text-sm text-gray-800 hover:bg-gray-50">
        <td className="py-2 px-4 border-b">{user.name}</td>
        <td className="py-2 px-4 border-b">{user.email}</td>
        <td className="py-2 px-4 border-b text-center">{user.hearts}</td>
        <td className="py-2 px-4 border-b text-center">{user.points}</td>
        <td className="py-2 px-4 border-b text-center">{user.experience}</td>
        <td className="py-2 px-4 border-b capitalize">{user.user_type}</td>
        <td className="py-2 px-4 border-b flex gap-2">
          <button
            onClick={() => handleEdit(user.id!)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Actualizar
          </button>
          <button
            //onClick={() => handleDelete(user.id!)}
            onClick={() => open()}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
          >
            Eliminar
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
<DeleteModal/>
    </div>
  );
};
