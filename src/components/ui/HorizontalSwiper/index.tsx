import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useLocale } from "next-intl";

export default function HorizontalSwiper({
  data,
  ChildCard,
  setModal,
  setId,
  itemsPerSlide = 4,
  autoplay = false,
}: {
  data: any;
  setModal?: (isOpen: boolean) => any;
  setId?: (id: string | number | null) => any;
  ChildCard: React.ComponentType<{
    data: any;
    setModal?: (isOpen: boolean) => any;
    setId?: (id: string | number | null) => any;
  }>;
  itemsPerSlide?: number;
  autoplay?: boolean | object;
}) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const slides = React.useMemo(() => {
    return (
      data?.reduce((acc: any[], fixture: any, index: number) => {
        const slideIndex = Math.floor(index / itemsPerSlide);
        if (!acc[slideIndex]) acc[slideIndex] = [];
        acc[slideIndex].push(fixture);
        return acc;
      }, []) || []
    );
  }, [data, itemsPerSlide]);

  return (
    <div className="w-full" dir={isRTL ? "rtl" : "ltr"}>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        modules={[Pagination, Autoplay]}
        autoplay={autoplay}
        pagination={{
  clickable: true,
  dynamicBullets: true,
  dynamicMainBullets: 1,
}}
        className="w-full !pb-10"
      >
        {slides.map((slideData: any, slideIndex: number) => (
          <SwiperSlide key={slideIndex} className="py-2 px-1">
            <div className="flex flex-col gap-4">
              {slideData.map((fixture: any) => (
                <ChildCard
                  data={fixture}
                  setModal={setModal}
                  setId={setId}
                  key={fixture?.id}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


    </div>
  );
}
