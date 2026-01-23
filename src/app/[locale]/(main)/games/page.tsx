import { gamesFetch } from "@/lib/api/games/GamesFetch";
import GamesHeroSection from "./_sections/Hero";
import HomeChallengSection from "../(home)/_sections/Challenge";
import GamesSections from "@/components/sections/Games";

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
