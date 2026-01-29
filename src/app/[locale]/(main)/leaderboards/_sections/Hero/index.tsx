import { useTranslations } from "next-intl";
import Image from "next/image";

export default function LeaderboardHeroSection() {
  const t = useTranslations();
  return (
    <>
      <div className="pt-5 px-4 sm:px-6 sm:pt-7 lg:px-8 lg:pt-4 z-10 relative">
        <div className="relative w-full min-h-[550px] rounded-2xl flex-center flex-col lg:aspect-[1303/861] overflow-hidden">
          <Image
            src="/images/leaderboard/leaderboard-bg.png"
            alt="Leaderboard Hero Background"
            fill
            priority
            className="object-cover hidden lg:block"
          />
          <Image
            src="/images/leaderboard/leaderboard-bg-mobile.png"
            alt="Leaderboard Hero Background Mobile"
            fill
            priority
            className="object-cover lg:hidden"
          />
          <div className="relative z-10 flex flex-col items-center justify-center xl:pb-30 2xl:pb-40">
            <h1 className="text-white !text-[40px] !font-extrabold hero-shadow-bold md:!text-[80px] 2xl:!text-[120px]">
              {t("pages.main.leaderboard.hero.title")}
            </h1>
            <p className="text-white text-center font-bold px-6 mt-6 text-lg hero-shadow-light md:w-3/4 md:text-2xl 2xl:text-3xl">
              {t("pages.main.leaderboard.hero.description")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
