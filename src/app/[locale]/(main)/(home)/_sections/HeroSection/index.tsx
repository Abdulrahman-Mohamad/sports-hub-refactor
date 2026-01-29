import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import Image from "next/image";

export default function HomeHeroSection() {
  const t = useTranslations("pages.main.home.hero");
  return (
    <div className="pt-3 px-4 lg:px-8 lg:pt-4">
      <div
        className="relative w-full rounded-xl overflow-hidden h-[500px] flex-center
      sm:h-[550px]
        lg:aspect-[1309/840] lg:h-auto
      "
      >
        <Image
          src="/images/home/hero-bg.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover hidden lg:block"
        />
        <Image
          src="/images/home/hero-mobile-bg.png"
          alt="Hero Background Mobile"
          fill
          priority
          className="object-cover lg:hidden"
        />
        <div className="relative z-10 w-full h-full px-4 flex flex-col justify-center items-center text-white text-center md:mt-10">
          <h1 className="!text-[24px] !font-extrabold hero-shadow-bold leading-8 md:!text-[38px] md:leading-14 xl:!text-[50px] 2xl:!text-[60px]">
            {t("title1")}
          </h1>
          <h1 className="!text-[24px] !font-extrabold hero-shadow-bold leading-8 md:!text-[38px] md:leading-14 xl:!text-[50px] 2xl:!text-[60px]">
            {t("title2")}
          </h1>
          <p className="!text-[20px] !font-medium mt-6 hero-shadow-light leading-6 md:!text-[28px] md:leading-8 2xl:!text-[32px]">
            {t("subtitle1")}
          </p>
          <p className="!text-[20px] !font-medium hero-shadow-light leading-6 md:!text-[28px] md:leading-8 2xl:!text-[32px]">
            {t("subtitle2")}
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-primary px-6 py-3 mt-10 text-white font-semibold rounded-lg cursor-pointer sm:text-lg md:text-2xl lg:px-14 2xl:px-20 2xl:py-4"
          >
            {t("Subscribe")}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
