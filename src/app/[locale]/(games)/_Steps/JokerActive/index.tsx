import Image from "next/image";
import { useTranslations } from "next-intl";
import { PredictionStepProps } from "@/utils/types/Prediction";
import { FaX } from "react-icons/fa6";
import { useEffect } from "react";
import * as motion from "motion/react-client";

export default function GameJokerActiveStep({
  setStep,
}: {
  setStep: (step: PredictionStepProps) => any;
}) {
  const t = useTranslations("games.steps.joker_active");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep("game");
    }, 5000);

    return () => clearTimeout(timer);
  }, [setStep]);

  return (
    <>
      <div className="rounded-xl mx-6 bg-black/50 relative overflow-hidden">
        <div
          onClick={() => setStep("game")}
          className="absolute top-4 end-4 cursor-pointer z-10"
        >
          <FaX className="text-white hover:text-gray-300 transition-colors duration-300" />
        </div>
        <div className="w-full px-8 md:px-20 pt-8">
          <h3 className="text-white font-bold text-center text-2xl md:text-3xl">
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
          <p className="text-center text-xl">
            {t("description")} <br /> {t("good_luck")}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-white/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-gradient-primary-r"
          />
        </div>
      </div>
    </>
  );
}
