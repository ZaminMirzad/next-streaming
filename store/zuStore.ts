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
  vote_average: number;
  genre_ids: number[];
  runtime: number;
  popularity: number;
  genres: { id: number; name: string }[];
  credits: { cast: any[]; crew: any[] };
  similar: { results: ListProps[] | null };
}

export interface ProvidersProps {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface CastProps{
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface GenreProps{
  id: number;
  name: string;
}

interface NextStreamingState {
  user: boolean;
  providers: ProvidersProps[] | null;
  trendings: ListProps[] | null;
  popular: ListProps[] | null;
  upcoming: ListProps[] | null;
  updateUser: () => void;
  execute: () => void;
  movie: ListProps | null;
  getMovie: (id: string) => void;
}

export const useZuStore = create<NextStreamingState>()(
  persist(
    (set, get) => ({
      user: false,
      providers: null,
      trendings: null,
      popular: null,
      upcoming: null,
      movie: null,
      updateUser: () => set({ user: !get().user }),

      // get a movie by id
      getMovie: async (id: string) => {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=credits,reviews,similar`
        )
          .then((res) => res.json())
          .then((data) => set({ movie: data }));
      },
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
