import { useMemo, useState } from "react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

import { ImageCustom } from "@/components/ui/ImageCustom";
import { SliderCarousel } from "@/components/ui/SliderCarousel";
import { ProductType } from "@/types/product";

import { ProductDetailRight } from "../ProductDetailRight";
import { Comment } from "./Comment";

interface Props {
  dataProductDetail: ProductType;
}

export const ProductDetailLeft = (props: Props) => {
  const { dataProductDetail } = props;

  const [selectedImage, setSelectedImage] = useState();

  const gallery = useMemo(() => [dataProductDetail.image], [dataProductDetail]);

  return (
    <div className="flex-grow relative" style={{ width: "calc(100% - 592px)" }}>
      {gallery.length > 0 && (
        <SliderCarousel
          spaceBetween={24}
          thumbs={{
            swiper: selectedImage || null,
          }}
          slidesPerView={1}
          modules={[Autoplay, Pagination, Navigation, Thumbs]}
        >
          {gallery.map((item: string, index: number) => (
            <SwiperSlide key={index}>
              <div className={"w-full h-full relative cursor-pointer"}>
                <ImageCustom
                  src={item}
                  alt={item}
                  width={2550}
                  height={2550}
                  className="w-auto max-h-[635px] object-cover object-center mx-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </SliderCarousel>
      )}

      <div className="lg:hidden block relative pb-8">
        <ProductDetailRight dataProductDetail={dataProductDetail} />
        <div
          className="absolute left-0 bottom-0 bg-gray-10 md:hidden block -translate-x-1/2 h-4"
          style={{ width: 2000 }}
        />
      </div>

      <div className="mt-4">
        <Comment dataProductDetail={dataProductDetail} />
      </div>
    </div>
  );
};
