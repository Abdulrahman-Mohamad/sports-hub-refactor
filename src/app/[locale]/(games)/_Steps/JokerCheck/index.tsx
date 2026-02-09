import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { PredictionStepProps } from "@/utils/types/Prediction";
import { checkJokerFetch } from "@/lib/api/modals/checkJokerFetch";

export default function GameJokerCheckStep({
  setStep,
  setJoker,
}: {
  setStep: (step: PredictionStepProps) => any;
  setJoker: (joker: boolean) => any;
}) {
  const t = useTranslations("games.steps.joker_check");

  const onSuccess = (data: any) => {
    if (data?.status) {
      setJoker(true);
      setStep("joker-active");
    }
  };
  const onError = () => {
    setJoker(false);
    setStep("insufficient-joker");
  };
  const handleCheck = async () => {
    await checkJokerFetch({ onSuccess, onError });
  };
  return (
    <>
        <div className="rounded-xl mx-6 bg-black/50">
          <div className="w-full px-8 md:px-20 pt-8">
            <h3 className="text-white font-bold text-center text-2xl text-nowrap md:text-3xl">
              {t("title")}
            </h3>
          </div>
          <div className="px-4 md:px-12 py-8 flex flex-col gap-4 items-center max-w-2xl mx-auto text-white">
            <div>
              <Image
                src="/images/gameplay/joker-card.png"
                alt="Coin"
                width={200}
                height={500}
                quality={90}
                className="w-[160px] h-auto"
              />
            </div>
            <p className="text-center text-lg">{t("description")}</p>
            <div className="grid grid-cols-2 gap-4 w-full md:w-3/4 mt-4 text-nowrap">
              <button
                className="btn !bg-white text-primary !px-10 !rounded-full"
                onClick={() => setStep("game")}
              >
                {t("no")}
              </button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn bg-gradient-primary !font-bold !rounded-full"
                onClick={handleCheck}
              >
                {t("yes")}
              </motion.button>
            </div>
          </div>
        </div>
    </>
  );
}
