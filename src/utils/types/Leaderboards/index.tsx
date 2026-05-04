export type LeaderboardType = "all" | "trivia" | "prediction" | "shot_on_net" | "it_complete";

export interface LeaderboardUser {
  id: number;
  username: string;
  points: string;
  ranking: number;
  score_hide: boolean;
  media: string | null;
}
