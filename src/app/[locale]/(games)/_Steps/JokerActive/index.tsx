import Image from "next/image";
import { TriviaStepProps } from "@/utils/types&schemas/Trivia/TriviaStep";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

export default function GameJokerActiveStep({
  setStep,
}: {
  setStep: (step: TriviaStepProps) => any;
}) {
  const t = useTranslations("pages.game_steps.joker_active");
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
            <h3 className="text-greenA1 font-bold text-center text-2xl  md:text-3xl">
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
            <p className="text-center text-xl">
              {t("body")} <br /> {t("good_luck")}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn bg-gradient-bluegreenA1 border-2 !font-bold !px-20"
              onClick={() => setStep("game")}
            >
              {t("button")}
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
