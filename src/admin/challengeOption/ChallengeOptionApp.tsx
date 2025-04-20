import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChallengeOptionType } from "./challengeOption.schema";
import { useOptionQueryOptions } from "./challengeOptionQueryOptions";
import { useEliminarOption } from "./challengeOption.mutations";
import { ChallengeOptionModal } from "./ChallengeOptionModal";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { RemoteImage } from "../../shared/components/RemoteImage";
import { Table } from "../../shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";

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

  const columns: ColumnDef<ChallengeOptionType, unknown>[] = [
    {
      header: "Texto",
      accessorKey: "text",
    },
    {
      header: "Correcta",
      accessorKey: "is_correct",
      cell: ({ getValue }) => {
        const value = getValue() as boolean;
        return (
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {value ? "Sí" : "No"}
          </span>
        );
      },
    },
    {
      header: "Imagen",
      accessorKey: "image_src",
      cell: ({ getValue }) => (
        <RemoteImage src={getValue() as string} alt="no visualizable" />
      ),
    },
    {
      header: "Audio",
      accessorKey: "audio_src",
      cell: ({ getValue }) => (
        <span className="text-blue-600 break-all">
          {String(getValue() || "-")}
        </span>
      ),
    },
    {
      header: "Acciones",
      cell: ({ row }) => {
        const op = row.original;
        return (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleEdit(op.id!)}
              className="bg-blue-700 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-500 transition"
            >
              Editar
            </button>
            <button
              onClick={() => {
                setIdToDelete(op.id!);
                open();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
            >
              Eliminar
            </button>
          </div>
        );
      },
    },
  ];

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
      {data && <Table data={data} columns={columns} />}

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
