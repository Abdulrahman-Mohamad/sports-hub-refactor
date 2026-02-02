import { AllLeaderboards } from "@/utils/types/Home/AllLeaderboards";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HomeAllLeaderboardSection({
  data,
}: {
  data: AllLeaderboards[];
}) {
  const t = useTranslations("pages.main.home.all_leaderboard");
  return (
    <div className="py-20 mt-10 px-4 lg:px-8 flex flex-col items-center justify-center gap-8 bg-[url('/images/home/top-player-bg.png')] bg-cover bg-center text-white ">
      <h2 className="!font-bold lg:!text-4xl md:mb-2 xl:mb-6">{t("title")}</h2>
      <div className="container space-y-6 select-none">
        {/* first */}
        <div className="border-gradient-primary bg-black py-4 xl:py-6 px-6 xl:px-10 max-w-5xl mx-auto rounded-xl lg:rounded-2xl flex items-center justify-between gap-4 lg:gap-6 hover:shadow-xl hover:shadow-[#FFCA11] hover:scale-105 transition-all duration-300">
          <Image src="/images/home/top-player-1.png" alt="First Player" width={1000} height={1000} className="w-8 lg:w-14"/>
            <p className="text-xl font-semibold flex-grow lg:text-3xl">{data[0].username}</p>
            <div className={`flex items-center gap-2 ${data[0].score_hide ? "blur-sm" : ""}`}>
              
              <p>{!data[0].score_hide ? data[0].points:"Nice Try"}</p>
              <span className="text-sm">{t("points")}</span>
            </div>
        </div>
        {/* Second */}
        <div className="border-gradient-primary bg-black py-4 xl:py-6 px-6 xl:px-10 max-w-5xl mx-auto rounded-xl lg:rounded-2xl flex items-center justify-between gap-4 lg:gap-6 hover:shadow-xl hover:shadow-[#AEEEFA] hover:scale-105 transition-all duration-300">
          <Image src="/images/home/top-player-2.png" alt="First Player" width={1000} height={1000} className="w-8 lg:w-14"/>
            <p className="text-xl font-semibold flex-grow lg:text-3xl">{data[1].username}</p>
            <div className={`flex items-center gap-2 ${data[1].score_hide ? "blur-sm" : ""}`}>
              <p>{!data[1].score_hide ? data[1].points:"Nice Try"}</p>
              <span className="text-sm">{t("points")}</span>
            </div>
        </div>
        {/* Third */}
        <div className="border-gradient-primary bg-black py-4 xl:py-6 px-6 xl:px-10 max-w-5xl mx-auto rounded-xl lg:rounded-2xl flex items-center justify-between gap-4 lg:gap-6 hover:shadow-xl hover:shadow-[#DE5C21] hover:scale-105 transition-all duration-300">
          <Image src="/images/home/top-player-3.png" alt="First Player" width={1000} height={1000} className="w-8 lg:w-14"/>
            <p className="text-xl font-semibold flex-grow lg:text-3xl">{data[2].username}</p>
            <div className={`flex items-center gap-2 ${data[2].score_hide ? "blur-sm" : ""}`}>
              <p>{!data[2].score_hide ? data[2].points:"Nice Try"}</p>
              <span className="text-sm">{t("points")}</span>
            </div>
        </div>
      </div>
    </div>
  );
}
