import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  name: string;
  email: string;
  profile_image: string;
  hearts: number;
  points: number;
  experience: number;
  level: number;
  user_type: "admin" | "student";
}

type State = {
  token: string;
  isAuth: boolean;
  user: User | null;
};

type Actions = {
  setAuth: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      isAuth: false,
      user: null,
      setAuth: (token: string, user: User) =>
        set({ token, isAuth: true, user }),
      logout: () => set({ token: "", isAuth: false, user: null }),
    }),
    {
      name: "auth", // Persistencia en localStorage
    }
  )
);
