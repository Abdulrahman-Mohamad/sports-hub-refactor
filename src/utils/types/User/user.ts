import { ProfileData } from "./profile";

export interface User {
  username: string;
  id: number;
  email: string;
  email_verified_at: string | null;
  remember_token: string | null;
  media: string | null;
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