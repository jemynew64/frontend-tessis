import useUserQueryOptions from "./UserQueryOption";
import { useSuspenseQuery } from "@tanstack/react-query";
import {StudentForm} from "./EstudianteSchema"

export const PageUser = () => {
  const { data } = useSuspenseQuery(useUserQueryOptions());
  //console.log(data); // Verifica si los datos se están obteniendo correctamente
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Usuarios</h1>
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
            {data?.map((user:StudentForm) => (
              <tr key={user.id} className="text-sm text-gray-800 hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">{user.hearts}</td>
                <td className="py-2 px-4 border-b text-center">{user.points}</td>
                <td className="py-2 px-4 border-b text-center">{user.experience}</td>
                <td className="py-2 px-4 border-b capitalize">{user.user_type}</td>
                <td><button className="bg-slate-600">hola soy un boton</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
