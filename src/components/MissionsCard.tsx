const MissionsCard = () => {
  // Ejemplo de misiones
  const missions = [
    { description: 'Obtener 50 XP', progress: 0.8 },  // Progreso ficticio (30%)
    { description: 'Obtener 150 XP', progress: 0.3 }, // Progreso ficticio (60%)
    { description: 'Obtener 350 XP', progress: 0.1 }, // Progreso ficticio (10%)
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full mt-4"> {/* Ancho completo y margen superior */}
      <h2 className="text-lg font-semibold mb-4">Misiones</h2>
      <div className="space-y-4">
        {missions.map((mission, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img src="/points.svg" alt="Points icon" className="h-6 w-6 text-yellow-500" /> {/* Usando el SVG del public */}
            
            <div className="flex-1">
              <span className="text-gray-700">{mission.description}</span>
              <div className="w-full bg-gray-200 h-2 mt-2 rounded">
                <div
                  className="bg-blue-500 h-full rounded"
                  style={{ width: `${mission.progress * 100}%` }} 
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionsCard;
