import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
export default function HomeHeroSection() {
  const t = useTranslations("pages.main.home.hero");
  return (
    <div className="pt-3 px-4 lg:px-8 lg:pt-4">
      <div className="relative w-full aspect-[1309/840] rounded-xl overflow-hidden bg-[url('/images/home/hero-bg.png')] bg-cover bg-center">
        <div className="w-full h-full flex flex-col justify-center items-center text-white  xl:-mt-10 2xl:-mt-20">
          <h1 className="mb-2 !text-[3.5vw] hero-text-shadow">{t("title1")}</h1>
          <h1 className="mb-2 lg:mb-10 !text-[3.5vw] hero-text-shadow">
            {t("title2")}
          </h1>
          <p className="lg:mb-2 !text-[2vw] font-medium hero-text-shadow">
            {t("subtitle1")}
          </p>
          <p className="!text-[2vw] font-medium hero-text-shadow">
            {t("subtitle2")}
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-4 md:mt-8 text-xs md:text-lg md:px-6 md:py-2 px-4 py-1.5 lg:mt-10 xl:mt-16 bg-gradient-primary lg:px-12 lg:py-4 rounded lg:rounded-xl lg:text-3xl font-medium cursor-pointer"
          >
            {t("Subscribe")}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
