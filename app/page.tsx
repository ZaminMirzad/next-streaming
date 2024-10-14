"use client";

import CardsContainer from "@/components/CardsContainer";
import CarouselComponent from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ShowProviders from "@/components/ShowProvider";
import { useZuStore } from "@/store/zuStore";

export default function Home() {
  const { popular, upcoming } = useZuStore((state) => state);
  return (
    <main className="w-screen h-screen relative overflow-x-hidden bg-black">
      <Header />
      <CarouselComponent />
      <div className="h-20 bg-"></div>

      <div className=" mt-[450px] relative  space-y-0 flex flex-col gap-1">
        <ShowProviders />
        <CardsContainer
          containerTitle="Popular Movies"
          containerList={popular}
        />
        <CardsContainer
          containerTitle="Soon In Theathers"
          containerList={upcoming}
        />
      </div>

      <Footer />
    </main>
  );
}
