import { useState,useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUnitQueryOptions,useCourseQueryOptions } from "./unit.queryOptions";
import { useDeleteUnit,useUploadUnitsExcel } from "./unit.mutations";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { UnitModal } from "./UnitModal";
import { Table } from "../../shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { UnitType } from "./unit.schema";

export const UnitApp = () => {
//trayendo cursos para el listado
  const { data:listacurso } = useQuery(useCourseQueryOptions());
  const [cursoId, setCursoId] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (listacurso && listacurso.length > 0) {
      setCursoId(listacurso[0].id); // predeterminado
    }
  }, [listacurso]);
  

  const { data, isLoading, error } = useQuery(useUnitQueryOptions());
  const eliminar = useDeleteUnit();
  const { open } = useExitModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unitIdToEdit, setUnitIdToEdit] = useState<number | null>(null);
  const [unitIdToDelete, setUnitIdToDelete] = useState<number | null>(null);

//para subir al excel xd
const subirExcel = useUploadUnitsExcel();
const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("course_id", String(cursoId)); // dinámico

  subirExcel.mutate(formData);
};

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
      {/* aca pongo el excel xd  */}
      {listacurso && (
  <div className="mb-4">
    <label htmlFor="curso-select" className="block text-sm font-medium text-gray-700 mb-1">
      Selecciona un Curso
    </label>
    <select
      id="curso-select"
      value={cursoId}
      onChange={(e) => setCursoId(Number(e.target.value))}
      className="border border-gray-300 rounded-lg px-3 py-2 w-full max-w-xs"
    >
      {listacurso.map((curso) => (
        <option key={curso.id} value={curso.id}>
          {curso.title}
        </option>
      ))}
    </select>
  </div>
)}

    <div className="flex flex-wrap gap-4 mb-6">
  <input
    id="excel-upload"
    type="file"
    accept=".xlsx"
    onChange={handleExcelUpload}
    className="hidden"
  />


  <button
    onClick={() => document.getElementById("excel-upload")?.click()}
    className="bg-green-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-green-700 transition font-medium"
  >
    📥 Subir Excel
  </button>

  <button
    onClick={() => setIsModalOpen(true)}
    className="bg-purple-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-purple-700 transition font-medium"
  >
    ➕ Crear Unidad
  </button>
  
</div>


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
