import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { obtenerStatsDiarios } from "./DiaryStats.service";
import { useParams } from "react-router-dom";
import {
  startOfWeek,
  endOfWeek,
  format,
  isSameDay,
  isWithinInterval,
  addDays,
  parseISO,
  subWeeks,
} from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const DiaryWeekChart = () => {
  const { idusuario } = useParams();
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dailyUserStats", idusuario],
    queryFn: () => obtenerStatsDiarios(idusuario),
  });

  if (isLoading || !stats) return <p>Cargando gráfico semanal...</p>;

  // Calcular base de semana según opción
  const baseDate = isCurrentWeek ? new Date() : subWeeks(new Date(), 1);
  const weekStart = startOfWeek(baseDate, { weekStartsOn: 1 }); // lunes
  const weekEnd = endOfWeek(baseDate, { weekStartsOn: 1 }); // domingo

  // Generar array con los 7 días
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    return {
      label: format(date, "EEE", { locale: es }), // ej. "lun"
      date,
    };
  });

  // Filtrar solo datos de esa semana
  const filteredStats = stats.filter((s) =>
    isWithinInterval(parseISO(s.date), { start: weekStart, end: weekEnd })
  );

  const correctData: number[] = [];
  const wrongData: number[] = [];

  daysOfWeek.forEach(({ date }) => {
    const entry = filteredStats.find((s) =>
      isSameDay(parseISO(s.date), date)
    );
    correctData.push(entry?.correct_answers ?? 0);
    wrongData.push(entry?.wrong_answers ?? 0);
  });

  const chartData = {
    labels: daysOfWeek.map((d) => d.label),
    datasets: [
      {
        label: "Correctas",
        data: correctData,
        backgroundColor: "rgba(76, 175, 80, 0.6)", // verde
      },
      {
        label: "Incorrectas",
        data: wrongData,
        backgroundColor: "rgba(244, 67, 54, 0.6)", // rojo
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: isCurrentWeek
          ? "Proceso Semanal (Semana Actual)"
          : "Proceso Semanal (Semana Pasada)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
  <div className="p-4 sm:p-6 bg-white rounded-xl shadow-xl w-full">
    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 mb-4">
      <h2 className="text-lg font-semibold">Progreso semanal</h2>
      <button
        onClick={() => setIsCurrentWeek(!isCurrentWeek)}
        className="text-sm px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition"
      >
        {isCurrentWeek ? "Ver semana pasada" : "Ver semana actual"}
      </button>
    </div>

    {/* Este contenedor evita que se corte el gráfico en pantallas pequeñas */}
    <div className="relative w-full h-[300px] sm:h-[400px]">
      <Bar data={chartData} options={options} />
    </div>
  </div>
  );
};
