import { useState } from "react";
import { Generarpdf } from "./profile.service";
import { Loader2 } from "lucide-react"; // Usa el ícono de carga si ya tienes Lucide

interface Props {
  from: string;
  to: string;
}

export const GeneratePdfButton = ({ from, to }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      await Generarpdf(from, to);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={isLoading}
      className={`mt-2 px-4 py-2 rounded text-white transition ${
        isLoading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
      } flex items-center gap-2`}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin w-4 h-4" />
          Generando...
        </>
      ) : (
        "Generar un PDF detallado"
      )}
    </button>
  );
};
