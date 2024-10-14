import { CarouselProps } from "@/components/CardsContainer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ListProps {
  id: string;
  name: string;
  title: string;
  media_type: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  overview: string;
}

interface NextStreamingState {
  user: boolean;
  providers: [] | null;
  trendings: ListProps[] | null;
  popular: ListProps[] | null;
  upcoming: ListProps[] | null;
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
      upcoming: null,
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

        // upcoming
        let upcomingRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
        );
        let upcomingData = await upcomingRes.json();

        // providers
        let providersRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/watch/providers/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
        );
        let providersData = await providersRes.json();
        set({
          providers: providersData.results
            .slice(0, 80)
            .filter((p: any) => p.display_priority < 20),
          trendings: trendingData.results?.slice(0, 80),
          popular: popularData.results,
          upcoming: upcomingData.results,
        });
      },
    }),

    {
      name: "next-stream-storage1", // name of the item in the storage (must be unique)
    }
  )
);
