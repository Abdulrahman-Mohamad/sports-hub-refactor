"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useApp } from "@/context/AppContext";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { openOTP } = useApp();

  useEffect(() => {
    const handleApiError = (event: Event) => {
      const error = (event as CustomEvent).detail;

      if (error.status === 401) {
        Cookies.remove("user");
        Cookies.remove("access_token");
        Cookies.remove("userProfile");
        router.push("/login");
      }

      if (error.status === 411) {
        openOTP();
      }
    };

    window.addEventListener("api-error", handleApiError);

    return () => {
      window.removeEventListener("api-error", handleApiError);
    };
  }, [router, openOTP]);

  return <>{children}</>;
}
