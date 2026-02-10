"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { TriviaResult } from "@/utils/types/Trivia";
import { PredictionStepProps } from "@/utils/types/Prediction";
import GameModal from "@/components/ui/SingleGame/Modals";

export default function TriviaCompletedStep({
  data,
  zee_coins,
  setStep,
}: {
  data: TriviaResult | null;
  zee_coins: number;
  setStep: (step: PredictionStepProps) => void;
}) {
  const t = useTranslations("games.trivia.steps.completed");
  const { user } = useUser();
  const [checkModal, setCheckModal] = useState(false);
  const router = useRouter();

  const handlePlayAgain = () => {
    if (!user) return router.push("/register");
    setCheckModal(true);
  };

  return (
    <div className="rounded-xl mx-6 bg-black/80">
      <GameModal
        zee_coins={zee_coins}
        type="trivia"
        onClose={() => setCheckModal(false)}
        isOpen={checkModal}
        onSuccess={() => setStep("rules")}
      />
      <div className="w-full px-8 md:px-20 pt-8">
        <h3 className="text-white font-bold text-center text-2xl md:text-3xl">
          {t("title")}
        </h3>
      </div>
      <div className="px-4 md:px-12 py-8 flex flex-col gap-4 items-center max-w-2xl mx-auto text-white">
        <div className="flex-center flex-col gap-4 font-medium text-lg lg:text-xl mb-4">
          {/* your score */}
          <p className="">{t("your_score")}</p>
          {/* result */}
          <p className="">
            {data?.correct_que}/{data?.total_que}
          </p>
            <p>+ {data?.points} {t('points')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            className="btn bg-white text-primary"
            onClick={() => router.push("/games")}
          >
            {t("back")}
          </button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn bg-gradient-primary !font-bold"
            onClick={handlePlayAgain}
          >
            {t("play_again")}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
