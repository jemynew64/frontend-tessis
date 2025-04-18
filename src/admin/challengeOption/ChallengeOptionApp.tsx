import { useParams,useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChallengeOptionType } from "./challengeOption.schema";
import { useOptionQueryOptions } from "./challengeOptionQueryOptions";
import { useEliminarOption } from "./challengeOption.mutations";
import { ChallengeOptionModal } from "./ChallengeOptionModal";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { RemoteImage } from "../../shared/components/RemoteImage";

export const ChallengeOptionApp = () => {
    const navigate = useNavigate();
  
  const { challenge_id, titulo } = useParams();
  const id = Number(challenge_id);
 
  const { data, isLoading, error } = useQuery(useOptionQueryOptions(id));
  const eliminar = useEliminarOption();
  const { open } = useExitModal();

  const [modalOpen, setModalOpen] = useState(false);
  const [optionId, setOptionId] = useState<number | null>(null);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setOptionId(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (idToDelete !== null) {
      eliminar.mutate(idToDelete);
      setIdToDelete(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Opciones del Reto <span className="text-purple-700">{titulo}</span></h1>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
      >
        ⬅️ Volver
      </button>
      <button
        onClick={() => { setModalOpen(true); setOptionId(null); }}
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Crear Opción
      </button>

      {isLoading && <p>Cargando...</p>}
      {error && <p>Error cargando opciones</p>}

      <table className="w-full bg-white rounded-xl overflow-hidden shadow-md table-fixed
">
  <thead className="bg-blue-50 text-blue-800 text-sm uppercase font-semibold">
    <tr>
      <th className="px-5 py-3 text-left">Texto</th>
      <th className="px-5 py-3 text-left">Correcta</th>
      <th className="px-5 py-3 text-left">Imagen</th>
      <th className="px-5 py-3 text-left">Audio</th>
      <th className="px-5 py-3 text-left">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {data?.map((op: ChallengeOptionType) => (
      <tr key={op.text} className="hover:bg-gray-50 border-b last:border-none">
        <td className="px-5 py-3">{op.text}</td>
        <td className="px-5 py-3">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              op.is_correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {op.is_correct ? "Sí" : "No"}
          </span>
        </td>
        <td className="px-5 py-3">
                <RemoteImage src={op.image_src} alt="no visualizable" />
              </td>
        <td className="px-5 py-3 text-blue-600 break-all">{op.audio_src || "-"}</td>
        <td className="px-5 py-3 flex gap-2">
          <button
            onClick={() => handleEdit(op.id!)}
            className="bg-blue-700 text-white px-3 py-1 rounded-md hover:bg-yellow-500 text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => {
              setIdToDelete(op.id!);
              open();
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
          >
            Eliminar
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      <ChallengeOptionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        idOpcion={optionId ?? undefined}
        idChallenge={id}
      />
      <DeleteModal onConfirm={confirmDelete} />
    </div>
  );
};
