// src/dashboard/Dashboard.tsx
import {UserGeneralStatsChart} from "../Graph/General/UserGeneralStatsChart "


export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Gráfico de estadísticas generales */}
          <UserGeneralStatsChart/>
     </div>
    </div>
  );
};
