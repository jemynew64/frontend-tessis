import axios from 'axios';
const BaseURl=import.meta.env.VITE_BASE_URL

interface UserLogin {
  nombre: string;  // Cambiado de 'username' a 'nombre'
  contraseña: string;  // Cambiado de 'password' a 'contraseña'
}

const axiosAuth = axios.create({
  baseURL: BaseURl,  // Cambia la URL según tu backend
});

export const loginPost = async (userData: UserLogin) => {
  console.log('Enviando datos:', userData);  // Verifica qué datos estás enviando
  const response = await axiosAuth.post('login/', {
    nombre: userData.nombre,  // Cambié 'username' a 'nombre'
    contraseña: userData.contraseña,  // Cambié 'password' a 'contraseña'
  });
  return response.data;
};
