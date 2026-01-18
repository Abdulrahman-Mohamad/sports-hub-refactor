import { homeFetch } from "@/lib/api/home/HomeFetch";
import HomeHeroSection from "./_sections/HeroSection";
import HomeNewsSection from "./_sections/News";
import HomeUserStatsSection from "./_sections/UserState";
import HomeAllLeaderboardSection from "./_sections/TriviaLeaderboards";
import TowButtonsSection from "./_sections/TowButtons";
import HomeChallengSection from "./_sections/Challenge";
import GamesSections from "@/components/sections/Games";

export default async function HomeContentPage() {
  const { data } = await homeFetch();
  return (
    <div className="min-h-[3000px] ">
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
      <div className="min-h-[1000px]" />
    </div>
  );
}
