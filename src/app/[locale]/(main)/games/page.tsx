import { gamesFetch } from "@/lib/api/games/GamesFetch";
import GamesHeroSection from "./_sections/Hero";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

const HomeChallengSection = dynamic(
  () => import("../(home)/_sections/Challenge"),
);
const GamesSections = dynamic(() => import("@/components/sections/Games"));

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("title")} | ${t("games")}`,
    description: t("description"),
    alternates: {
      canonical: "/games",
    },
  };
}

export default async function GamesPage() {
  const { data } = await gamesFetch();
  return (
    <>
      <GamesHeroSection />
      <HomeChallengSection />
      <GamesSections
        triviaData={data?.trivia_config}
        predictionData={data?.prediction_config}
        shootData={data?.shot_on_net_config}
      />
    </>
  );
}
