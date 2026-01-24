import { Prediction } from "./Fixture";

export interface TimeInfo {
  elapsed: number;
  extra: number | null;
}

export interface TeamInfo {
  id: number;
  name: string;
  logo: string;
}

export interface PlayerInfo {
  id: number;
  name: string;
}

export interface AssistInfo {
  id: number | null;
  name: string | null;
}

export type TypeDetails = "Goal" | "Card" | "subst" | "Var";

// specific detail shapes per event type
export type GoalDetails =
  | "Normal Goal"
  | "Own Goal"
  | "Penalty"
  | "Missed Penalty";

export type CardDetails = "Yellow Card" | "Red Card";

export type SubstDetails =
  | "Substitution 1"
  | "Substitution 2"
  | "Substitution 3"
  | "Substitution 4"
  | "Substitution 5";

export type VarDetails = "Goal cancelled" | "Penalty confirmed";

// discriminated event union
export type FixtureEvent =
  | {
      type: Extract<TypeDetails, "Goal">;
      time: TimeInfo;
      team: TeamInfo;
      player: PlayerInfo;
      assist: AssistInfo;
      detail: GoalDetails;
    }
  | {
      type: Extract<TypeDetails, "Card">;
      time: TimeInfo;
      team: TeamInfo;
      player: PlayerInfo;
      assist: AssistInfo;
      detail: CardDetails;
    }
  | {
      type: Extract<TypeDetails, "subst">;
      time: TimeInfo;
      team: TeamInfo;
      player: PlayerInfo;
      assist: AssistInfo;
      detail: SubstDetails;
    }
  | {
      type: Extract<TypeDetails, "Var">;
      time: TimeInfo;
      team: TeamInfo;
      player: PlayerInfo;
      assist: AssistInfo;
      detail: VarDetails;
    };

export interface FixtureOver {
  goals: {
    home: number;
    away: number;
  };
}
// main props using an array of events
export interface HighlightsProps {
  fixture_events: FixtureEvent[];
  fixture: FixtureOver;
  prediction: Prediction;
}
