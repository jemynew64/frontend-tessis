import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAchievementQueryOptions } from "./achievement.queryOptions";
import { useDeleteAchievement } from "./achievement.mutations";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { AchievementModal } from "./AchievementModal";
import { Table } from "../../shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { AchievementType } from "./achievement.schema";

export const AchievementApp = () => {
  const { data, isLoading, error } = useQuery(useAchievementQueryOptions());
  const eliminar = useDeleteAchievement();
  const { open } = useExitModal();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievementIdToEdit, setAchievementIdToEdit] = useState<number | null>(null);
  const [achievementIdToDelete, setAchievementIdToDelete] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setAchievementIdToEdit(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setAchievementIdToDelete(id);
    open();
  };

  const confirmDelete = () => {
    if (achievementIdToDelete !== null) {
      eliminar.mutate(achievementIdToDelete);
      setAchievementIdToDelete(null);
    }
  };

  const columns: ColumnDef<AchievementType, unknown>[] = [
    { header: "Título", accessorKey: "title" },
    { header: "Descripción", accessorKey: "description" },
    {
      header: "Imagen",
      accessorKey: "image_src",
      cell: ({ getValue }) => (
        <img src={getValue() as string} alt="logro" className="h-12 w-12 object-cover rounded" />
      ),
    },
    { header: "Exp. Requerida", accessorKey: "required_experience" },
    { header: "Nivel Requerido", accessorKey: "required_level" },
    {
      header: "Acciones",
      cell: ({ row }) => {
        const achievement = row.original;
        return (
          <div className="flex gap-2">
            <button onClick={() => handleEdit(achievement.id)} className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">Editar</button>
            <button onClick={() => handleDelete(achievement.id)} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition">Eliminar</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Logros</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Crear Logro
      </button>

      {isLoading && <p>Cargando...</p>}
      {error && <p>Error al cargar logros</p>}
      {data && <Table data={data} columns={columns} />}

      <AchievementModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setAchievementIdToEdit(null);
        }}
        idAchievement={achievementIdToEdit ?? undefined}
      />

      <DeleteModal onConfirm={confirmDelete} />
    </div>
  );
};