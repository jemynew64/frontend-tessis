import { FaHeart } from 'react-icons/fa'; 
import { useEnviarEstadisticasMutation } from './ShopMutations';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useState } from 'react';

type ErrorResponse = {
  message?: string;
  error?: string;
};

const Tienda = () => {
  const { mutate, isPending } = useEnviarEstadisticasMutation();
  const [bloqueado, setBloqueado] = useState(false);

  const handleRecargarVida = () => {
    setBloqueado(true); // bloquear inmediatamente
    mutate(undefined, {
      onSuccess: () => {
        toast.success('✅ Vida recargada correctamente');
        setTimeout(() => setBloqueado(false), 1000); // desbloquear después de 3 segundos
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<ErrorResponse>;
        const mensaje = axiosError?.response?.data?.error || "❌ Error inesperado al recargar vida";
        toast.error(mensaje);
        setTimeout(() => setBloqueado(false), 1000); // también desbloquear en caso de error
      }
    });
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8 lg:pl-[256px]">
        <div className="text-center">
          <img src="/shop.svg" alt="Icono Tienda" className="mx-auto w-32 h-32 mb-4" />
          <h1 className="text-2xl font-semibold mb-6">Tienda</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaHeart className="text-red-500 w-6 h-6" />
            <span className="text-lg font-semibold">Recargar Vidas</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Puntos: 50</span>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={handleRecargarVida}
            disabled={isPending || bloqueado}
            className={`px-6 py-2 rounded-lg text-white ${
              isPending || bloqueado ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
            }`}
          >
            {isPending ? 'Procesando...' : 'Recargar Vida'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tienda;
