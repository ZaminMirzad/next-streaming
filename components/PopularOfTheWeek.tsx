"use client";

import { useZuStore } from "@/store/zuStore";
import { getGenreSpans } from "@/utils/utils";
import {  Divider } from "@mantine/core";
import {  IconStarFilled } from "@tabler/icons-react";
import { ArrowLeft, ArrowRight,  TvMinimal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function PopularOfTheWeek() {
  const { trendings } = useZuStore((state) => state);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);
  const navigate = useRouter(); // Hook for navigation

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection
    if (cardContainerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - cardContainerRef.current.offsetLeft);
      setScrollLeft(cardContainerRef.current.scrollLeft);
      cardContainerRef.current.style.cursor = "grabbing"; // Change cursor to grabbing
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setDragged(false);
    if (cardContainerRef.current) {
      cardContainerRef.current.style.cursor = ""; // Reset cursor
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection while dragging
    setIsDragging(false);
    if (cardContainerRef.current) {
      cardContainerRef.current.style.cursor = "grab"; // Reset cursor
    }
    // Reset dragged state on mouse up
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !cardContainerRef.current) return;

    e.preventDefault(); // Prevent text selection while dragging

    const x = e.pageX - cardContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the scroll speed
    cardContainerRef.current.scrollLeft = scrollLeft - walk;
    setDragged(true);
  };

  //   handle scrolling
  const handleScroll = (direction: "left" | "right") => {
    if (cardContainerRef.current) {
      const scrollAmount = 460; // Adjust the scroll amount here
      cardContainerRef.current.scrollBy({
        top: 0,
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (id: string) => {
    if (!dragged) {
      navigate.push(`/card/${id}`); // Navigate to the card detail page
    }
  };

  return (
    <div className="text-white my-20 px-10 flex flex-col gap-10 w-full overflow-hidden relative ">
      <h1 className="text-3xl">Popular of the week</h1>
      <div
        className="flex gap-5 items-center overflow-x-auto py-10 w-full px-10 scroll-hidden"
        ref={cardContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={(e) => handleMouseUp(e)}
        onMouseMove={handleMouseMove}
      >
        {trendings
          ?.sort((a, b) => b.popularity - a.popularity)
          .map(
            (
              { id, name, title, poster_path, genre_ids, media_type },
              index
            ) => (
              <Link
                href={`/movie/${id}`}
                key={id}
                className="min-w-[400px] rounded-xl  bg-black overflow-hidden hover:cursor-pointer hover:border border border-black p-2 transition duration-300 hover:border-main"
                onClick={() => handleCardClick(id)}
              >
                <div>
                  <div className="flex items-center gap-2 h-full w-full bg-black text-white">
                    {/* rank */}
                    <span className="text-4xl font-bold px-1">
                      #{index + 1}
                    </span>
                    <div className="flex items-start gap-1 w-full h-full">
                      {/* image */}
                      <div className="m-1 w-60 h-full rounded-xl overflow-hidden">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
                            "original" +
                            poster_path
                          }
                          className="object-cover h-full w-full"
                        />
                      </div>
                      {/* content */}
                      <div className="flex flex-col justify-between items-start  gap-2 w-full h-full p-2">
                        <span className="rounded-lg font-semibold text-sm px-1 uppercase border border-gray-500 text-gray-400">
                          pg-13
                        </span>
                        <h1 className="text-xl font-bold my-4 line-clamp-2">
                          {name || title}
                        </h1>
                        <div className=" line-clamp-1 flex items-center flex-nowrap text-nowrap gap-2 text-sm text-gray-500">
                          <TvMinimal size={16} />
                          {getGenreSpans(genre_ids!)
                            ?.slice(0, 2)
                            .map((genre) => {
                              return (
                                <span
                                  key={genre.id}
                                  className="text-white border border-main/70 bg-main/30 px-0.5 text-xs rounded"
                                >
                                  {genre.name}
                                </span>
                              );
                            })}
                        </div>
                        <div className="flex items-center gap-1 text-sm font-bold">
                          <IconStarFilled color="yellow" size={18} />
                          <span className="font-bold text-sm">4.3</span>
                          <Divider
                            orientation="vertical"
                            color="grey"
                            className="mx-2 h-4"
                          />
                          <span className="text-gray-400 uppercase">
                            {media_type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
      </div>
      {/* scroll buttons */}
      <div className="absolute bottom-0 right-0 z-10 flex items-center justify-between gap-2 w-fit px-4 text-white ">
        <button
          onClick={() => handleScroll("left")}
          className="bg-main/60 hover:bg-main rounded transition duration-300"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="bg-main/60 hover:bg-main rounded transition duration-300"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
