"use client";

import { Card, Image } from "@mantine/core";
import Marquee from "react-fast-marquee";

import { ProvidersProps, useZuStore } from "@/store/zuStore";
import { useEffect } from "react";

export default function ShowProviders() {
  const { providers, execute } = useZuStore((state) => state);

  useEffect(() => {
    execute();
  }, []);

  // filter providers with display_proiority of less than 10
  const filteredProviders = providers?.filter((provider: ProvidersProps) => {
    return provider.display_priority > 12;
  });

  return (
    providers && (
      <div className="  bg-gradient-to-t from-black  to-transparent overflow-hidden ">
        <Marquee className="w-full h-fit flex items-center gap-4  overflow-x-auto  absolute top-0 px-10 py-4 group">
          {filteredProviders?.map(
            ({ provider_id, logo_path, provider_name }) => {
              return (
                <Card
                  key={provider_id}
                  shadow="sm"
                  padding="lg"
                  radius="sm"
                  className="border-1 p-8 overflow-hidden max-w-20 min-w-20 w-full h-10 mx-3 flex items-center justify-center "
                >
                  <Card.Section>
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
                        "w185" +
                        logo_path
                      }
                      height={20}
                      alt={provider_name}
                      loading="lazy"
                      className="border-0 border-black hover:border-black hover:border-0 p- bg-black   h-full  w-full object-contain bg-blend-color-doge "
                    />
                  </Card.Section>
                </Card>
              );
            }
          )}
        </Marquee>
      </div>
    )
  );
}
