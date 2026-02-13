"use client";

import { useApp } from "@/context/AppContext";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

export default function AddPicturePage() {
  const { user } = useUser();
  const { openOTP } = useApp();

  useEffect(() => {
    if (user && !user?.is_subscribed) {
      openOTP();
    }
  }, [user, openOTP]);
  return (
    <>
      <div className="flex justify-center items-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-white uppercase tracking-widest">
          Add Picture Page
        </h1>
      </div>
    </>
  );
}
