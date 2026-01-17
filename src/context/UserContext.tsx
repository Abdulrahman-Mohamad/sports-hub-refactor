"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import { User, UserState } from "@/utils/types/User/user";
import { ProfileData, ProfileResponse } from "@/utils/types/User/profile";
import { profileFetch } from "@/lib/api/profile/profileFetch";

const defaultUserState: UserState = {
  user: null,
  profile: null,
  accessToken: null,
  initialized: false,
  setUser: () => {},
  fetchProfile: async () => {},
  logOut: () => {},
  setInitialized: () => {},
};

const UserContext = createContext<UserState>(defaultUserState);

export function UserProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  const fetchProfile = useCallback(async () => {
    await profileFetch({
      onSuccess: (res: ProfileResponse) => {
        if (res.status) {
          setProfile(res.data);
          Cookies.set("userProfile", JSON.stringify(res.data), {
            expires: 365,
            secure: true,
            sameSite: "Lax",
          });
        }
      },
      onError: (err) => console.error("Profile fetch error:", err),
    });
  }, []);

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    const cookiesProfile = Cookies.get("userProfile");
    const token = Cookies.get("access_token");

    if (cookieUser && cookieUser !== "undefined") {
      try {
        setUserState(JSON.parse(cookieUser));
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }

    if (cookiesProfile && cookiesProfile !== "undefined") {
      try {
        setProfile(JSON.parse(cookiesProfile));
      } catch (error) {
        console.error("Failed to parse profile cookie:", error);
      }
    }

    if (token) {
      setAccessToken(token);
      fetchProfile();
    }

    setInitialized(true);
  }, [fetchProfile]);

  const setUser = useCallback(
    ({ user, accessToken }: { user: User; accessToken: string }) => {
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
      fetchProfile();
    },
    [fetchProfile],
  );

  const logOut = useCallback(() => {
    setUserState(null);
    setProfile(null);
    setAccessToken(null);
    setInitialized(false);
    Cookies.remove("user");
    Cookies.remove("access_token");
    Cookies.remove("userProfile");
    if (typeof window !== "undefined") {
      window.location.reload(); // solve after impelementation of auth
    }
  }, []);

  const value: UserState = useMemo(
    () => ({
      user,
      profile,
      accessToken,
      initialized,
      setUser,
      fetchProfile,
      logOut,
      setInitialized: () => setInitialized(true),
    }),
    [user, profile, accessToken, initialized, fetchProfile, setUser, logOut],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
