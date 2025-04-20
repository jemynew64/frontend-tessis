// src/student/quizz/quizz.store/safeRedirect.store.ts
import { create } from "zustand";

type SafeRedirectState = {
  shouldRedirect: boolean;
  markForRedirect: () => void;
  reset: () => void;
};

export const useSafeRedirect = create<SafeRedirectState>((set) => ({
  shouldRedirect: localStorage.getItem("quizz_finalizado") === "true",
  markForRedirect: () => {
    localStorage.setItem("quizz_finalizado", "true");
    set({ shouldRedirect: true });
  },
  reset: () => {
    localStorage.removeItem("quizz_finalizado");
    set({ shouldRedirect: false });
  },
}));
