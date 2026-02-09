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
      <div>
        <div className="w-full flex justify-center">
          <Image
            className="w-52 md:w-96"
            src="/images/gameplay/stepsBall.png"
            alt="stepsBall"
            width={1000}
            height={1000}
          />
        </div>
        <div className="rounded-xl mx-6 border-greenblue bg-darkGunmetalA2 ring-2 ring-[#FCDE02]/20">
          <div className="w-full px-8 md:px-20 pt-8">
            <h3 className="text-greenA1 font-bold text-center text-2xl text-nowrap md:text-3xl">
              {t("title")}
            </h3>
          </div>
          <div className="px-4 md:px-12 py-8 flex flex-col gap-4 items-center max-w-2xl mx-auto text-white">
            <div>
              <Image
                src="/images/gameplay/jokerCard.png"
                alt="Coin"
                width={200}
                height={500}
                className="w-[160px] h-auto"
              />
            </div>
            <p className="text-center text-lg">{t("body")}</p>
            <div className="grid grid-cols-2 gap-4 w-full md:w-3/4 mt-4 text-nowrap">
              <button
                className="btn bg-white hover:bg-white/70 border-2 border-blueA1 text-blueA1 !px-10"
                onClick={() => setStep("game")}
              >
                {t("cancel")}
              </button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn bg-gradient-bluegreenA1 border-2 !font-bold"
                onClick={handleCheck}
              >
                {t("activate")}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
