"use client";

import { Carousel } from "@mantine/carousel";
import { Card, Flex, Image } from "@mantine/core";
// import Autoplay from "embla-carousel-autoplay";
import classes from "./carousel.module.css";
import { ListProps } from "@/store/zuStore";
// import { useRef } from "react";

export interface CarouselProps {
  containerTitle: string;
  containerList: ListProps[] | null;
}

export default function CardsContainer({
  containerTitle,
  containerList,
}: CarouselProps) {
  //   const autoplay = useRef(Autoplay({ delay: 3500 }));
  //   const { trendings } = useZuStore((state) => state);

  return (
    containerList && (
      <Flex className="flex flex-col gap-4 w-full  py-10 pl-10 bg-black relative">
        <h1 className="text-2xl font-bold text-main capitalize">
          {containerTitle}
        </h1>
        <Carousel
          className="   pt-2 min-h-96"
          classNames={classes}
          slideSize="33.333333%"
          align="start"
        >
          {containerList?.map(
            ({
              id,
              title,
              name,
              poster_path,
              release_date,
              first_air_date,
            }) => (
              <Carousel.Slide
                key={id}
                className=" max-w-56 group hover:-translate-y-2 hover:translate-x-2 hover:cursor-pointer transition duration-300 border rounded-lg border-main bg-main/50 mx-4 mt-4 w-full group hover:scale-105"
              >
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  className="relative h-[310px] w-full"
                >
                  <Card.Section className="absolute top-0 left-0 bottom-0 right-0 z-10 ">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
                        "w342" +
                        poster_path
                      }
                      height={60}
                      alt={title || name}
                      loading="lazy"
                      className=" object-cover object-top max-h-full h-full w-full"
                    />
                  </Card.Section>

                  <div className="absolute bottom-0 left-0 right-0  h-full z-20 bg-black/50 text-white p-1 w-full opacity-0 group-hover:opacity-100 flex transition-opacity duration-500 items-center justify-center  ">
                    <div className=" text-center relative h-full w-full flex items-center justify-center flex-col">
                      <h1 className=" line-clamp-1 text-lg ">
                        {title || name}
                      </h1>
                      <span className="absolute top-0 right-0 rounded p-1 bg-main/20 px-3">
                        {release_date?.slice(0, 4) ||
                          first_air_date?.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                </Card>
              </Carousel.Slide>
            )
          )}
        </Carousel>
      </Flex>
    )
  );
}
