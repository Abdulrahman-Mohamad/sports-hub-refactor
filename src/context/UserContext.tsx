"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

interface User {
  name: string;
  id: number;
  email: string;
  email_verified_at: string | null;
  remember_token: string | null;
  media: string | null;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  initialized: boolean;
  setUser: (payload: { user: User; token: string }) => void;
  logOut: () => void;
  setInitialized: () => void;
}

const defaultUserState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  initialized: false,
  setUser: () => {},
  logOut: () => {},
  setInitialized: () => {},
};

const UserContext = createContext<UserState>(defaultUserState);

export function UserProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(() => {
    const cookieUser = Cookies.get("user");
    return cookieUser ? JSON.parse(cookieUser) : null;
  });

  const [initialized, setInitialized] = useState<boolean>(() => !!user);

  const setUser = ({ user, token }: { user: User; token: string }) => {
    setUserState(user);
    setAccessToken(token);
    setInitialized(true);
    Cookies.set("user", JSON.stringify(user));
  };

  const logOut = () => {
    setUserState(null);
    setAccessToken(null);
    setRefreshToken(null);
    setInitialized(false);
    Cookies.remove("user");
    window.location.reload();
  };

  const value: UserState = {
    user,
    accessToken,
    refreshToken,
    initialized,
    setUser,
    logOut,
    setInitialized: () => setInitialized(true),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
