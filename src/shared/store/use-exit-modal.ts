import { create } from "zustand";

type ExitModalState = {
  isOpen: boolean;
  origin?: string; // Cambia null por undefined
  open: (origin?: string) => void; // Origin es opcional
  close: () => void;
  reset: () => void;
};

export const useExitModal = create<ExitModalState>((set) => ({
  isOpen: false,
  origin: undefined,
  open: (origin) => set({ isOpen: true, origin }),
  close: () => set({ isOpen: false }),
  reset: () => set({ isOpen: false, origin: undefined }),
}));
