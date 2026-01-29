import { LeaderboardType } from "@/utils/types/Leaderboards";
import LeaderboardHeroSection from "./_sections/Hero";
import { leaderboardsFetch } from "@/lib/api/leaderboards/LeaderboardsFetch";
import Image from "next/image";
import TypeSection from "@/components/sections/Type";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

const LeaderboardPodiumSection = dynamic(() => import("./_sections/Pedium"));
const LeaderboardTableSection = dynamic(() => import("./_sections/Table"));

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("title")} | ${t("leaderboards")}`,
    description: t("description"),
    alternates: {
      canonical: "/leaderboards",
    },
  };
}

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
      <TypeSection activeType={type} />
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
