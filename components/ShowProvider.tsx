"use client";

import { Card, Image } from "@mantine/core";
import Marquee from "react-fast-marquee";

import { useZuStore } from "@/store/zuStore";
import { useEffect } from "react";

export default function ShowProviders() {
  const { providers, execute } = useZuStore((state) => state);

  useEffect(() => {
    execute();
  }, []);

  return (
    providers && (
      <div className="  bg-gradient-to-t from-black  to-transparent overflow-hidden">
        <Marquee
          pauseOnHover
          className="w-full h-fit flex items-center gap-4  overflow-x-auto  absolute top-0 px-10 py-4 group"
        >
          {providers?.map(({ provider_id, logo_path, provider_name }) => {
            return (
              <Card
                key={provider_id}
                shadow="sm"
                padding="lg"
                radius="md"
                className=" max-w-40 min-w-40 w-full h-20 mx-3 hover:-translate-y-3 hover:translate-x-2 hover:cursor-pointer transition duration-300 group-hover:scale-90"
              >
                <Card.Section>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
                      "original" +
                      logo_path
                    }
                    height={20}
                    alt="Norway"
                    className="  min-w-40 h-20  w-40 object-contain object-center aspect-auto "
                  />
                </Card.Section>
              </Card>
            );
          })}
        </Marquee>
      </div>
    )
  );
}
