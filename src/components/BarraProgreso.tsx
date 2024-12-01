interface BarraProgresoProps {
  porcentaje: number;  // El porcentaje de progreso, entre 0 y 100
  color?: string;  // Color opcional para la barra
}

const BarraProgreso = ({ porcentaje, color = 'bg-blue-500' }: BarraProgresoProps) => {
  // Asegurarse de que el porcentaje esté entre 0 y 100
  const valorProgreso = Math.min(Math.max(porcentaje, 0), 100);

  return (
    <div className="w-full h-6 bg-gray-200 rounded-full">
      <div
        className={`${color} h-6 rounded-full`}
        style={{ width: `${valorProgreso}%` }}
      />
    </div>
  );
};

export default BarraProgreso;
