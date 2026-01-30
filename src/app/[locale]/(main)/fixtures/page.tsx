import { fixturesFetch } from "@/lib/api/fixtures/FixturesFetch";
import FixturesHeroSection from "./_sections/Hero";
import { HelpDataFetch } from "@/lib/api/fixtures/HelpDataFetch";
import LeagueFilter from "./_sections/Filter";
import PredictSection from "@/components/sections/Predict";
import { FixturesShowConfigFetch } from "@/lib/api/fixtures/ShowConfigFetch";
import MatchHighlightsSection from "./_sections/MatchHighlights";
import MatchOverSection from "./_sections/MatchOver";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

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
      <div className="overflow-x-clip relative">
        <FixturesHeroSection />
      <LeagueFilter activeLeague={league_id} leagues={leagues} />
        <Suspense fallback={<Spinner />}>
      {fixturesData.predictions.length > 0 && <PredictSection data={fixturesData.predictions} config={showConfig} />}
      {fixturesData.match_highlights.length > 0 && <MatchHighlightsSection data={fixturesData.match_highlights}/>}
      {fixturesData.match_over.length > 0 && <MatchOverSection data={fixturesData.match_over}/>}
      </Suspense>
      </div>
    </>
  );
}
