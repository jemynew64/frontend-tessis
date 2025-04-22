import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUnitQueryOptions } from "./unit.queryOptions";
import { useDeleteUnit } from "./unit.mutations";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { UnitModal } from "./UnitModal";
import { Table } from "../../shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { UnitType } from "./unit.schema";

export const UnitApp = () => {
  const { data, isLoading, error } = useQuery(useUnitQueryOptions());
  const eliminar = useDeleteUnit();
  const { open } = useExitModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unitIdToEdit, setUnitIdToEdit] = useState<number | null>(null);
  const [unitIdToDelete, setUnitIdToDelete] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setUnitIdToEdit(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setUnitIdToDelete(id);
    open();
  };

  const confirmDelete = () => {
    if (unitIdToDelete !== null) {
      eliminar.mutate(unitIdToDelete);
      setUnitIdToDelete(null);
    }
  };

  const columns: ColumnDef<UnitType, unknown>[] = [
    { header: "Título", accessorKey: "title" },
    { header: "Descripción", accessorKey: "description" },
    { header: "Curso", accessorKey: "course.title" },
    { header: "Orden", accessorKey: "order_num" },
    {
      header: "Acciones",
      cell: ({ row }) => {
        const unit = row.original;
        return (
          <div className="flex gap-2">
            <button onClick={() => handleEdit(unit.id)} className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">Editar</button>
            <button onClick={() => handleDelete(unit.id)} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition">Eliminar</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Unidades</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Crear Unidad
      </button>

      {isLoading && <p>Cargando...</p>}
      {error && <p>Error al cargar unidades</p>}
      {data && <Table data={data} columns={columns} />}

      <UnitModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setUnitIdToEdit(null);
        }}
        idUnit={unitIdToEdit ?? undefined}
      />

      <DeleteModal onConfirm={confirmDelete} />
    </div>
  );
};
