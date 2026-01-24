"use client";
import HorizontalSwiper from "@/components/ui/HorizontalSwiper";
import { Match } from "@/utils/types/Fixtures/Fixture";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MatchHighlightsSection({ data }: { data: Match[] }) {
  const t = useTranslations("pages.main.fixtures");
  return (
    <section className="my-20 md:px-10 lg:px-0 max-w-5xl mx-auto">
      {/* Content Layer - Centered and above the background */}
        <h3 className="text-white text-shadow text-3xl md:text-5xl text-center mb-14 font-medium">
          {t("match_highlight")}
        </h3>
        <div className="w-full px-4 md:px-0">
          <HorizontalSwiper data={data} ChildCard={MatchCard} />
        </div>
    </section>
  );
}

const MatchCard = ({ data }: { data: Match }) => {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("pages.main.fixtures");
  const router = useRouter();
  const handleHighlight = () => {
    router.push(`/predictions/${data?.id}`);
  };
  // Handle mouse hover (desktop)
  const handleMouseEnter = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      setIsHovered(false);
    }
  };

  // Handle click/tap (mobile toggle)
  const handleCardClick = () => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsHovered(!isHovered);
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="w-full py-4 px-4 md:px-20 bg-[#231925] rounded-xl grid grid-cols-[1fr_auto_1fr] items-center justify-center cursor-pointer
      lg:bg-transparent lg:odd:bg-[url('/images/fixtures/down-shape.png')] lg:even:bg-[url('/images/fixtures/up-shape.png')] lg:bg-cover lg:bg-center"
    >
      {/* Left "Home" Side Team */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center justify-end text-sm sm:text-lg text-neutral10 font-medium gap-4 h-full text-center">
        <div className="flex-shrink-0 flex-grow flex items-center justify-center">
          <Image
            src={data?.teams?.home?.logo}
            alt="Home Team"
            className="w-16 md:w-20 h-16 md:h-20 object-contain"
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex flex-col gap-2 md:-order-1 text-white">
          <span>{data?.teams?.home?.name}</span>
          <span>{data?.goals?.home}</span>
        </div>
      </div>
      {/* Center Score & Button */}
      <div className="w-24 flex flex-col items-center justify-center text-xs md:text-lg  font-medium text-neutral10 gap-2 h-24 text-white">
        {!isHovered ? (
          <>
            <motion.span
              variants={item}
              initial="hidden"
              animate="show"
              transition={{ delay: 0 }}
            >
              {data?.fixture_day}
            </motion.span>

            <motion.span
              variants={item}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.15 }}
              className="text-[#E5E5E5] text-sm"
            >
              {data?.fixture_date}
            </motion.span>

            <motion.span
              variants={item}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.3 }}
              className="text-[#F2A50A]"
            >
              {data?.fixture_time}
            </motion.span>
          </>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            variants={item}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="btn bg-gradient-primary border-2 inner-shadow !px-3 sm:!px-6 !py-2"
            onClick={handleHighlight}
          >
            {t("view_highlight")}
          </motion.button>
        )}
      </div>
      {/* Right Side Team */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-end md:items-center md:flex-row text-sm sm:text-lg text-neutral10 font-medium gap-4 h-full text-center">
        <div className="flex-shrink-0 flex-grow flex items-center justify-center md:-order-1">
          <Image
            src={data?.teams?.away?.logo}
            alt="Away Team"
            className="w-16 md:w-20 h-16 md:h-20 object-contain"
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex flex-col gap-2 text-white">
          <span>{data?.teams?.away?.name}</span>
          <span>{data?.goals?.away}</span>
        </div>
      </div>
    </div>
  );
};
