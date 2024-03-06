import { create } from "zustand";

interface GenerationState {
    value: boolean;
    setValue: (value: boolean) => void;
}

export const useLanStore = create<GenerationState>()((set) => ({
    value: true,
    setValue: (value) => set({ value }),
}));