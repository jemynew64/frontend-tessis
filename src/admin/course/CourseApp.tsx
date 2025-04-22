import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCourseQueryOptions } from "./course.queryOptions";
import { useDeleteCourse } from "./course.mutations";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { CourseModal } from "./CourseModal";
import { Table } from "../../shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { CourseType } from "./course.schema";
import { Pencil, Trash2 } from "lucide-react";
import { RemoteImage } from "../../shared/components/RemoteImage";

export const CourseApp = () => {
  const { data, isLoading, error } = useQuery(useCourseQueryOptions());
  const eliminar = useDeleteCourse();
  const { open } = useExitModal();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseIdToEdit, setCourseIdToEdit] = useState<number | null>(null);
  const [courseIdToDelete, setCourseIdToDelete] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setCourseIdToEdit(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setCourseIdToDelete(id);
    open();
  };

  const confirmDelete = () => {
    if (courseIdToDelete !== null) {
      eliminar.mutate(courseIdToDelete);
      setCourseIdToDelete(null);
    }
  };

  const columns: ColumnDef<CourseType, unknown>[] = [
    {
      header: "Título",
      accessorKey: "title",
      enableColumnFilter: true,
    },
    {
      header: "Imagen",
      accessorKey: "image_src",
      cell: ({ getValue }) => (
        <RemoteImage
          src={getValue() as string}
          alt="imagen curso"
          className="h-12 w-12 rounded object-cover"
        />
      ),
    },
    {
      header: "Acciones",
      cell: ({ row }) => {
        const course = row.original;
        return (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleEdit(course.id)}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              title="Editar curso"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => handleDelete(course.id)}
              className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              title="Eliminar curso"
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
      <h1 className="text-2xl font-semibold mb-4">Lista de Cursos</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Crear Curso
      </button>

      {isLoading && <p className="text-gray-500">Cargando cursos...</p>}
      {error && <p className="text-red-500">Error al cargar cursos</p>}
      {data && (
        <Table
          data={data}
          columns={columns}
          enableGlobalFilter
          enablePagination
          enableColumnVisibility
        />
      )}

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCourseIdToEdit(null);
        }}
        idCourse={courseIdToEdit ?? undefined}
      />

      <DeleteModal onConfirm={confirmDelete} />
    </div>
  );
};
