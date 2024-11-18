/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import CardsContainer from "@/components/CardsContainer";
import ImageWithLoader from "@/components/ImageWithLoader";
import { CastProps, GenreProps, ListProps, useZuStore } from "@/store/zuStore";
import { Badge, Button } from "@mantine/core";
import {
  BookmarkPlus,
  Clock,
  Download,
  Network,
  Play,
  ThumbsUp,
} from "lucide-react";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { movie, getMovie } = useZuStore((state) => state);
  const paramid = params.id;

  useEffect(() => {
    getMovie(paramid);
  }, [paramid, getMovie]);

  // retrun casts with image only
  const filteredCasts = movie?.credits?.cast?.filter((cast: CastProps) => {
    return cast?.profile_path !== null;
  });

  // return similar results with backdrop_path only
  const filteredSimilar = movie?.similar?.results?.filter(
    (similar: ListProps) => {
      return similar?.backdrop_path !== null && similar?.poster_path !== null;
    }
  );

  return (
    <div className="w-screen h-screen   bg-black -mt-16 overflow-x-hidden relative overflow-y-auto">
      <div className=" h-full w-full  bg-gradient-to-t from-black to-transparent   max-h-[700px] ">
        <div className="p-4  w-full  h-full flex items-end justify-start absolute top-0 left-0 right-0 bottom-0 z-0 ">
          <ImageWithLoader
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}original${movie?.backdrop_path}`}
            alt={movie?.title! || movie?.name!}
            height={700}
          />
        </div>
        <div className="   text-white px-20 py-10 absolute  w-full h-full  flex flex-col gap-4  justify-end items-start bg-gradient-to-t from-black to-transparent max-h-[700px]">
          {movie?.media_type && (
            <Badge
              size="xl"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              {movie?.media_type}
            </Badge>
          )}
          <h1 className="text-4xl">{movie?.title || movie?.name} </h1>
          {/* runtime, year and genres */}
          <div className="flex items-center gap-2 text-white/50">
            <p className="text-sm text-white/50 line-clamp-1 flex items-center gap-1">
              <Clock className="" size={16} />
              {Math.floor(movie?.runtime! / 60)}h{movie?.runtime! % 60}m
            </p>{" "}
            &#183;
            <p className="text-sm text-white/50  line-clamp-1 flex items-center gap-1">
              {movie?.release_date?.slice(0, 4) ||
                movie?.first_air_date?.slice(0, 4)}
            </p>
            <p className="text-sm text-white/50 line-clamp-1 flex items-center gap-1">
              {movie?.genres?.map((genre: GenreProps) => {
                return (
                  <span key={genre.id} className="text-x rounded-sm">
                    &#183; {genre.name}
                  </span>
                );
              })}
            </p>
          </div>
          <div className="flex items-center justify-between  gap-4 w-full ">
            <div className="flex items-center gap-4 ">
              <Button variant="" color="red" size="md" radius="md">
                <Play size={18} className="mx-2" /> Play Now
              </Button>
              <Button variant="light" size="sm" color="teal" radius="md">
                <BookmarkPlus size={18} className="mx-2" /> Add WatchList
              </Button>
            </div>
            <div className="flex items-center  gap-4  p-3 ">
              <Button variant="light" size="sm" color="white" radius="md">
                <Download size={18} className="mx-2" /> Download
              </Button>
              <Button variant="light" size="sm" color="white" radius="md">
                <Network size={18} className="mx-2" /> Share
              </Button>
              <Button variant="" size="sm" color="red" radius="md">
                <ThumbsUp size={18} className="mx-2" /> Like
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className=" px-20   text-white py-4 w-full">
        <h1 className="text-xl font-semibold mb-2">Story line</h1>
        <p className=" max-w-3xl">{movie?.overview}</p>

        {/* casts */}

        <div className=" w-full my-6 flex flex-col z-10">
          <h1 className="text-xl font-semibold mt-6 w-full mb-4">Top Casts</h1>
          <div className="flex items-center gap-2 w-full overflow-x-hidden py-4">
            {filteredCasts?.slice(0, 10).map((cast: CastProps) => (
              <div key={cast.id} className="flex items-center min-w-40  gap-1">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}w185${cast.profile_path}`}
                  alt={cast.name}
                  className="rounded-full w-12 h-12 object-cover object-center overflow-hidden"
                />

                <div className="">
                  <p className="text-xs text-center">{cast.name}</p>
                  <p className="text-xs text-center text-gray-400">
                    {cast.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* similar to */}
      <CardsContainer
        containerTitle="Recommended For You"
        containerList={filteredSimilar?.length ? filteredSimilar : null}
      />

      {/* End Content */}
    </div>
  );
}
