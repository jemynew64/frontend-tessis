import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { obtenerStatsDiarios } from "./DiaryStats.service";
// voy a chapar de params a mi causa 
import { useParams } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const DiaryStatsChart = () => {
  //este paramas lo llamo de mi url xd 
  const { idusuario } = useParams();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dailyUserStats", idusuario],
    queryFn: () => obtenerStatsDiarios(idusuario),
  });

  if (isLoading || !stats) return <p>Cargando datos diarios...</p>;

  const labels = stats.map((s) =>
    new Date(s.date).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short"
    })
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "EXP Ganada",
        data: stats.map((s) => s.experience_gained),
        fill: true,
        borderColor: "#4dc9f6",
        backgroundColor: "rgba(77, 201, 246, 0.2)",
        tension: 0.4
      },
      {
        label: "Puntos Ganados",
        data: stats.map((s) => s.points_gained),
        fill: true,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4
      },
      {
        label: "Minutos Dedicados",
        data: stats.map((s) => s.time_spent_minutes),
        fill: true,
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        tension: 0.4
      },
      {
        label: "Quizz echos",
        data: stats.map((s) => s.quizzes_completed),
        fill: true,
        borderColor: "#33ff68",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        tension: 0.4
      },
      {
        label: "Lecciones completadas",
        data: stats.map((s) => s.lessons_completed),
        fill: true,
        borderColor: "#fff633",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        tension: 0.4
      }
    ]
  };

const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Progreso Diario del Usuario"
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

return (
<div className="p-4 sm:p-6 bg-white rounded-xl shadow-xl w-full overflow-x-auto">
    <h2 className="text-lg font-semibold mb-4">Progreso Diario</h2>

    {/* Contenedor que crece en pantallas pequeñas */}
    <div className="w-full min-w-[400px] sm:min-w-full">
      <Line data={chartData} options={options} />
    </div>

    <div className="mt-4 text-center">
      <p className="text-md font-medium text-gray-700">
        Tiempo total dedicado:{" "}
        <span className="font-bold text-blue-600">
          {stats.reduce((acc, s) => acc + s.time_spent_minutes, 0)} minutos
        </span>
      </p>
    </div>
  </div>
);


};
