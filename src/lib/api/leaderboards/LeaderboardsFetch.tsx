import { LeaderboardType } from "@/utils/types/Leaderboards";
import { apiFetch } from "../apiFetch";



export const leaderboardsFetch = async (type: LeaderboardType = "all") => {
  try {
    const res = await apiFetch(`/leader-board?type=${type}`, {
      method: "GET",
      cache:"force-cache"
    });
    
    return res;
  } catch (error) {
    console.error("Leaderboards fetch error:", error);
    return null;
  }
};