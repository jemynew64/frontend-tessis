import {CardLink} from "./CardLink"
import { useAuthStore } from '../../shared/store/auth';  // Importar el hook para obtener el estado del usuario
import { UserProgress } from '../../shared/components/UserProgress'; 
import {MissionsCard} from '../../shared/components/MissionsCard';
import { useQuery } from "@tanstack/react-query";
import { useUserQueryOptions} from "./UserQueryOption"

export const Learn = () => {
  const { data } = useQuery(useUserQueryOptions());
  console.log(data)
  const user = useAuthStore((state) => state.user);  // Obtener el usuario desde el estado global
  return (
    <div className="flex min-h-screen">
      {/* Mostrar barra de progreso en la parte superior solo en pantallas pequeñas */}
      <div className="block lg:hidden">
        <UserProgress  />
      </div>
      {/* Contenido principal */}
      <div className="flex-1 p-8 ">
        <div className="flex flex-col items-center h-screen p-4 space-y-6">
          <h1 className="text-center text-2xl font-bold">¿Listo para una nueva aventura?</h1>
          {/* Saludo con el nombre del usuario */}
          {user && (
            <h2 className="text-center text-xl font-semibold mt-4">Hola, mucho gusto {user.name}!</h2>
          )}

          <div className="flex flex-col lg:flex-row gap-4 mt-4 w-full justify-center">
            {data?.map((mundo) => (
              <CardLink
                key={mundo.id}
                to={`/listartodo/${mundo.id}`}
                imgSrc={`/images/${mundo.image_src}`}
                title={`Mundo de ${mundo.title}`}
              />
            ))}
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

{/* <div className="flex flex-col lg:flex-row gap-4 mt-4 w-full justify-center">
<CardLink
  to="/listartodo"
  imgSrc="/images/iconosuma.png"
  title="Mundo de los Números"
/>
<CardLink
  to="/listartodo"
  imgSrc="/images/iconolibro.png"
  title="Mundo de las Palabras"
/>
</div> */}