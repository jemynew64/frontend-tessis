import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useChallengeQueryOptions } from "./challengeQueryOptions";
import { ChallengeType } from "./challenge.schema";
import { useEliminarChallenge } from "./challenge.mutations";
import { ChallengeModal } from "./ChallengeModal";
import { DeleteModal } from "../../shared/components/modals/delete-modal";
import { useExitModal } from "../../shared/store/use-exit-modal";
import { RemoteImage } from "../../shared/components/RemoteImage";
//compomentes que usan tankstack table
import { Table } from "../../shared/components/Table";
import { ColumnDef } from "@tanstack/react-table";

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

    //este pata almacena el id a update y abre el modal update
  const handleEditar = (id: number) => {
    setIdChallenge(id);
    setOpenModal(true);
  };

  //este pata almacena el id a eliminar y abre el modal eliminar
  const handleEliminar = (id: number) => {
    setIdToDelete(id);
    open();
  };

  //aca simplemente en el modal me sale un boton eliminar y ahi si eliminar y lo cierra
  const confirmDelete = () => {
    if (idToDelete !== null) {
      eliminar.mutate(idToDelete);
      setIdToDelete(null);
    }
  };

  //columns es nesecita el tipo de pregunta y por si viene nulo osea nada por eso esta el unknown
  const columns: ColumnDef<ChallengeType, unknown>[] = [
    {
      header: "Pregunta", // Título que se muestra en la tabla
      accessorKey: "question", // La columna usará row.question
      cell: ({ getValue }) => ( // Personalizamos cómo se muestra ese valor
        <div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
          {getValue() as string} {/* lo forzamos a string por seguridad */}
        </div>
      ),
    },
    {
      header: "Tipo",
      accessorKey: "type", // usa automáticamente row.type
      cell: ({ getValue }) => (
        <span className="capitalize">{getValue() as string}</span> // estilizado
      ),
    },
    {
      header: "Imagen",
      accessorKey: "image_src", // row.image_src
      cell: ({ getValue }) => (
        <RemoteImage src={getValue() as string} alt="no visualizable" />
      ),
    },
    {
      header: "Orden",
      accessorKey: "order_num", // row.order_num
      // sin cell, se muestra por defecto el valor
    },
    {
      header: "Lección",
      accessorFn: () => titulo || "", // No hay en el objeto, viene por useParams
      // no hay accessorKey porque no hay una clave real en ChallengeType
    },
    {
      header: "Acciones",
      // 🔥 Aquí NO usamos accessorKey ni accessorFn
      // Porque no es una propiedad real ni calculada: es solo para mostrar botones
      cell: ({ row }) => {
        const reto = row.original; // accedemos al objeto completo
        return (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                navigate(`/opciones-del-reto/${reto.id}/${encodeURIComponent(reto.question)}`)}
              className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition"
            >
              Agregar
            </button>
            <button
              onClick={() => handleEditar(reto.id!)}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
            >
              Editar
            </button>
            <button
              onClick={() => handleEliminar(reto.id!)}
              className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition"
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
      {/* cosas que esta arriba de la tabla */}
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

      {/* aca literal esta toda mi tabla en ese componente Table xd */}
      {isLoading && <p className="text-gray-500">Cargando retos...</p>}
      {error && <p>Ocurrió un error al cargar los retos</p>}
      {data && <Table data={data} columns={columns} />}

      {/* modales que son del update y create y el del delete */}
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
