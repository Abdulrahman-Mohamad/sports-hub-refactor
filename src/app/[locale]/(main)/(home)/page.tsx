import { homeFetch } from "@/lib/api/home/HomeFetch";
import HomeHeroSection from "./_sections/HeroSection";
import HomeUserStatsSection from "./_sections/UserState";
import HomeAllLeaderboardSection from "./_sections/TriviaLeaderboards";
import TowButtonsSection from "./_sections/TowButtons";
import HomeChallengSection from "./_sections/Challenge";
import dynamic from "next/dynamic";

const GamesSections = dynamic(() => import("@/components/sections/Games"));
const HomeChampionsSection = dynamic(() => import("./_sections/Champions"));
const PredictSection = dynamic(() => import("@/components/sections/Predict"));
const MainPackagesSection = dynamic(
  () => import("@/components/sections/MainPackages"),
);
const HomeNewsSection = dynamic(() => import("./_sections/News"));

export default async function HomeContentPage() {
  const { data } = await homeFetch();
  return (
    <div className=" ">
      <HomeHeroSection />

      {data?.news && <HomeNewsSection data={data.news} />}
      {data?.user && <HomeUserStatsSection data={data.user} />}
      <TowButtonsSection />
      {data?.all_leaderboard && (
        <HomeAllLeaderboardSection data={data.all_leaderboard} />
      )}
      <HomeChallengSection />
      <GamesSections
        triviaData={data?.trivia_config}
        predictionData={data?.prediction_config}
        shootData={data?.shot_on_net_config}
      />

      <HomeChampionsSection
        trivia={data?.trivia_champions}
        prediction={data?.prediction_champions}
        shoot={data?.shot_on_net_champions}
      />

      {data?.predictions && (
        <PredictSection
          data={data?.predictions}
          config={data?.prediction_config}
        />
      )}

      {data?.packages && <MainPackagesSection data={data.packages} />}
    </div>
  );
}
