import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GamesInsufficientModal({
  onClose,
  setStep,
}: {
  onClose: () => void;
  setStep: (step: "check" | "insufficient") => any;
}) {
  const t = useTranslations('components.ui.InsufficientModal');
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
      <div className="bg-white rounded-xl">
        <div className="w-full px-8 md:px-20 py-6">
          <h3 className="text-gradient-primary !font-semibold text-center !text-2xl md:!text-3xl">
            {t("title")}
          </h3>
        </div>
        <div className="px-12 py-8 flex flex-col gap-4 items-center max-w-2xl mx-auto ">
          <div>
            <Image
              src={'/images/common/sad-face.png'}
              alt="Coin"
              width={200}
              height={200}
              className="aspect-square w-[100px] md:w-[150px]"
              unoptimized
            />
          </div>
          <p className="text-center text-sm md:text-base lg:text-lg font-semibold w-3/4 mx-auto my-10">
            {t("description")}
          </p>
          <div className="grid grid-cols-2 gap-4 w-full md:w-3/4">
            <button
              className="btn bg-white border-2 border-gradient-primary text-gradient-primary !rounded-full hover:bg-white/80 "
              onClick={handleClose}
            >
              {t("no_thanks")}
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="btn bg-gradient-primary text-white !font-bold !rounded-full"
              onClick={() => router.push("/packages")}
            >
              {t("yes")}
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
