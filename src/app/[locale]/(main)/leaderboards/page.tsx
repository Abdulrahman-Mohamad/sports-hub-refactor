import { LeaderboardType } from "@/utils/types/Leaderboards";
import LeaderboardHeroSection from "./_sections/Hero";
import { leaderboardsFetch } from "@/lib/api/leaderboards/LeaderboardsFetch";
import LeaderboardTypeSection from "./_sections/Type";
import LeaderboardPodiumSection from "./_sections/Pedium";
import LeaderboardTableSection from "./_sections/Table";
import Image from "next/image";

export default async function LeaderboardsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: LeaderboardType }>;
}) {
  const { type = "all" } = await searchParams;

  const res = await leaderboardsFetch(type);
  const data = res?.data;

  const topThree = data?.top_ten?.slice(0, 3) || [];
  const others = data?.top_ten?.slice(3) || [];
  const currentUser = data?.user;

  return (
    <>
      <LeaderboardHeroSection />
      <LeaderboardTypeSection activeType={type} />
      <div className="relative w-full flex flex-col mt-10 md:mt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/leaderboard/leaderboard-top-three.png"
            alt="leaderboard-top-three"
            fill
            className="object-fill object-bottom !px-8 md:!px-18"
            priority
          />
        </div>
        <div className="relative z-10 w-full">
          <LeaderboardPodiumSection data={topThree} />
          <LeaderboardTableSection data={others} user={currentUser} />
        </div>
      </div>
    </>
  );
}
