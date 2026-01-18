import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as motion from "motion/react-client"

export default function HomeChallengSection() {
  const t = useTranslations("pages.main.home.challenge");
  return (
    <div className="mt-10 lg:mt-16 overflow-hidden">
      <div
        className="relative p-5 flex flex-col justify-evenly items-center gap-2 bg-[url('/images/home/challeng-bg.png')] bg-[center_top] bg-cover text-white text-center
      md:gap-6
      xl:py-20
      2xl:py-36
      "
      >
        {/* Animated Arros */}
        <div className="absolute top-5 -left-9 
        md:-left-20 md:top-8
        lg:-left-30 lg:top-12
        ">
          <Image 
          src={'/gif/common/arrow-wide.gif'} 
          alt="Animated Arrows" 
          width={1000} 
          height={1000} 
          className="w-22 md:w-50 lg:w-70 opacity-30 rotate-90"/>
        </div>
        <div className="absolute bottom-5 -right-9 
        md:-right-20 md:bottom-8
        lg:-right-30 lg:bottom-12
        ">
          <Image 
          src={'/gif/common/arrow-wide.gif'} 
          alt="Animated Arrows" 
          width={1000} 
          height={1000} 
          className="w-22 md:w-50 lg:w-70 opacity-30 -rotate-90"/>
        </div>

        {/* Vs Image */}
        <Image
          src="/images/home/vs.png"
          alt="VS"
          width={1000}
          height={1000}
          className="w-14 md:w-18 lg:w-33 lg:mb-6"
        />

        {/* Gifs */}
        <div className="w-3/4 mx-auto rtl:w-1/2 lg:mb-10">
          <Image
            src={t("gif")}
            alt="Real Challenge Start Here"
            width={1000}
            height={1000}
          />
        </div>

        <p
          className="text-sm font-medium 
        md:text-lg
        lg:text-xl
        xl:text-2xl
        "
        >
          {t("description")}
        </p>

        <Link href={"/fixtures"}>
          <motion.button
          whileHover={{scale:1.1}}
          whileTap={{scale:0.9}}
            className="bg-gradient-primary px-4 py-1 rounded-full text-sm cursor-pointer
        md:px-12 md:py-2.5 md:text-base md:mt-6
        lg:px-16 lg:py-3 lg:text-lg lg:mb-4
        xl:px-20 xl:py-4 xl:text-xl
        2xl:px-24 2xl:py-5 2xl:text-2xl
        "
          >
            {t("play_now")}
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
