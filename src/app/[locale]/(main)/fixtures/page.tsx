import { fixturesFetch } from "@/lib/api/fixtures/FixturesFetch";
import FixturesHeroSection from "./_sections/Hero";
import { HelpDataFetch } from "@/lib/api/fixtures/HelpDataFetch";
import LeagueFilter from "./_sections/Filter";

export default async function FixturesPage({
  searchParams,
}: {
  searchParams: Promise<{ league_id?: string }>;
}) {
  const { league_id = "all" } = await searchParams;

  const [fixturesRes, leaguesRes] = await Promise.all([
    fixturesFetch(league_id),
    HelpDataFetch(),
  ]);

  const fixturesData = fixturesRes?.data;
  const leagues = leaguesRes?.data || [];

  return (
    <>
      <FixturesHeroSection />
      <LeagueFilter activeLeague={league_id} leagues={leagues}/>
    </>
  );
}
