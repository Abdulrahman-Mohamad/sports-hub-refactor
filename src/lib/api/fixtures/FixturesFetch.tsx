import { apiFetch } from "../apiFetch";

export const fixturesFetch = async (leagueId: string = "all") => {
  try {
    const res = await apiFetch(`/fixtures${leagueId ? `?league_id=${leagueId}` : ""}`, {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Fixtures fetch error:", error);
    return null;
  }
};