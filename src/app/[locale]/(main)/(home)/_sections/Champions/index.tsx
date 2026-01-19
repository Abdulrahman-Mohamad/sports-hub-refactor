"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

type ChampionsProps = {
  username: string;
  media: string;
  points: number;
  ranking: number;
  win: number;
  loss: number;
  ratio: string;
  score_hide: boolean;
};

export default function HomeChampionsSection({
  trivia,
  prediction,
  shoot,
}: {
  trivia: ChampionsProps[];
  prediction: ChampionsProps[];
  shoot: ChampionsProps[];
}) {
  const t = useTranslations("pages.main.home.champions");
  return (
    <>
      <div className="mt-10 lg:mt-16 overflow-hidden ">
        {/* Trivia Champions Section */}
        <section className="relative gap-4 w-full px-2 md:ps-6 lg:ps-8 xl:ps-14">
          <div className="text-white text-center mb-10 relative">
            <AnimateTitleByArrows>
              <h3 className="!text-xl font-bold md:!text-3xl lg:!text-4xl">{t("trivia")}</h3>
            </AnimateTitleByArrows>
          </div>
          <div className="w-full px-4 md:px-0">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 bg-radial from-[#D600FB]/60 via-transparent via-70% to-transparent w-1/2 h-full" />
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 1,
              }}
              modules={[Pagination]}
              className="!pb-10"
            >
              {trivia?.map((item, i) => (
                <SwiperSlide
                  key={i}
                  className="!w-auto mb-4 py-2  px-1 !h-auto "
                >
                  <PlayerCard data={item} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        {/* prediction Champions Section */}
        <section className="relative gap-4 w-full px-2 md:ps-6 lg:ps-8 xl:ps-14 mt-10 lg:mt-16">
          <div className="text-white text-center mb-10 relative">
            <AnimateTitleByArrows>
              <h3 className="!text-xl font-bold md:!text-3xl lg:!text-4xl">{t("prediction")}</h3>
            </AnimateTitleByArrows>
          </div>
          <div className="w-full px-4 md:px-0">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 bg-radial from-[#D600FB]/60 via-transparent via-70% to-transparent w-1/2 h-full" />
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 1,
              }}
              modules={[Pagination]}
              className="!pb-10"
            >
              {prediction?.map((item, i) => (
                <SwiperSlide
                  key={i}
                  className="!w-auto mb-4 py-2  px-1 !h-auto "
                >
                  <PlayerCard data={item} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        {/* shoot Champions Section */}
        <section className="relative gap-4 w-full px-2 md:ps-6 lg:ps-8 xl:ps-14 mt-10 lg:mt-16">
          <div className="text-white text-center mb-10 relative">
            <AnimateTitleByArrows>
              <h3 className="!text-xl font-bold md:!text-3xl lg:!text-4xl">{t("shoot")}</h3>
            </AnimateTitleByArrows>
          </div>
          <div className="w-full px-4 md:px-0">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 bg-radial from-[#D600FB]/60 via-transparent via-70% to-transparent w-1/2 h-full" />
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 1,
              }}
              modules={[Pagination]}
              className="!pb-10"
            >
              {shoot?.map((item, i) => (
                <SwiperSlide
                  key={i}
                  className="!w-auto mb-4 py-2  px-1 !h-auto "
                >
                  <PlayerCard data={item} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
    </>
  );
}

function PlayerCard({ data, index }: { data: ChampionsProps; index: number }) {
  const t = useTranslations("pages.main.home.champions");
  const [activePlayer, setActivePlayer] = useState<number | null>(null);

  const handleCardClick = (playerId: number) => {
    if (activePlayer === playerId) {
      // إذا كانت الشريحة مفتوحة بالفعل، أغلقها
      setActivePlayer(null);
    } else {
      // افتح الشريحة الجديدة
      setActivePlayer(playerId);
    }
  };

  // دالة للـ hover (للكمبيوتر فقط)
  const handleMouseEnter = (playerId: number) => {
    // نستخدم hover فقط في الكمبيوتر (عندما يكون هناك hover)
    if (window.matchMedia("(hover: hover)").matches) {
      setActivePlayer(playerId);
    }
  };

  const handleMouseLeave = () => {
    // نستخدم hover فقط في الكمبيوتر
    if (window.matchMedia("(hover: hover)").matches) {
      setActivePlayer(null);
    }
  };

  return (
    <div
      className=""
      onMouseEnter={() => handleMouseEnter(data.ranking || index)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Design */}
      <div
        className="border-gradient-primary w-[250px] h-[400px] rounded-lg p-0 relative group me-4 mt-4 md:w-[300px] md:h-[450px] md:me-8 lg:w-[350px] lg:h-[550px] lg:me-10 xl:me-14 xl:w-[434px] xl:h-[650px] cursor-pointer"
        onClick={() => handleCardClick(data.ranking || index)}
      >
        {/* User Name */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0E0011]">
          <p className="text-white font-bold px-4 text-nowrap text-lg md:text-xl xl:text-2xl">
            {data.username}
          </p>
        </div>

        {/* Container */}
        <div className="w-full h-full flex items-center justify-center rounded-lg border border-transparent p-2 xl:p-6">
          {/* User Info */}
          <div className="w-full h-full rounded-lg relative overflow-hidden flex items-center justify-center">
            {/* User Image */}
            <div className="overflow-hidden">
              <Image
                src={data.media || "/images/home/default-user.png"}
                alt={data.username}
                fill
                quality={100}
                priority={true}
                className={`  object-center absolute inset-0 transition-all duration-300 w-full h-full 
                  ${activePlayer === (data.ranking || index) ? "-translate-y-[15%]" : ""} ${!data.media ? "object-contain w-1/2 mx-auto self-center" : "min-w-full min-h-full object-cover"}`}
              />
            </div>

            {/* Ranking Badge for top 3 */}
            {data.ranking <= 3 && (
              <Image
                src={`/images/home/${data.ranking === 1 ? "champion-rank-1" : data.ranking === 2 ? "champion-rank-2" : "champion-rank-3"}.png`}
                alt={`${data.ranking} place`}
                width={90}
                height={151}
                className="absolute top-0 left-4 w-12 md:w-16 lg:w-18 xl:w-20"
              />
            )}

            {/* User Score - shown on hover/click */}
            <div
              className={`absolute left-0 right-0 h-[35%] transition-all duration-300 
                ${activePlayer === (data.ranking || index) ? "bottom-0" : "-bottom-[100%]"}`}
            >
              <div className="min-w-full min-h-full relative">
                <div className='absolute inset-0 min-w-full min-h-full bg-[url("/images/home/champoin-state-bg.png")] bg-cover bg-center bg-no-repeat z-10'>
                  <div className="flex flex-col pt-4 text-white font-semibold px-4 lg:px-8 xl:px-10">
                    <div
                      className="bg-gradient-primary py-1 rounded-lg text-center mb-2 md:mb-3 lg:py-2 lg:mb-4 xl:mb-5"
                      style={{ boxShadow: "0 4px 5.5px 0 rgba(0, 0, 0, 0.38)" }}
                    >
                      <span
                        className={`text-base font-bold md:text-lg lg:text-xl 
                          ${data.score_hide ? "blur-sm" : ""}`}
                      >
                        {data.points.toLocaleString()}
                      </span>
                      <span className="text-sm font-normal">
                        {" "}
                        {t("points")}
                      </span>
                    </div>

                    <div className="flex justify-center items-center gap-x-2 text-xs font-semibold md:mb-0.5 md:text-base lg:gap-x-3 lg:text-lg lg:mb-1 xl:gap-x-4 xl:mb-3">
                      <div className="bg-gradient-primary rounded-lg flex justify-between items-center px-3 w-1/2 py-1.5 xl:py-2">
                        <p>{t("win")}</p>
                        <span>{data.win}</span>
                      </div>
                      <div className="bg-gradient-primary rounded-lg flex justify-between items-center px-3 w-1/2 py-1.5 xl:py-2">
                        <span>{t("losses")}</span>
                        <span>{data.loss}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-primary rounded-lg flex justify-between items-center gap-2 mx-auto px-3 mt-2 text-xs py-1.5 md:text-base lg:text-lg xl:py-2">
                      <p>{t("ratio")}</p>
                      <span>{data.ratio}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimateTitleByArrows({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full flex items-center justify-between gap-4 rtl:flex-row-reverse">
        {/* left Arrow */}
        <div className="relative w-full h-16 flex-grow">
          <Image src={"/gif/common/arrow-wide.gif"} alt="Animate Title" fill className="opacity-50" />
        </div>
        {/* children */}
        <div className="w-fit text-nowrap">{children}</div>
        {/* right Arrow */}
        <div className="relative w-full h-16 flex-grow">
          <Image
            src={"/gif/common/arrow-wide-180.gif"}
            alt="Animate Title"
            fill
            className="opacity-50"
          />
        </div>
      </div>
    </>
  );
}
