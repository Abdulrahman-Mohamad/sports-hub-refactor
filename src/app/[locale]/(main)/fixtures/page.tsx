import { fixturesFetch } from "@/lib/api/fixtures/FixturesFetch";
import FixturesHeroSection from "./_sections/Hero";
import { HelpDataFetch } from "@/lib/api/fixtures/HelpDataFetch";
import LeagueFilter from "./_sections/Filter";
import PredictSection from "@/components/sections/Predict";
import { FixturesShowConfigFetch } from "@/lib/api/fixtures/ShowConfigFetch";
import MatchHighlightsSection from "./_sections/MatchHighlights";

export default async function FixturesPage({
  searchParams,
}: {
  searchParams: Promise<{ league_id?: string }>;
}) {
  const { league_id = "all" } = await searchParams;

  const [fixturesRes, leaguesRes, showConfigRes] = await Promise.all([
    fixturesFetch(league_id),
    HelpDataFetch(),
    FixturesShowConfigFetch(),
  ]);

  const fixturesData = fixturesRes?.data;
  const leagues = leaguesRes?.data || [];
  const showConfig = showConfigRes?.data || {};
  
  return (
    <>
      <FixturesHeroSection />
      <LeagueFilter activeLeague={league_id} leagues={leagues} />
      <PredictSection data={fixturesData.predictions} config={showConfig} />
      <MatchHighlightsSection data={fixturesData.match_highlights}/>
    </>
  );
}
