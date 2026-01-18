"use client";
import { useUser } from "@/context/UserContext";
import { SingleGameProps } from "@/utils/types/Games/SingleGameProps";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GameModal from "./Modals";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SingleGameSection({
  img,
  logo,
  logo_className,
  title,
  description,
  rules,
  zee_coins,
  game_url,
  type,
}: SingleGameProps) {
  const t = useTranslations("components.ui.single_game");
  const locale = useLocale();
  const router = useRouter();
  const { user } = useUser();
  /* console.log(isLogged); */
  const [modal, setModal] = useState(false);
  const handlePlay = () => {
    switch (type) {
      case "shot_on_net":
        handleShoot();
        break;
      case "trivia":
        handleTrivia();
        break;
      case "prediction":
        handlePrediction();
        break;
    }
  };
  const handleShoot = () => {
    if (!!user) {
      setModal(true);
    } else {
      window.location.href = String(`${game_url}?lang=${locale}`);
    }
  };
  const handleTrivia = () => {
    if (!!user) {
      setModal(true);
    } else {
      router.push("/trivia");
    }
  };
  const handlePrediction = () => {
    router.push("/fixtures");
  };

  return (
    <>
      <GameModal
        zee_coins={zee_coins}
        game_url={game_url}
        isOpen={modal}
        onClose={() => setModal(false)}
        type={type}
      />

      <div
        className="bg-center bg-cover w-full"
        style={{ backgroundImage: `url(${img})` }}
      >
        {/* container */}
        <div className="flex flex-col items-center justify-between gap-4 h-full text-white py-6 px-3
        md:py-10 md:gap-2
        lg:gap-4
        xl:gap-8
        2xl:gap-12
        ">
          <h3 className="md:!text-4xl md:!font-bold lg:!text-5xl">{title}</h3>
          <Image
            src={logo}
            alt="logo"
            width={1000}
            height={1000}
            className={`${logo_className} w-24 md:w-40 lg:w-52 xl:w-64 2xl:w-72`}
          />
          <p className="text-center text-xs px-8 font-medium
          md:text-lg md:max-w-2xl
          lg:text-xl lg:max-w-3xl
          ">{description}</p>
          <motion.button
          onClick={handlePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-primary px-4 py-1 rounded-full text-sm cursor-pointer
                  md:px-12 md:py-2.5 md:text-base md:mt-6
                  lg:px-16 lg:py-3 lg:text-lg lg:mb-4
                  xl:px-20 xl:py-4 xl:text-xl
                  2xl:px-24 2xl:py-5 2xl:text-2xl
                  "
          >
            {t("play_now")}
          </motion.button>
          {/* Rules */}
          <div className="flex items-stretch gap-2 bg-[#D9D9D980]/80 w-full py-2 px-3 rounded-xl max-w-sm
          md:max-w-lg
          lg:max-w-xl
          xl:max-w-2xl
          ">
            {/* Shape */}
            <div className="bg-linear-to-b from-[#B520FE] to-[#00CAFE] w-2 rounded-full" />
            <div className="flex-grow">
              <h5 className="">
                {t("rules")}
              </h5>
              <div
                dangerouslySetInnerHTML={{ __html: rules }}
                className="text-sm font-medium [&_ul]:list-[revert] [&_ul]:ps-5 [&_ol]:list-[revert] [&_ol]:ps-5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
