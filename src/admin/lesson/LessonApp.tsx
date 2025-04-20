// src/admin/lesson/lessonapp.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLessonQueryOptions } from "./lessonQueryOption";
import { useEliminarLesson } from "./lesson.mutations";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { LessonModal } from "./LessonModal"; // Lo haremos ahora
import {  LessonFormType} from "./lesson.schema"
//compomentes que usan tankstack table
import { Table } from "../../shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";

export const LessonApp = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery(useLessonQueryOptions());
  const eliminarLeccion = useEliminarLesson();
  const { open } = useExitModal();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leccionIdToEdit, setLeccionIdToEdit] = useState<number | null>(null);
  const [leccionIdToDelete, setLeccionIdToDelete] = useState<number | null>(null);

  const handleUpdate = (id: number) => {
    setLeccionIdToEdit(id);
    setIsModalOpen(true);
  };  

  const handleDelete = (id: number) => {
    setLeccionIdToDelete(id);
    open();
  };

  const confirmDelete = () => {
    if (leccionIdToDelete !== null) {
      eliminarLeccion.mutate(leccionIdToDelete);
      setLeccionIdToDelete(null);
    }
  };
  //columns es nesecita el tipo de pregunta y por si viene nulo osea nada por eso esta el unknown
  const columns: ColumnDef<LessonFormType, unknown>[] = [
    {
      header: "Título", 
      accessorKey: "title", 
    },
    {
      header: "Unidad",
      accessorKey: "unit.title", // row.unit?.title
    },
    {
      header: "Orden",
      accessorKey: "order_num", // row.order_num
      // sin cell, se muestra por defecto el valor
    },
    {
      header: "Acciones",
      // 🔥 Aquí NO usamos accessorKey ni accessorFn
      // Porque no es una propiedad real ni calculada: es solo para mostrar botones
      cell: ({ row }) => {
        const lesson = row.original; // accedemos al objeto completo
        return (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => navigate(`/leccion-retos/${lesson.id}/${encodeURIComponent(lesson.title)}`)} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition">
              Agregar
            </button>
            <button onClick={() => handleUpdate(lesson.id!)} className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">
              Editar
            </button>
            <button onClick={() => handleDelete(lesson.id!)} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition">
              Eliminar
            </button>
          </div>
        );
      },
    },
  ];
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Lecciones</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Crear Lección
      </button>

      <LessonModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setLeccionIdToEdit(null);
        }}
        idleccion={leccionIdToEdit ?? undefined}
      />

<div className="overflow-x-auto">
      {isLoading && <p>Cargando...</p>}
      {error && <p>Error al cargar lecciones</p>}
      {data && <Table data={data} columns={columns} />}

</div>


      <DeleteModal onConfirm={confirmDelete} />
    </div>
  );
};
