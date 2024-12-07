import axios from 'axios';

interface UserLogin {
  nombre: string;  // Cambiado de 'username' a 'nombre'
  contraseña: string;  // Cambiado de 'password' a 'contraseña'
}

const axiosAuth = axios.create({
  baseURL: 'http://127.0.0.1:8000/',  // Cambia la URL según tu backend
});

export const loginPost = async (userData: UserLogin) => {
  console.log('Enviando datos:', userData);  // Verifica qué datos estás enviando
  const response = await axiosAuth.post('login/', {
    nombre: userData.nombre,  // Cambié 'username' a 'nombre'
    contraseña: userData.contraseña,  // Cambié 'password' a 'contraseña'
  });
  return response.data;
};
