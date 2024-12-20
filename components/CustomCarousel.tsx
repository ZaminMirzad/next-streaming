/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import { ListProps } from "@/store/zuStore";
import {  getGenreSpans } from "@/utils/utils";
import { Button } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";
import moment from "moment";

import { useEffect, useRef, useState } from "react";

interface CustomCarouselProps {
  slides: ListProps[] | null;
}

const ITEM_WIDTH = 150;
const ITEM_HEIGHT = 220;
const PADDING_X = 10;

export default function CustomCarousel({ slides }: CustomCarouselProps) {
  const [currentIn, setCurrentIn] = useState(0);

  useEffect(() => {
    doSelect(currentIn);
  });

  // Instance variable to save current selected photo
  const selectedIndex = useRef(-1);

  // Reference to gallery container
  const el = useRef<HTMLDivElement>(null);

  // Apply select effect on item
  const doSelect = (targetIndex: number) => {
    setCurrentIn(targetIndex);
    const children = el.current!.children;

    if (selectedIndex.current !== -1) {
      const currentEl = children[selectedIndex.current] as HTMLDivElement;
      currentEl.style.transform = "scale(1)";
      currentEl.style.zIndex = "0";
    }

    const targetEl = children[targetIndex] as HTMLDivElement;
    if (!targetEl) return;
    targetEl.style.transform = "scale(1.55)";
    targetEl.style.zIndex = "999";
    selectedIndex.current = targetIndex;

    // Update container position
    const theWidth = ITEM_WIDTH + PADDING_X;
    el.current!.style.transform = `translateX(calc(50% - ${
      theWidth * targetIndex + theWidth * 0.5
    }px))`;
  };

  // Render the items
  const renderedList = slides?.map((it, index) => (
    <div
      className="absolute  transition-all duration-700 top-20 ease-out origin-center rounded-lg bg-no-repeat bg-cover bg-center my- cursor-pointer"
      key={index}
      onClick={() => doSelect(index)}
      style={{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,

        left: (ITEM_WIDTH + PADDING_X) * index,
        backgroundImage: `url(${
          process.env.NEXT_PUBLIC_IMAGE_BASE_URL + "w300" + it.poster_path
        })`,
      }}
    />
  ));

  return (
    <div
      className="relative w-full h-full mb-10 overflow-hidden object-contain max-h-[80%] transition-all duration-700"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}original${slides?.[currentIn].backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-gradient-to-tr from-black to-transparent z-50">
        <div className="flex  justify-between items-center gap-6 h-full p-10">
          <div className="flex flex-col gap-6 max-w-xl text-white transition-all duration-700">
            <h1 className="text-white text-3xl font-bold mb-10">
              Featured ON NEXT STREAMING
            </h1>

            <div className="">
              <h1 className="text-white/80 text-3xl font-bold">
                {slides?.[currentIn].title || slides?.[currentIn].name}
              </h1>
              <p className="flex items-center text-sm gap-2">
                <span className="flex items-center text-sm gap-1">
                  <span className="text-white/50">
                    <IconStarFilled color="yellow" size={18} />
                  </span>
                  {slides?.[currentIn].vote_average?.toPrecision(2)}
                </span>
                <span className="text-white/50">Released: </span>
                {moment(slides?.[currentIn].release_date).format("YYYY") ||
                  moment(slides?.[currentIn].first_air_date).format("YYYY")}

                <span className="flex items-center text-sm gap-2">
                  <span className="text-white/50">Genre: </span>
                  {getGenreSpans(slides?.[currentIn].genre_ids!)?.map(
                    (genre) => {
                      return (
                        <span
                          key={genre.id}
                          className="text-white border border-main/50 bg-main/30 px-1 text-xs rounded-sm"
                        >
                          {genre.name}
                        </span>
                      );
                    }
                  )}
                </span>
              </p>
              <p className="mt-4 text-white/70 h-40 line-clamp-6">
                {slides?.[currentIn].overview}
              </p>
            </div>
            <div className="flex gap-3">
              <Button color="primary" variant="flat">
                Watch Now
              </Button>
              <Button
                component="a"
                href={`/movie/${slides?.[currentIn].id}`}
                color="primary"
                variant="flat"
                className="ml-2"
              >
                More Info
              </Button>
            </div>
          </div>
          <div className=" h-96 w-full  flex-1 flex items-center overflow-hidden relative">
            <div
              className="relative transition-all duration-700 w-screen h-full my-0 flex items-center "
              ref={el}
            >
              {renderedList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
