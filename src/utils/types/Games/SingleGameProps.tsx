export type SingleGameProps = {
  img: string;
  logo: string;
  logo_className?: string;
  title: string;
  description: string;
  rules: string;
  zee_coins: number;
  game_url?: string;
  type: "trivia" | "prediction" | "shot_on_net";
};
