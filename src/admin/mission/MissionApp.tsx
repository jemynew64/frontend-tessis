import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMissionQueryOptions } from "./mission.queryOptions";
import { useDeleteMission } from "./mission.mutations";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { MissionModal } from "./MissionModal";
import { Table } from "../../shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { MissionType } from "./mission.schema";

export const MissionApp = () => {
  const { data, isLoading, error } = useQuery(useMissionQueryOptions());
  const eliminar = useDeleteMission();
  const { open } = useExitModal();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missionIdToEdit, setMissionIdToEdit] = useState<number | null>(null);
  const [missionIdToDelete, setMissionIdToDelete] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setMissionIdToEdit(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setMissionIdToDelete(id);
    open();
  };

  const confirmDelete = () => {
    if (missionIdToDelete !== null) {
      eliminar.mutate(missionIdToDelete);
      setMissionIdToDelete(null);
    }
  };

  const columns: ColumnDef<MissionType, unknown>[] = [
    { header: "Título", accessorKey: "title" },
    { header: "Descripción", accessorKey: "description" },
    { header: "Exp. Otorgada", accessorKey: "granted_experience" },
    {
      header: "Acciones",
      cell: ({ row }) => {
        const mission = row.original;
        return (
          <div className="flex gap-2">
            <button onClick={() => handleEdit(mission.id)} className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">Editar</button>
            <button onClick={() => handleDelete(mission.id)} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition">Eliminar</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Misiones</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Crear Misión
      </button>

      {isLoading && <p>Cargando...</p>}
      {error && <p>Error al cargar misiones</p>}
      {data && <Table data={data} columns={columns} />}

      <MissionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setMissionIdToEdit(null);
        }}
        idMission={missionIdToEdit ?? undefined}
      />

      <DeleteModal onConfirm={confirmDelete} />
    </div>
  );
};