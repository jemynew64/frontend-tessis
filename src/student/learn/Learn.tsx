import { CardLink } from "./CardLink";
import { useAuthStore } from '../../shared/store/auth';
import { useQuery } from "@tanstack/react-query";
import { useUserQueryOptions } from "./UserQueryOption";

export const Learn = () => {
  const { data } = useQuery(useUserQueryOptions());
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex-1 p-8 lg:pl-[256px]">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-6">
        <h1 className="text-center text-2xl font-bold">¿Listo para una nueva aventura?</h1>
        {user && (
          <h2 className="text-center text-xl font-semibold">
            Hola, mucho gusto {user.name}!
          </h2>
        )}
        <div className="flex flex-col lg:flex-row gap-4 w-full justify-center mt-4">
          {data?.map((mundo) => (
            <CardLink
              key={mundo.id}
              to={`/listartodo/${mundo.id}`}
              imgSrc={mundo.image_src}
              title={`Mundo de ${mundo.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
