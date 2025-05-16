import { useParams } from 'react-router-dom';
import { Dashboard } from '../../shared/components/dashboard/Dashboard';
import { DashboardDiary } from '../../shared/components/dashboard/DashboardDiary';
import { Achievements } from '../../student/achievements/Achievements';

export const Statsgeneral = () => {
  const { name } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 pt-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Estadísticas Generales de {name}
        </h1>
        <p className="text-gray-500">
          Visualiza el progreso, desempeño diario y logros acumulados.
        </p>
      </div>

      <div className="space-y-10 px-6 pb-12">
        <Dashboard />
        <DashboardDiary />
        <Achievements />
      </div>
    </div>
  );
};
