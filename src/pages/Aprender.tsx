import { UserProgress } from '../components/UserProgress'; 
import MissionsCard from '../components/MissionsCard';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom

const Aprender = () => {
  return (
    <div className="flex min-h-screen">
      {/* Mostrar barra de progreso en la parte superior solo en pantallas pequeñas */}
      <div className="block lg:hidden">
        <UserProgress puntos={500} vidas={4} />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8 lg:pl-[256px]">
        <div className="flex flex-col items-center h-screen p-4 space-y-6">
          <h1 className="text-center text-2xl font-bold">¿Listo para una nueva aventura?</h1>
          <div className="flex flex-col lg:flex-row gap-4 mt-4 w-full justify-center">
            {/* Mundo de los Números */}
            <Link to="/matematicas" className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:shadow-lg transition w-full lg:w-auto">
              <img 
                src="/images/iconosuma.png" 
                alt="Mundo de los Números" 
                className="w-32 h-32 object-cover mb-4 rounded-md" 
              />
              <p className="text-lg font-semibold text-center">Mundo de los Números</p>
            </Link>

            {/* Mundo de las Palabras */}
            <Link to="/comunicacion" className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:shadow-lg transition w-full lg:w-auto">
              <img 
                src="/images/iconolibro.png" 
                alt="Mundo de las Palabras" 
                className="w-32 h-32 object-cover mb-4 rounded-md" 
              />
              <p className="text-lg font-semibold text-center">Mundo de las Palabras</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Barra de progreso en el lado derecho solo visible en pantallas grandes */}
      <div className="hidden lg:block w-[250px] bg-white p-4">
        <UserProgress puntos={500} vidas={4} />
        <MissionsCard />
      </div>
    </div>
  );
};

export default Aprender;
