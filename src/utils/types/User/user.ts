import { ProfileData } from "./profile";

export interface User {
  id: number;
            username: string,
            phone: string,
            country_code: string,
            phone_without_code: string,
            operator: string,
            email: string,
            email_verified_at: string | null,
            invite_code: string,
            invited_by: string | null,
            address: string,
            points: number,
            trivia_points: number,
            prediction_points: number,
            shot_on_net_points: number,
            zee_coins: number,
            joker: number,
            is_subscribed: boolean,
            expired_date_subscription: string,
            is_active: boolean,
            block_type: string | null,
            score_hide: boolean,
            deleted_at: string | null,
            created_at: string,
            updated_at: string
}

export interface UserState {
  user: User | null;
  profile: ProfileData | null;
  accessToken: string | null;
  initialized: boolean;
  setUser: (payload: { user: User; accessToken: string }) => void;
  fetchProfile: () => Promise<void>;
  logOut: () => void;
  setInitialized: () => void;
}