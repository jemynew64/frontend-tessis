import { useAuthStore } from '../store/auth';  // Asegúrate de importar el store correctamente
import { Bolt, Heart } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';  // Añadido useState para manejar el estado local

export const UserProgress = () => {

  const user = useAuthStore((state) => state.user);  // Obtén el usuario desde zustand
  const [corazones, setCorazones] = useState<number | null>(null);  // Para manejar el corazón localmente
  const [puntos, setPuntos] = useState<number | null>(null);  // Para manejar los puntos localmente
  const [experiencia, setExperiencia] = useState<number | null>(null);  // Para manejar la experiencia localmente
  const BaseURl=import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      if (user?.id) {
        try {
          // Realiza el GET con el ID del usuario
          const response = await axios.get(`${BaseURl}api/usuario/${user.id}/datos/`);
          // Desestructura los datos obtenidos de la respuesta
          const { corazones, puntos, experiencia } = response.data;
          
          // Asigna los valores a los estados locales
          setCorazones(corazones);
          setPuntos(puntos);
          setExperiencia(experiencia);
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      }
    };

    obtenerDatosUsuario();
  }, [user?.id]);  // Solo se ejecuta cuando el ID del usuario cambie

  return (
    <div className="bg-white p-2 rounded-lg shadow-md fixed top-0 left-0 right-0 w-full lg:static lg:w-auto lg:p-4 lg:rounded-lg lg:shadow-md z-50 flex justify-center lg:flex-col items-center lg:items-start">
      <div className="flex items-center space-x-2 mx-4">
        <span className="text-gray-600 flex items-center">
          <Bolt className="h-5 w-5 text-yellow-500 mr-1" />
          Puntos:
        </span>
        <span className="text-lg font-bold text-blue-600">{puntos !== null ? puntos : 'Cargando...'}</span>
      </div>

      <div className="flex items-center space-x-2 mx-4">
        <span className="text-gray-600 flex items-center">
          <Heart className="h-5 w-5 text-red-500 mr-1" />
          Vidas:
        </span>
        <span className="text-lg font-bold text-red-600">{corazones !== null ? `${corazones}/5` : 'Cargando...'}</span>
      </div>

      {/* Muestra los datos de experiencia solo si existen */}
      {experiencia !== null && (
        <div className="flex items-center space-x-2 mx-4">
          <span className="text-gray-600 flex items-center">
          <img src="/points.svg" alt="Points icon" className="h-6 w-6 text-yellow-500" /> {/* Usando el SVG del public */}
          Experiencia:
          </span>
          <span className="text-lg font-bold text-blue-600">{experiencia}</span>
        </div>
      )}
    </div>
  );
};
