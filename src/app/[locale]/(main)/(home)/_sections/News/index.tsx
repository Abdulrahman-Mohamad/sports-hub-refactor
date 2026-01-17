"use client";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useState } from "react";
import { News } from "@/utils/types/Home/News";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";
import Modal from "@/components/ui/Modal";
import { IoMdClose } from "react-icons/io";

export default function HomeNewsSection({ data }: { data: News[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [newsModal, setNewsModal] = useState(false);
  const [modalData, setModalData] = useState<News | null>(null);

  const handleNewsClick = (item: News) => {
  setModalData(item);
  setNewsModal(true);
};

  return (
    <div className="px-4 lg:px-8 mt-10 lg:-mt-22 xl:-mt-30 2xl:-mt-40">
      <div
        className="relative w-full py-10 max-lg:bg-gradient-primary rounded-2xl px-4 
      sm:px-8 
      md:px-24
      lg:bg-[url('/images/home/news-bg.png')] lg:bg-cover lg:bg-center lg:aspect-[1309/622] lg:flex lg:items-end lg:overflow-hidden lg:px-0 lg:pb-4
      xl:pb-6
      2xl:pb-14
      "
      >
        <Image
          src={"/images/home/news-ball.png"}
          alt={"News Ball"}
          width={1000}
          height={1000}
          className="absolute end-0 bottom-0 w-44 md:w-52 lg:w-60 xl:w-96 2xl:w-120"
        />
        <Swiper
          effect={"coverflow"}
          grabCursor={false}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={-125}
          loop={data.length > 1}
          coverflowEffect={{
            rotate: 0,
            stretch: -50,
            depth: 400,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="swiper !pb-6 lg:!w-3/4 xl:!w-2/3"
        >
          {data.map((item, index) => (
            <SwiperSlide key={item.id} className="!w-3/4">
              <div className="flex flex-col gap-4">
                <div 
                onClick={() => handleNewsClick(item)}
                className="relative rounded-lg overflow-hidden border border-white/20 cursor-pointer">
                  <Image
                    src={item.image_url || "/images/common/default-news.png"}
                    alt={item.title}
                    width={500}
                    height={500}
                    loading="eager"
                    className="object-cover w-full h-50 lg:h-60 xl:h-80 2xl:h-96"
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-2 bg-black/40 backdrop-blur-sm text-white">
                    <h3 className="!text-base font-bold line-clamp-1 py-2">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div
                  className={`text-white px-2 text-center ${activeIndex === index ? "opacity-100" : "opacity-0"} ${activeIndex !== index && "pointer-events-none"}`}
                >
                  <p className="text-base font-medium line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {modalData && (
      <NewsModal
        isOpen={newsModal}
        onClose={() => setNewsModal(false)}
        data={modalData}
      />
    )}
    </div>
  );
}


const NewsModal = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: News | null;
}) => {
  const t = useTranslations('pages.main.home.news');
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="!rounded-3xl min-w-[80%] max-w-[80%] md:min-w-[60%] bg-white glow-blue-green overflow-y-auto hide-scrollbar"
    >
      {/* Top Red Section */}
      <div className=" rounded-t-3xl w-full p-4 flex items-center justify-end">
        <button className="">
          <IoMdClose
            size={30}
            className="text-grayA4 hover:text-gray-600 cursor-pointer"
            onClick={onClose}
          />
        </button>
      </div>
      {/* Body White Section */}
      <div className=" pb-6 space-y-4">
        {/* Image */}
        <div className="w-full">
          <Image
            width={400}
            height={400}
            quality={100}
            alt={data?.title || ""}
            src={data?.image_url || t("logo.dark")}
            className="w-full object-contain max-h-96"
          />
        </div>
        {/* Text Body */}
        <div className="px-2 md:px-8">
          {/* Published & Author */}
          <div className="flex gap-4 justify-end pb-4 text-grayA4 text-xs md:text-sm font-semibold flex-col md:flex-row ">
            <p className="flex gap-2">
              <span>{t("published_at")}</span>
              <span>{data?.published_at}</span>
            </p>
            <p className="flex gap-2">
              <span>{t("author")}</span>
              <span>{data?.author}</span>
            </p>
          </div>

          {/* Body & Description */}
          <div className=" text-center space-y-2 px-4">
            <h4 className="text-base ">{data?.title}</h4>
            <p className="text-sm">{data?.description}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};