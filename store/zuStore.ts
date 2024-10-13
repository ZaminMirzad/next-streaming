import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NextStreamingState {
  user: boolean;
  providers: [any] | null;
  trendings: [any] | null;
  popular: [any] | null;
  updateUser: () => void;
  execute: () => void;
}

export const useZuStore = create<NextStreamingState>()(
  persist(
    (set, get) => ({
      user: false,
      providers: null,
      trendings: null,
      popular: null,
      updateUser: () => set({ user: !get().user }),
      execute: async () => {
        // trendings
        let trendingRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
        );
        let trendingData = await trendingRes.json();

        // popular
        let popularRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
        );
        let popularData = await popularRes.json();

        // providers
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/watch/providers/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
        );
        let data = await res.json();
        set({
          providers: data.results
            .slice(0, 80)
            .filter((p: any) => p.display_priority < 20),
          trendings: trendingData.results?.slice(0, 80),
          popular: popularData.results,
        });
      },
    }),

    {
      name: "next-stream-storage1", // name of the item in the storage (must be unique)
    }
  )
);
