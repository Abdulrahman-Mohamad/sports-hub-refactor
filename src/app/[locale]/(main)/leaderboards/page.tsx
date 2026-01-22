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
      <div className="relative w-full aspect-[1052/2000] flex flex-col justify-end">
        <Image
          src="/images/leaderboard/leaderboard-top-three.png"
          alt="leaderboard-top-three"
          width={1052}
          height={2000}
          className="w-full h-full object-contain object-[bottom_center] absolute inset-0 z-0
          px-16
          "
        />
        <LeaderboardPodiumSection data={topThree} />
        <LeaderboardTableSection data={others} user={currentUser} />
      </div>
    </>
  );
}
