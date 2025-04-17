import { useState, useEffect } from 'react';
import { UserProgress } from '../../shared/components/UserProgress'; // Componente de progreso del usuario
import {MissionsCard} from '../../shared/components/MissionsCard'; // Importar el nuevo componente de misiones
import { obtenerTodosusuarios } from "../../services/usuario.service"; // Función para obtener los usuarios

// Definir la interfaz para el usuario
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  fecha_creacion: string;
  imagen_perfil: string;
  corazones: number;
  puntos: number;
  experiencia: number;
}

export const Rankings = () => {
  // Estado para almacenar los usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // Llamada a la API para obtener los usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await obtenerTodosusuarios();

        // Ordenar los usuarios por experiencia de mayor a menor
        const usuariosOrdenados = data.sort((a: Usuario, b: Usuario) => b.experiencia - a.experiencia);

        setUsuarios(usuariosOrdenados); // Almacenar los usuarios ordenados en el estado
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  // Función para determinar el color según el puesto
  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"; // Dorado con gradiente
      case 1:
        return "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"; // Plateado con gradiente
      case 2:
        return "bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"; // Bronce con gradiente
      default:
        return "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"; // Color por defecto con gradiente
    }
  };
  return (
    <div className="flex min-h-screen">
      {/* Contenido principal (en el centro) */}
      <div className="block lg:hidden">
        <UserProgress />
      </div>

      <div className="flex-1 p-8 lg:pl-[256px]">
        {/* Icono de la tienda */}
        <div className="text-center">
          <img 
            src="/leaderboard.svg" 
            alt="Icono Tienda" 
            className="mx-auto w-32 h-32 mb-4" // Tamaño del icono (ajústalo a tu gusto)
          />
          <h1 className="text-2xl font-semibold mb-6">Ranking de campeones</h1>
        </div>

        {/* Mostrar los usuarios */}
        {usuarios.map((usuario, index) => (
          <div 
            key={usuario.id} 
            className={`p-6 rounded-lg shadow-md mb-8 flex items-center justify-between ${getMedalColor(index)}`}
          >
            <div className="flex items-center space-x-4">
              {/* Mostrar el puesto */}
              <span className="text-lg font-semibold">{index + 1}</span>
              {/* Mostrar el nombre del usuario */}
              <span className="text-lg font-semibold">{usuario.nombre}</span>
              <div className="text-center">
                {/* Mostrar la imagen de perfil */}
                <img
                  src="/images/iconomorado.jpg"
                  alt="Icono Tienda" 
                  className="w-12 h-12 rounded-full border-2 border-gray-300" 
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Mostrar la experiencia acumulada */}
              <span className="text-sm text-black">{usuario.experiencia} XP</span>
            </div>
          </div>
        ))}
      </div>

      {/* Barra de progreso (a la derecha) */}
      <div className="hidden lg:block w-[250px] bg-white p-4">
        <UserProgress />
        <MissionsCard />
      </div>
    </div>
  );
};
