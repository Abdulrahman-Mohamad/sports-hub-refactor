import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GameModal from "@/components/ui/SingleGame/Modals";
import { motion } from "framer-motion";
import { PredictionStepProps } from "@/utils/types/Prediction";
import { ItCompleteResult } from "@/utils/types/ItComplete";
import { useUser } from "@/context/UserContext";

export default function ItCompleteCompletedStep({
  data,
  zee_coins,
  setStep,
}: {
  data: ItCompleteResult | null;
  zee_coins: number | string;
  setStep: (step: PredictionStepProps) => void;
}) {
  const t = useTranslations("games.it_complete.steps.completed");
  const { user } = useUser();
  const [checkModal, setCheckModal] = useState(false);
  const router = useRouter();

  const handlePlayAgain = () => {
    if (!user) return router.push("/login");
    setCheckModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-3xl mx-4 sm:mx-6 border-2 border-[#D600FB] bg-[#0E0011]/90 backdrop-blur-lg shadow-[0_0_30px_rgba(214,0,251,0.2)] max-w-2xl w-full"
    >
      <GameModal
        zee_coins={zee_coins}
        type="it_complete"
        onClose={() => setCheckModal(false)}
        isOpen={checkModal}
        onSuccess={() => setStep("rules")}
      />
      <div className="w-full px-8 md:px-20 pt-10">
        <h3 className="text-gradient-primary font-black text-center text-3xl md:text-4xl">
          {t("title")}
        </h3>
      </div>
      
      <div className="px-4 md:px-12 py-8 flex flex-col gap-6 items-center w-full text-white">
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
           <div className="absolute inset-0 bg-[#D600FB] blur-[40px] opacity-30 rounded-full"></div>
           <Image
            src="/images/games/it_complete-logo.png"
            alt="Autobees Complete"
            width={200}
            height={200}
            className="object-contain relative z-10"
          />
        </div>

        <div className="w-full flex flex-col gap-3 max-w-md mx-auto">
          {data?.answers.map((answer, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="flex items-center justify-between px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#D600FB]/50 hover:bg-white/10 transition-all group shadow-sm"
            >
              <span className="text-gray-300 text-sm md:text-base font-semibold group-hover:text-white transition-colors">
                {answer.category}
              </span>
              <div className="flex items-center gap-4">
                <span
                  className={`font-bold text-sm md:text-base ${
                    answer.is_correct ? "text-[#00FF66]" : "text-[#FF0055]"
                  }`}
                >
                  {answer.answer || "-"}
                </span>
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold border-2 ${
                    answer.is_correct
                      ? "bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/50"
                      : "bg-[#FF0055]/10 text-[#FF0055] border-[#FF0055]/50"
                  }`}
                >
                  {answer.is_correct ? "✓" : "✕"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-center text-xl font-medium flex gap-2 items-center text-gray-300">
            <span>{t("score")}:</span>
            <span className="font-bold text-white">
              {data?.correct_categories} / {data?.total_categories}
            </span>
          </p>
          <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/20">
            <span className="font-black text-3xl text-gradient-primary">+{data?.points}</span>
            <span className="font-bold text-xl">{t("points")}</span>
            {!user && (
              <span className="font-medium text-sm bg-[#D600FB] text-white px-2 py-0.5 rounded-md ml-2">{t("trial-mode")}</span>
            )}
          </div>
        </div>

        {!user && (
          <p className="text-center font-medium text-gray-400 mt-2">{t("paragraph")}</p>
        )}

        <div className="grid grid-cols-2 gap-4 w-full mt-4">
          <button
            className="btn bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-bold rounded-xl py-4"
            onClick={() => router.push("/games")}
          >
            {t("no")}
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn bg-gradient-primary border-none text-white font-bold rounded-xl py-4 shadow-[0_0_15px_rgba(214,0,251,0.5)]"
            onClick={handlePlayAgain}
          >
            {t("yes")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
