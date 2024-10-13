import CardsContainer from "@/components/CardsContainer";
import CarouselComponent from "@/components/Carousel";
import Header from "@/components/Header";
import ShowProviders from "@/components/ShowProvider";

export default function Home() {
  return (
    <main className="w-screen h-screen relative overflow-x-hidden bg-black">
      <Header />
      <CarouselComponent />
      <div className="h-20 bg-"></div>

      <div className=" mt-[450px] relative  space-y-0 flex flex-col gap-1">
        <ShowProviders />
        <CardsContainer />
      </div>
    </main>
  );
}
