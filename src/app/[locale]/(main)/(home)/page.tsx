import { homeFetch } from "@/lib/api/home/HomeFetch";
import HomeHeroSection from "./_sections/HeroSection";
import HomeNewsSection from "./_sections/News";
import HomeUserStatsSection from "./_sections/UserState";
import HomeAllLeaderboardSection from "./_sections/TriviaLeaderboards";
import TowButtonsSection from "./_sections/TowButtons";

export default async function HomeContentPage() {
  const {data} = await homeFetch();
  return (
    <div className="min-h-[3000px] ">
      <HomeHeroSection />
      {data?.news && <HomeNewsSection data={data.news} />}
      {data?.user && <HomeUserStatsSection data={data.user} />}
      <TowButtonsSection/>
      {data?.all_leaderboard && <HomeAllLeaderboardSection data={data.all_leaderboard} />}
    </div>
  );
}
