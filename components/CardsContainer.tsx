"use client";

import { useZuStore } from "@/store/zuStore";
import { Carousel } from "@mantine/carousel";
import { Card, Flex, Group, Image } from "@mantine/core";
// import Autoplay from "embla-carousel-autoplay";
import classes from "./carousel.module.css";
// import { useRef } from "react";

export default function CardsContainer() {
  //   const autoplay = useRef(Autoplay({ delay: 3500 }));
  //   const { trendings } = useZuStore((state) => state);
  const { popular } = useZuStore((state) => state);
  return (
    popular && (
      <Flex className="flex flex-col gap-4 w-full  py-10 pl-10 bg-black relative">
        <h1 className="text-2xl font-bold text-main capitalize">Popular</h1>
        <Carousel
          className="   pt-2 min-h-96"
          classNames={classes}
          slideSize="33.333333%"
          align="start"
        >
          {popular?.map(({ id, title, name, poster_path }) => (
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
                      "w300" +
                      poster_path
                    }
                    height={60}
                    alt={title || name}
                    className=" object-cover object-top max-h-full h-full w-full"
                  />
                </Card.Section>

                <div className="absolute bottom-0 left-0 right-0 h-full z-20 bg-black/50 text-white p-1 w-full opacity-0 group-hover:opacity-100 flex transition-opacity duration-500 items-center justify-center  ">
                  <Group justify="space-between" mt="sm" mb="xs" className=" ">
                    <h1 className=" line-clamp-1 text-lg ">{title || name}</h1>
                    {/* <Badge color="pink">On Sale</Badge> */}
                  </Group>
                </div>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Flex>
    )
  );
}
