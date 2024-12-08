interface BarraProgresoProps {
  porcentaje: number;  // El porcentaje de progreso, entre 0 y 100
  color?: string;  // Color opcional para la barra
}

const BarraProgreso = ({ porcentaje, color = 'from-blue-500 to-blue-700' }: BarraProgresoProps) => {
  const valorProgreso = Math.min(Math.max(porcentaje, 0), 100);

  return (
    <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`bg-gradient-to-r ${color} h-6 rounded-full transition-all duration-700 ease-in-out`}
        style={{ width: `${valorProgreso}%` }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-800">
        {`${valorProgreso}%`}
      </span>
    </div>
  );
};

export default BarraProgreso;

