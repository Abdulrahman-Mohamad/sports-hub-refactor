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
  type: string;
  action: string;
  created_at: string;
}

export interface transaction {
  zee_coins: number;
  joker: number;
  type: string;
  price: string;
  type_trans: string;
  date_charge: string;
}

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