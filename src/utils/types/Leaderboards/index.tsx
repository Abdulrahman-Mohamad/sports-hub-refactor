export type LeaderboardType = "all" | "trivia" | "prediction" | "shot_on_net";

export interface LeaderboardUser {
  id: number;
  username: string;
  points: string;
  ranking: number;
  score_hide: boolean;
  media: string | null;
}
