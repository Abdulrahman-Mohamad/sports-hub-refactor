import { LeaderboardType } from "@/utils/types/Leaderboards";
import LeaderboardHeroSection from "./_sections/Hero";
import { leaderboardsFetch } from "@/lib/api/leaderboards/LeaderboardsFetch";
import LeaderboardTypeSection from "./_sections/Type";
import LeaderboardPodiumSection from "./_sections/Pedium";
import LeaderboardTableSection from "./_sections/Table";

export default async function LeaderboardsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: LeaderboardType }>;
}) {
  const { type = "all" } = await searchParams;

  const {data} = await leaderboardsFetch(type)

  const topThree = data?.top_ten?.slice(0, 3)||[]
  const others = data?.top_ten?.slice(3)||[]
  const currentUser = data?.user  
  
  return (
    <>
      <LeaderboardHeroSection />

      <LeaderboardTypeSection activeType={type}/>
      {/* <LeaderboardPodiumSection data={topThree}/>
      <LeaderboardTableSection data={others} user={currentUser}/> */}
    </>
  );
}
