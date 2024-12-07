import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: number;
  nombre: string;
  email: string;
  imagen_perfil: string;
  corazones: number;  // Añadir corazones
  puntos: number;     // Añadir puntos
  experiencia: number; // Añadir experiencia
};

type State = {
  token: string;
  isAuth: boolean;
  user: User | null;
};

type Actions = {
  setAuth: (token: string, user: User) => void;  // Cambié el nombre de la función a setAuth
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>((set) => ({
    token: "",
    isAuth: false,
    user: null,
    setAuth: (token: string, user: User) => set({ token, isAuth: true, user }),  // Actualiza ambos valores
    logout: () => set({ token: "", isAuth: false, user: null }),
  }),
  { 
    name: "auth",  // Guardamos el estado con el nombre 'auth' en el almacenamiento local
  })
);
