import axios from 'axios';
// const BaseURl=import.meta.env.VITE_BASE_URL
// const BaseURl="http://localhost:3000/api/"
const BaseURL = import.meta.env.VITE_BASE_URL;

console.log("URL del backend:", BaseURL); // debería mostrar http://localhost:3000/api/
interface UserLogin {
  email: string;  
  password: string;  
}

const axiosAuth = axios.create({
  baseURL: BaseURL,  // Cambia la URL según tu backend
});

export const loginPost = async (userData: UserLogin) => {
  console.log('Enviando datos:', userData);  // Verifica qué datos estás enviando
  const response = await axiosAuth.post('auth/login/', {
    email: userData.email,  
    password: userData.password, 
  });
  return response.data;
};
