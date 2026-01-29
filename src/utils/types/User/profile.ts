export interface ProfileUser {
  id: number;
  username: string;
  phone: string;
  email: string | null;
  address: string | null;
  operator: string;
  is_subscribed: boolean;
  media?: string;
  invite_code: string;
  points: number;
  zee_coins: number;
  joker: number;
  ranking: string;
  win: number;
  loss: number;
}

export interface activities {
  type: "Open Trivia Game" | "End Trivia Game" | "Start Prediction" | "Win Prediction" | "Loss Prediction" | "Open Shot On Net Game" | "End Shot On Net Game" | "Purchase Package" | "Verify Pin Purchase" | "Update Profile";
  action: string;
  created_at: string;
}

export interface transaction {
  zee_coins: number;
  joker: number;
  type:"welcome coins" | "recharge coins" | "gift coins" | "reward coins" | "purchase coins";
  price: string;
  type_trans: string;
  date_charge: string;
}

export type UnionType = "Open Trivia Game" |"End Trivia Game" | "Start Prediction" | "Win Prediction" | "Loss Prediction"  | "Edit Prediction" 
|"Open Shot On Net Game" | "End Shot On Net Game" | "Purchase Package" | "Verify Pin Purchase" | "Update Profile"
|"welcome coins" | "recharge coins" | "gift coins" | "reward coins" | "purchase coins";

export interface ProfileData {
  user: ProfileUser;
  activities: activities[];
  transaction: transaction[];
}

export interface ProfileResponse {
  code: number;
  status: boolean;
  error: any;
  message: string;
  data: ProfileData;
}