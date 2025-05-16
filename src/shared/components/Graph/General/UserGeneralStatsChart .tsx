import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useUserGeneralStats } from "./QueryStats";
import { Bolt } from "lucide-react";

// voy a chapar de params a mi causa 
import { useParams } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const UserGeneralStatsChart = () => {
  //este paramas lo llamo de mi url xd 
  const { idusuario } = useParams();

  const { data: stats, isLoading } = useUserGeneralStats(idusuario);

  if (isLoading || !stats) return <p>Cargando estadísticas...</p>;


const actividadData = {
  labels: ["Actividades"], // Una sola etiqueta que agrupa todos
  datasets: [
    {
      label: "Lecciones",
      data: [stats.total_lessons],
      backgroundColor: "#4dc9f6"
    },
    {
      label: "Retos",
      data: [stats.total_challenges],
      backgroundColor: "#f67019"
    },
    {
      label: "Misiones",
      data: [stats.total_missions],
      backgroundColor: "#f53794"
    },
    {
      label: "Unidades",
      data: [stats.total_units_completed],
      backgroundColor: "#537bc4"
    },
    {
      label: "Quizzes",
      data: [stats.quizzes_completed],
      backgroundColor: "#acc236"
    }
  ]
};


  const respuestasData = {
    labels: ["Correctas", "Incorrectas"],
    datasets: [
      {
        data: [stats.total_correct_answers, stats.total_wrong_answers],
        backgroundColor: ["#4caf50", "#f44336"]
      }
    ]
  };

  const perfeccion = stats.total_lessons > 0
    ? Math.round((stats.total_lessons_perfect / stats.total_lessons) * 100)
    : 0;

 return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Experiencia */}
      <div className="p-4 shadow-xl rounded-xl bg-white flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">Total de EXP ganada</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.total_experience}</p>
        </div>
            <img src="/points.svg" alt="Points icon" className="h-8 w-8" />
      </div>

      {/* Puntos */}
      <div className="p-4 shadow-xl rounded-xl bg-white flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">Total de puntos ganados</h2>
          <p className="text-2xl font-bold text-green-600">{stats.total_points}</p>
        </div>
                <Bolt className="h-8 w-8 text-yellow-500" />
      </div>

      {/* Actividades */}
      <div className="p-4 shadow-xl rounded-xl md:col-span-2 bg-white content-center">
        <h2 className="text-lg font-semibold mb-2">Actividades Completadas</h2>
        <Bar data={actividadData}  />
      </div>

      {/* Respuestas */}
<div className="p-4 shadow-xl rounded-xl bg-white md:col-span-2 flex flex-col items-center">
  <h2 className="text-lg font-semibold mb-2">Respuestas</h2>
  <div className="w-64 h-64">
    <Doughnut data={respuestasData} />
  </div>
</div>

      {/* Porcentaje de perfección */}
<div className="p-4 shadow-xl rounded-xl bg-white md:col-span-2 min-w-0">
  <h2 className="text-lg font-semibold mb-2">Porcentaje de Lecciones Perfectas</h2>
  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-green-500 transition-all duration-500"
      style={{ width: `${perfeccion}%` }}
    />
  </div>
  <p className="mt-2 text-center text-xl font-bold text-green-700">{perfeccion}%</p>
</div>

    </div>
  );
};