import { useTranslations } from "next-intl";
import Image from "next/image";
import * as motion from "motion/react-client";
import { useUser } from "@/context/UserContext";
import { PredictionStepProps } from "@/utils/types/Prediction";
import { checkCoinFetch } from "@/lib/api/modals/checkCoinFetch";

export default function GameRulesStep({
  setStep,
  config,
  type,
  isPredicted,
}: {
  setStep: (step: PredictionStepProps) => any;
  config: string;
  type: "trivia" | "prediction";
  isPredicted?: boolean;
}) {
  const t = useTranslations("games.steps.rules");
  const { user } = useUser();
  const isLogged = !!user;

  const onSuccess = (data: any) => {
    if (data?.status) setStep("joker-check");
  };

  const onError = () => {
    setStep("insufficient-coins");
  };

  const handlePlay = async () => {
    if (!!!isLogged || (type === "prediction" && isPredicted))
      return setStep("game");

    await checkCoinFetch(type as any, { onSuccess, onError });
  };
  return (
    <>
      <div className="rounded-xl mx-6 bg-black/50">
        <div className="w-full px-8 md:px-12 pt-10">
          <h2 className="text-white font-bold text-center text-2xl md:text-3xl">
            {type === "trivia"
              ? t("trivia")
              : type === "prediction"
                ? t("prediction")
                : ""}
          </h2>
        </div>
        <div className="px-8 md:px-12 py-8 flex flex-col gap-4  max-w-2xl mx-auto text-white">
          <h3>{t("rules")}</h3>
          <div
            className="[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:ml-0 [&_li]:mb-1 px-2 md:px-4"
            dangerouslySetInnerHTML={{ __html: config }}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn bg-gradient-primary mt-4 mx-auto !rounded-full !px-10"
            onClick={handlePlay}
          >
            {t("play_now")}
          </motion.button>
        </div>
      </div>
    </>
  );
}
