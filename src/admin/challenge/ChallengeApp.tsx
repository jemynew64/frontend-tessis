// src/admin/challenge/ChallengeApp.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useChallengeQueryOptions } from "./challengeQueryOptions";
import { ChallengeType } from "./challenge.schema";
import { useEliminarChallenge } from "./challenge.mutations";
import { ChallengeModal } from "./ChallengeModal";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";

export const ChallengeApp = () => {
  const { id_leccion, titulo } = useParams();
  const id = Number(id_leccion);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery(useChallengeQueryOptions(id));
  const eliminar = useEliminarChallenge();
  const { open } = useExitModal();

  const [openModal, setOpenModal] = useState(false);
  const [idChallenge, setIdChallenge] = useState<number | null>(null);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const handleEditar = (id: number) => {
    setIdChallenge(id);
    setOpenModal(true);
  };

  const handleEliminar = (id: number) => {
    setIdToDelete(id);
    open();
  };

  const confirmDelete = () => {
    if (idToDelete !== null) {
      eliminar.mutate(idToDelete);
      setIdToDelete(null);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
      >
        ⬅️ Volver
      </button>

      <h1 className="text-2xl font-semibold mb-6">
        Retos relacionados con <span className="text-purple-700">{titulo}</span>
      </h1>

      <button
        onClick={() => { setOpenModal(true); setIdChallenge(null); }}
        className="mb-6 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Crear Nuevo Reto
      </button>

      {isLoading && <p>Cargando retos...</p>}
      {error && <p>Ocurrió un error al cargar los retos</p>}

      <table className="w-full border bg-white shadow-md rounded-md">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Pregunta</th>
            <th className="p-3">Tipo</th>
            <th className="p-3">Imagen</th>
            <th className="p-3">Orden</th>
            <th className="p-3">Lección</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((reto: ChallengeType) => (
            <tr key={reto.id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">{reto.question}</td>
              <td className="p-3 capitalize">{reto.type}</td>
              <td className="p-3">{reto.image_src || "Sin imagen"}</td>
              <td className="p-3">{reto.order_num}</td>
              <td className="p-3">{titulo}</td>
              <td className="p-3 flex flex-wrap gap-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                  Agregar
                </button>
                <button onClick={() => handleEditar(reto.id!)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Editar
                </button>
                <button onClick={() => handleEliminar(reto.id!)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ChallengeModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        idChallenge={idChallenge ?? undefined}
        idLeccion={id}
      />

      <DeleteModal onConfirm={confirmDelete} />
    </div>
  );
};
