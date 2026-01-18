import Image from "next/image";
import React from "react";
// import useGamesCheckCoins from "@/lib/tanstack/Games/useCheckCoins";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { checkCoinFetch } from "@/lib/api/modals/checkCoinFetch";

export default function JoinGameModal({
  zee_coins,
  game_url,
  type,
  onClose,
  setStep,
  predictionId,
}: {
  zee_coins: string | number;
  game_url?: string;
  type: "trivia" | "prediction" | "shot_on_net";
  onClose: () => void;
  setStep: (step: "check" | "insufficient") => any;
  predictionId?: string | number | null;
}) {
  const t = useTranslations("components.ui.single_game.join");
  const locale = useLocale();
  const {accessToken} = useUser()
  const router = useRouter();
  const pathname = usePathname();

  const onSuccess = (data: any) => {
    const response = data;
    console.log(response);
    
    if (response?.status) {
      if (type === "shot_on_net")
      window.location.href = `${game_url}?lang=${locale}&token=${accessToken}`;
      if (type === "trivia") {
        if (pathname !== `/trivia`) return router.push("/trivia");
        router.refresh(); 
      }
      if (type === "prediction") {
        router.push(`/prediction-game?id=${predictionId}`);
      }
    }
  };
    const onError = (e: any) => {
    if (e.status === 411) {
      onClose();
      return;
    }

    toast.error(e?.message || t("error_occurred"));
    setStep("insufficient");
  };

  const handleCheck = async () => {
    await checkCoinFetch(type, { onSuccess, onError });
  };

  return (
    <>
      <div className=" bg-white rounded-2xl">
        <div className="w-full px-8 md:px-20 py-6">
          <h2 className="text-gradient-primary font-medium text-center text-2xl  md:text-3xl ">
            {t("join_game_for", { coins: zee_coins })}
          </h2>
        </div>
        <div className="px-12 py-8 flex flex-col gap-4 items-center max-w-2xl mx-auto ">
          <div>
            <Image
              src="/images/models/join.png"
              alt="Coin"
              width={200}
              height={200}
              className="aspect-square w-[100px] md:w-[150px]"
              unoptimized
            />
          </div>
          <p className="text-center text-sm md:text-base  w-full md:w-3/4 mx-auto my-10">
            {t("coins_deducted_message", {
              coins: zee_coins,
            })}
          </p>
          <div className="grid grid-cols-2 gap-4 w-full md:w-3/4 text-nowrap">
            <button
              className="btn border-gradient-primary text-gradient-primary !rounded-full "
              onClick={onClose}
            >
              {t("no_thanks")}
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="btn bg-gradient-primary !font-bold text-white !rounded-full"
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
