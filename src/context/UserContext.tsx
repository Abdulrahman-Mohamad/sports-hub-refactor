"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";

interface User {
  username: string;
  id: number;
  email: string;
  email_verified_at: string | null;
  remember_token: string | null;
  media: string | null;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  initialized: boolean;
  setUser: (payload: { user: User; accessToken: string }) => void;
  logOut: () => void;
  setInitialized: () => void;
}

const defaultUserState: UserState = {
  user: null,
  accessToken: null,
  initialized: false,
  setUser: () => {},
  logOut: () => {},
  setInitialized: () => {},
};

const UserContext = createContext<UserState>(defaultUserState);

export function UserProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    const token = Cookies.get("access_token");

    if (cookieUser && cookieUser !== "undefined") {
      try {
        setUserState(JSON.parse(cookieUser));
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }

    if (token) {
      setAccessToken(token);
    }

    setInitialized(true);
  }, []);

  const setUser = ({
    user,
    accessToken,
  }: {
    user: User;
    accessToken: string;
  }) => {
    setUserState(user);
    setAccessToken(accessToken);
    setInitialized(true);
    Cookies.set("user", JSON.stringify(user), {
      expires: 365,
      secure: true,
      sameSite: "Lax",
    });
    Cookies.set("access_token", accessToken, {
      expires: 365,
      secure: true,
      sameSite: "Lax",
    });
  };

  const logOut = () => {
    setUserState(null);
    setAccessToken(null);
    setInitialized(false);
    Cookies.remove("user");
    Cookies.remove("access_token");
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const value: UserState = {
    user,
    accessToken,
    initialized,
    setUser,
    logOut,
    setInitialized: () => setInitialized(true),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
