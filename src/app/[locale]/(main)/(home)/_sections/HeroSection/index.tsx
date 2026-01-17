import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
export default function HomeHeroSection() {
  const t = useTranslations("pages.main.home.hero");
  return (
    <div className="pt-3 px-4 lg:px-8 lg:pt-4">
      <div
        className="relative w-full  rounded-xl overflow-hidden bg-cover bg-center bg-[url('/images/home/hero-mobile-bg.png')] h-[500px] flex-center
      sm:h-[550px]
        lg:aspect-[1309/840] lg:bg-[url('/images/home/hero-bg.png')] lg:h-auto
      "
      >
        <div className="w-full h-full px-4  flex flex-col justify-center items-center text-white text-center
        md:mt-10 
        ">
          <h1 className="!text-[24px]  !font-extrabold hero-shadow-bold leading-8
          md:!text-[38px] md:leading-14
          xl:!text-[50px]
          2xl:!text-[60px]
          ">{t("title1")}</h1>
          <h1 className="!text-[24px]  !font-extrabold hero-shadow-bold leading-8
          md:!text-[38px] md:leading-14
          xl:!text-[50px]
          2xl:!text-[60px]
          ">
            {t("title2")}
          </h1>
          <h1 className="!text-[20px] !font-medium mt-6 hero-shadow-light leading-6
          md:!text-[28px] md:leading-8
          2xl:!text-[32px]
          ">{t("subtitle1")}
          </h1>
          <h1 className="!text-[20px] !font-medium hero-shadow-light leading-6 
          md:!text-[28px] md:leading-8
          2xl:!text-[32px]
          ">{t("subtitle2")}
          </h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-primary px-6 py-3 mt-10 text-white font-semibold rounded-lg cursor-pointer
            sm:text-lg
            md:text-2xl
            lg:px-14
            2xl:px-20 2xl:py-4
            "
          >
            {t("Subscribe")}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
