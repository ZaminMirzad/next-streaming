import { create } from "zustand";

interface NextStreamingState {
  bears: number;
  increasePopulation: (by: number) => void;
  updateBears: (by: number) => void;
}

const useStore = create<NextStreamingState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
