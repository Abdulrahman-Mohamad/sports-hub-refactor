import Image from "next/image";
import React from "react";
// import sadGIF from "@/assets/games/sad.gif";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function GamesInsufficientModal({
  onClose,
  setStep,
}: {
  onClose: () => void;
  setStep: (step: "check" | "insufficient") => any;
}) {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const handleClose = () => {
    setStep("check");
    if (pathname !== `/${locale}/trivia`) return onClose();
    router.push("/games");
    onClose();
  };
  return (
    <>
      <div className="border-gradient-greenblue-empty glow-blue-green-notification">
        <div className="w-full px-8 md:px-20 py-6">
          <h3 className="text-gradient-bluegreenA1 font-medium text-center text-2xl  md:text-3xl">
            {t("components.games_card.insufficient_coins")}
          </h3>
        </div>
        <div className="px-12 py-8 flex flex-col gap-4 items-center max-w-2xl mx-auto ">
          <div>
            {/* <Image
              src={sadGIF}
              alt="Coin"
              width={200}
              height={200}
              className="aspect-square w-[100px] md:w-[150px]"
              unoptimized
            /> */}
          </div>
          <p className="text-center text-sm md:text-base text-white w-3/4 mx-auto my-10">
            {t("components.games_card.insufficient_message")}
          </p>
          <div className="grid grid-cols-2 gap-4 w-full md:w-3/4">
            <button
              className="btn bg-white border-2 border-blueA1 text-blueA1 hover:bg-white/80 "
              onClick={handleClose}
            >
              {t("common.no_thanks")}
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="btn bg-gradient-bluegreenA1 text-white !font-bold"
              onClick={() => router.push("/packages")}
            >
              {t("components.games_card.go_to_packages")}
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
