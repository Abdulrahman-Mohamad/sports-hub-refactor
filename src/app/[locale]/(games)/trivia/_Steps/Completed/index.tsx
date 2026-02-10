import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import GameModal from "@/components/ui/GamesCard/Modals";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

export default function TriviaCompletedStep({
  data,
  zee_coins,
}: {
  data: {
    total_que: number;
    correct_que: number;
    points: number;
  } | null;
  zee_coins: number;
}) {
  const t = useTranslations("pages.trivia.completed");
  const isLogged = useSelector((state: any) => state.user.user);
  const [checkModal, setCheckModal] = useState(false);
  const router = useRouter();
  const handlePlayAgain = () => {
    if (!!!isLogged) return router.push("/register");
    setCheckModal(true);
  };
  return (
    <div className="rounded-xl mx-6 border-greenblue bg-darkGunmetalA2 ring-2 ring-[#FCDE02]/20">
      <GameModal
        zee_coins={zee_coins}
        type="trivia"
        onClose={() => setCheckModal(false)}
        isOpen={checkModal}
      />
      <div className="w-full px-8 md:px-20 pt-8">
        <h3 className="text-greenA1 font-bold text-center text-2xl  md:text-3xl">
          {t("title")}
        </h3>
      </div>
      <div className="px-4 md:px-12 py-8 flex flex-col gap-4 items-center max-w-2xl mx-auto text-white">
        <div>
          <Image
            src="/images/gameplay/triviComplete.png"
            alt="Coin"
            width={200}
            height={500}
            className="w-[120px] h-auto"
          />
        </div>
        <p className="text-center text-xl font-medium flex gap-2 items-center">
          <span>{t("score")}</span>
          <span>
            {data?.correct_que}/{data?.total_que}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-bold text-2xl">+ {data?.points}</span>
          <span className="font-medium text-lg">{t("points")}</span>
          {!!!isLogged && (
            <span className="font-medium text-lg">{t("trial-mode")}</span>
          )}
        </p>
        {!!!isLogged && (
          <p className="text-center font-semibold">{t("paragraph")}</p>
        )}

        <p className="text-center text-xl"></p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="btn bg-white hover:bg-white/70 border-2 border-blueA1 text-blueA1"
            onClick={() => router.push("/games")}
          >
            {t("no")}
          </button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn bg-gradient-bluegreenA1 border-2 !font-bold"
            onClick={handlePlayAgain}
          >
            {t("yes")}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
