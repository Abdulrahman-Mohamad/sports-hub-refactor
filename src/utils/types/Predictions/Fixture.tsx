import { FixtureOver, HighlightsProps } from "./Highlights";

export interface FixtureProps {
  id: number | string;
  short_status: string;
  long_status: string;
  long_status_trans: string;
  fixture_date: string;
  fixture_time: string;
  fixture_day: string;
  last_mins_for_prediction: number;
  check_mins_for_prediction: boolean;
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
  };
  check_prediction: boolean;
  prediction: {
    home_score: number;
    away_score: number;
  } | null; // You can replace 'any' with a specific type if you know its structure
}

export interface FixturesPageData {
  predictions: FixtureProps[];
  highlights: HighlightsProps[];
  overs: FixtureOver[];
}
