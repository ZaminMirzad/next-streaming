"use client";

import CardsContainer from "@/components/CardsContainer";
import CarouselComponent from "@/components/Carousel";
import CustomCarousel from "@/components/CustomCarousel";
import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

import Footer from "@/components/Footer";
import PopularOfTheWeek from "@/components/PopularOfTheWeek";
import ShowProviders from "@/components/ShowProvider";
import { useZuStore } from "@/store/zuStore";


export default function Home() {
  const { popular, upcoming, trendings } = useZuStore((state) => state);
  return (
    <main className="w-screen h-screen relative overflow-x-hidden bg-black -mt-16">
      <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur text-white md:hidden lg:hidden xl:hidden z-[9999] flex items-center justify-center h-full w-full overflow-hidden min-h-screen">
        <DemoModal />
      </div>
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

function DemoModal() {
  const openModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return <Button onClick={openModal}>Open confirm modal</Button>;
}
