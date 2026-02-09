"use client";
import HorizontalSwiper from "@/components/ui/HorizontalSwiper";
import GameModal from "@/components/ui/SingleGame/Modals";
import { useUser } from "@/context/UserContext";
import { Prediction } from "@/utils/types/Fixtures/Fixture";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function PredictSection({ data, config }: any) {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState<string | number | null>(null);
  const response = config || {};
  const t = useTranslations("pages.main.predictions.hero");
  return (
    <section className="my-20 md:px-10 lg:px-0 max-w-5xl mx-auto">
      <GameModal
        isOpen={modal}
        onClose={() => setModal(false)}
        type="prediction"
        zee_coins={response?.zee_coins}
        predictionId={id}
      />
      <div className="relative">
        {/* glow Effect */}
        <div className="absolute bg-radial from-[#E400FB]/40 via-transparent via-70% to-transparent w-full aspect-[1/1] left-0 -translate-x-1/2 -translate-y-1/2" />
        <h3 className="text-white text-shadow text-3xl md:text-5xl text-center mb-14 font-medium">
          {t("title")}
        </h3>
      </div>
      <div className="w-full px-4 md:px-0 relative z-[1]">
        <HorizontalSwiper
          data={data}
          ChildCard={MatchCard}
          setModal={setModal}
          setId={setId}
        />
      </div>
    </section>
  );
}

const MatchCard = ({
  data,
  setModal,
  setId,
}: {
  data: Prediction;
  setModal?: (isOpen: boolean) => any;
  setId?: (id: string | number | null) => any;
}) => {
  const t = useTranslations("pages.main.predictions");
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const isLogged = user;

  const handlePredict = (e: React.MouseEvent) => {
    e.stopPropagation();
    //check if he is logged in or not first
    if (!!!isLogged) return router.push("/register");
    // check if the time for prediction is up or not
    const [d, m, y] = data?.fixture_date.split("/").map(Number);
    const [timePart, modifier] = data?.fixture_time.split(" ");
    const timeSplit = timePart.split(":").map(Number);
    let hours = timeSplit[0];
    const minutes = timeSplit[1];

    if (modifier?.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (modifier?.toUpperCase() === "AM" && hours === 12) hours = 0;

    const fixtureDateTime = new Date(y, m - 1, d, hours, minutes).getTime();
    const now = new Date().getTime();
    const bufferMs = (data?.last_mins_for_prediction || 0) * 60 * 1000;

    if (now >= fixtureDateTime - bufferMs) {
      return toast.warn(t("you_cant_predict"));
    }

    // check if he predicted before , if true update prediction , if false create new pediction
    // if he going to update redirect to the page directly
    if (data?.prediction) return router.push(`/prediction?id=${data?.id}`);
    // if first time open the modal to make deduct coins
    if (setId) {
      setId(data?.id);
    }
    if (setModal) return setModal(true);
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
      lg:bg-transparent lg:even:bg-[url('/images/fixtures/down-shape.png')] lg:odd:bg-[url('/images/fixtures/up-shape.png')] lg:bg-cover lg:bg-center
      "
    >
      {/* Left "Home" Side Team */}
      <div className="flex items-center flex-col md:flex-row justify-center md:justify-end text-sm sm:text-lg text-neutral10 font-medium gap-4 h-full text-center">
        <div className="md:order-2 flex items-center justify-center">
          <Image
            src={data?.teams?.home?.logo}
            alt="Home Team"
            className="w-16 md:w-20 h-16 md:h-20 object-contain"
            width={1000}
            height={1000}
          />
        </div>
        <div className="md:me-8 md:truncate text-white">
          {data?.teams?.home?.name}
        </div>
      </div>
      {/* Center Score & Button */}
      <AnimatePresence>
        <div className=" min-w-24 md:min-w-44  flex flex-col items-center justify-center text-xs md:text-lg  font-medium text-white gap-1 h-24">
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
              className="!px-3 sm:!px-8 !py-3 btn bg-gradient-primary"
              onClick={(e) => handlePredict(e)}
            >
              {t("predict")}
            </motion.button>
          )}
        </div>
      </AnimatePresence>
      {/* Right Side Team */}
      <div className="flex md:items-center justify-center md:justify-start flex-col md:flex-row text-sm sm:text-lg text-neutral10 font-medium gap-4 h-full text-center">
        <div className="flex items-start  justify-center">
          <Image
            src={data?.teams?.away?.logo}
            alt="Away Team"
            className="w-16 md:w-20 h-16 md:h-20 object-contain"
            width={1000}
            height={1000}
          />
        </div>
        <div className="md:ms-8 md:truncate text-white">
          {data?.teams?.away?.name}
        </div>
      </div>
    </div>
  );
};
