import { UserProgress } from '../../components/UserProgress'; 
import MissionsCard from '../../components/MissionsCard';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import { useAuthStore } from '../../store/auth';  // Importar el hook para obtener el estado del usuario

const Aprender = () => {

  const user = useAuthStore((state) => state.user);  // Obtener el usuario desde el estado global


  return (
    <div className="flex min-h-screen">
      {/* Mostrar barra de progreso en la parte superior solo en pantallas pequeñas */}
      <div className="block lg:hidden">
        <UserProgress  />
      </div>
      {/* Contenido principal */}
      <div className="flex-1 p-8 lg:pl-[256px]">
        <div className="flex flex-col items-center h-screen p-4 space-y-6">
          <h1 className="text-center text-2xl font-bold">¿Listo para una nueva aventura?</h1>
          {/* Saludo con el nombre del usuario */}
          {user && (
            <h2 className="text-center text-xl font-semibold mt-4">Hola, mucho gusto {user.name}!</h2>
          )}

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
        <UserProgress  />
        <MissionsCard />
      </div>
    </div>
  );
};

export default Aprender;
