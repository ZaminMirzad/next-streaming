"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Badge } from "@mantine/core";
import classes from "./carousel.module.css";
import { useZuStore } from "@/store/zuStore";

export default function CarouselComponent() {
  const autoplay = useRef(Autoplay({ delay: 3500 }));
  const { trendings } = useZuStore((state) => state);
  return (
    <Carousel
      height={750}
      className="absolute top-0 left-0 right-0"
      classNames={classes}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {trendings?.map(
        ({ id, backdrop_path, title, name, media_type, overview }) => {
          return (
            <Carousel.Slide key={id} className="relative">
              <img
                src={
                  process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
                  "original" +
                  backdrop_path
                }
                alt=""
                className=" w-full object-cover"
              />
              <div className="absolute w-full bottom-0 left-0 right-0  h-full text-white bg-opacity-50 bg-gradient-to-t from-black to-transparent px-10 pb-20 flex flex-col  justify-end">
                <div className=" max-w-3xl h-52 p-2 mb-20">
                  {media_type && (
                    <Badge color="red" className=" mb-2 uppercase">
                      {media_type}
                    </Badge>
                  )}
                  <h1 className="text-4xl pb-4">{title || name}</h1>
                  <p className=" text-gray-300">{overview}</p>
                </div>
              </div>
            </Carousel.Slide>
          );
        }
      )}
    </Carousel>
  );
}