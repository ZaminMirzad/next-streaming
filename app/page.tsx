"use client";

import CardsContainer from "@/components/CardsContainer";
import CarouselComponent from "@/components/Carousel";
import CustomCarousel from "@/components/CustomCarousel";

import Footer from "@/components/Footer";
import PopularOfTheWeek from "@/components/PopularOfTheWeek";
import ShowProviders from "@/components/ShowProvider";
import { useZuStore } from "@/store/zuStore";


export default function Home() {
  const { popular, upcoming, trendings } = useZuStore((state) => state);
  return (
    <main className="w-screen h-screen relative overflow-x-hidden bg-black -mt-16">
      <CarouselComponent />
      <div className="h-20 bg-"></div>

      <div className=" mt-[490px] relative  space-y-0 flex flex-col gap-0">
        <ShowProviders />
        <CardsContainer
          containerTitle="Popular Movies"
          containerList={upcoming}
        />
      </div>
      <PopularOfTheWeek />

      <CustomCarousel slides={popular} />

      <CardsContainer
        containerTitle="Soon In Theathers"
        containerList={trendings}
      />

      <Footer />
    </main>
  );
}