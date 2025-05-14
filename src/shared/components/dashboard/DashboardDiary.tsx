// src/dashboard/Dashboard.tsx
import {DiaryStatsChart} from "../Graph/Diary/DiaryStatsChart"


export const DashboardDiary = () => {
  return (
    <div className=" bg-gray-50 ">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Gráfico de estadísticas generales */}
          <DiaryStatsChart/>
     </div>
    </div>
  );
};
