"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

import { ImageCustom } from "@/components/ui/ImageCustom";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { SliderCarousel } from "@/components/ui/SliderCarousel";

interface ImageCarouselType {
  image: string;
  title: string;
}

const listImageCarousels: ImageCarouselType[] = [
  {
    title: "banner-1",
    image: "/images/banner-1.png",
  },
  {
    title: "banner-2",
    image: "/images/banner-2.png",
  },
  {
    title: "banner-3",
    image: "/images/banner-3.png",
  },
];
export const BannerHome = () => {
  return (
    <PageWrapper backgroundColor="bg-white" style="mb-[16px]">
      <div className=" lg:mb-10 lg:py-10 flex flex-col">
        <div className="flex flex-col">
          <div className="w-full  h-auto">
            <SliderCarousel
              spaceBetween={50}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              slidesPerView={1}
              modules={[Autoplay, Pagination, Navigation]}
              pagination={{ clickable: true }}
              navigation={true}
            >
              {listImageCarousels.map(
                (item: ImageCarouselType, index: number) => (
                  <SwiperSlide key={index}>
                    <div className={"w-full h-full"}>
                      <ImageCustom
                        src={item.image}
                        alt={item.title}
                        width={988}
                        height={564}
                        className="rounded-lg"
                        unoptimized={false}
                        style={{
                          height: "auto !important",
                          maxHeight: 564,

                          width: "100%",
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ),
              )}
            </SliderCarousel>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
