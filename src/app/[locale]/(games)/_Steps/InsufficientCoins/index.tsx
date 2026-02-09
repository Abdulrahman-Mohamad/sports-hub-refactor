import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

export default function GameInsufficientCoinsStep() {
  const router = useRouter();
  const t = useTranslations("games.steps.insufficient_coins");
  return (
    <div className="border-gradient-greenblue-empty glow-blue-green-notification">
      <div className="w-full px-8 md:px-20 py-6">
        <h3 className="text-gradient-bluegreenA1 font-medium text-center text-2xl  md:text-3xl ">
          {t("title")}
        </h3>
      </div>
      <div className="px-12 py-8 flex flex-col gap-4 items-center max-w-2xl mx-auto ">
        <div>
          <Image
            src={'/images/common/sad-face.png'}
            alt="Coin"
            width={200}
            height={200}
            className="aspect-square w-[100px] md:w-[150px]"
            unoptimized
          />
        </div>
        <p className="text-center text-sm md:text-base text-white w-3/4 mx-auto my-10">
          {t("body")}
        </p>
        <div className="grid grid-cols-2 gap-4 w-full md:w-3/4">
          <button
            className="btn bg-white hover:bg-white/70 border-2 border-blueA1 text-blueA1 "
            onClick={() => router.push("/")}
          >
            {t("no")}
          </button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn bg-gradient-bluegreenA1 text-white !font-bold"
            onClick={() => router.push("/packages")}
          >
            {t("yes")}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
