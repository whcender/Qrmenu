import { create } from "zustand";

interface GenerationState {
    theme: boolean;
    setTheme: (theme: boolean) => void;

}

export const useGenerationStore = create<GenerationState>()((set) => ({
    theme: true,
    setTheme: (theme) => set({ theme }),
}));