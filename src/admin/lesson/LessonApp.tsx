// src/admin/lesson/lessonapp.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLessonQueryOptions } from "./lessonQueryOption";
import { useEliminarLesson } from "./lesson.mutations";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { LessonModal } from "./LessonModal"; // Lo haremos ahora

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

      {isLoading && <p>Cargando...</p>}
      {error && <p>Error al cargar lecciones</p>}

      <table className="w-full border bg-white shadow-sm rounded-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Título</th>
            <th className="p-3">Orden</th>
            <th className="p-3">Unidad</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((lesson) => (
            <tr key={lesson.id} className="hover:bg-gray-50 border-t">
              <td className="p-3">{lesson.title}</td>
              <td className="p-3">{lesson.order_num}</td>
              <td className="p-3">{lesson.unit?.title}</td>
              <td className="p-3 flex gap-2">
              <button
                  onClick={() => (navigate(`/leccion-retos/${lesson.id}/${encodeURIComponent(lesson.title)}`))}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  agregar
                </button>
                <button
                  onClick={() => handleUpdate(lesson.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(lesson.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteModal onConfirm={confirmDelete} />
    </div>
  );
};
