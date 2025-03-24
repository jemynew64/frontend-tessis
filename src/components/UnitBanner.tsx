
interface BannerUnidadProps {
  titulo: string;
  descripcion: string;
}

const UnitBanner = ({ titulo, descripcion }: BannerUnidadProps) => {
  return (
    <div className="w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{titulo}</h3>
        <p className="text-lg">{descripcion}</p>
      </div>
    </div>
  );
};

export default UnitBanner;
