import { UserProgress } from '../components/UserProgress'; 
import MissionsCard from '../components/MissionsCard'; 
import { FaHeart } from 'react-icons/fa'; 

const Tienda = () => {
  return (
    <div className="flex min-h-screen">
      {/* Contenido principal (en el centro) */}
      <div className="block lg:hidden">
        <UserProgress  />
      </div>

      <div className="flex-1 p-8 lg:pl-[256px]">
        {/* Icono de la tienda */}
        <div className="text-center">
          <img 
            src="/shop.svg" 
            alt="Icono Tienda" 
            className="mx-auto w-32 h-32 mb-4" // Tamaño del icono (ajústalo a tu gusto)
          />
          <h1 className="text-2xl font-semibold mb-6">Tienda</h1>
        </div>

        {/* Oferta de "Recargar vidas" */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Icono de Corazón */}
            <FaHeart className="text-red-500 w-6 h-6" />
            <span className="text-lg font-semibold">Recargar Vidas</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Puntos: 50</span>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Recargar Vida
          </button>
        </div>
      </div>

      {/* Barra de progreso (a la derecha) */}
      <div className="hidden lg:block w-[250px] bg-white p-4">
        <UserProgress  />
        <MissionsCard />
      </div>
    </div>
  );
};

export default Tienda;
