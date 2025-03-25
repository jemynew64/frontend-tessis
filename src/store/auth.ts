import { create } from "zustand";
import { persist } from "zustand/middleware";
import {User} from "../interfaces/index"

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
