import { useState } from "react";
import { useUserQueryOptions } from "./UserQueryOption";
import { useQuery } from "@tanstack/react-query";
import { StudentForm } from "./EstudianteSchema";
import { UserModal } from "./UserModal";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { useEliminarUsuario } from "./usuario.mutations";
import { Table } from "../../shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

export const PageUser = () => {
  const { open } = useExitModal();
  const { data, isLoading, error } = useQuery(useUserQueryOptions());
  const eliminarUsuario = useEliminarUsuario();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const handleUpdate = (id: number) => {
    setEditingUserId(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setUserIdToDelete(id);
    open();
  };

  const confirmDelete = () => {
    if (userIdToDelete !== null) {
      eliminarUsuario.mutate(userIdToDelete);
      setUserIdToDelete(null);
    }
  };

  const columns: ColumnDef<StudentForm, unknown>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
      enableColumnFilter: true,
    },
    {
      header: "Correo",
      accessorKey: "email",
      enableColumnFilter: true,
    },
    {
      header: "❤️ Corazones",
      accessorKey: "hearts",
    },
    {
      header: "⭐ Puntos",
      accessorKey: "points",
    },
    {
      header: "🎯 Experiencia",
      accessorKey: "experience",
    },
    {
      header: "Tipo",
      accessorKey: "user_type",
      enableColumnFilter: true,
      cell: ({ getValue }) => (
        <span className="capitalize">{getValue() as string}</span>
      ),
    },
    {
      header: "Acciones",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleUpdate(user.id!)}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              title="Actualizar usuario"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => handleDelete(user.id!)}
              className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              title="Eliminar usuario"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Usuarios</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        className="mb-6 bg-purple-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-purple-700"
      >
        Crear Usuario
      </button>

      {isLoading && <p className="text-gray-500">Cargando usuarios...</p>}
      {error && <p className="text-red-500">Error al cargar usuarios</p>}
      {data && (
        <Table
          data={data}
          columns={columns}
          enableGlobalFilter
          enablePagination
          enableColumnVisibility
        />
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUserId(null);
        }}
        idusuario={editingUserId ?? undefined}
      />

      <DeleteModal onConfirm={confirmDelete} />
    </div>
  );
};
