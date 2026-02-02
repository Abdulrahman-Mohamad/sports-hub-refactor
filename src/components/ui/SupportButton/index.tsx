"use client";
import { useUser } from "@/context/UserContext";
import { usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePusher } from "@/hooks/usePusher";

export default function SupportButton() {
  const { user } = useUser();
  const pathname = usePathname();
  const [latestMessage, setLatestMessage] = useState<string | null>(null);

  usePusher("my-channel", `support-message-${user?.id}`, (data) => {
    console.log("Pusher Full Data:", data);
    if (pathname !== "/support") {
      const msg =
        typeof data === "string" ? data : data?.message || data?.data?.message;
      if (msg) setLatestMessage(msg);
    }
  });

  useEffect(() => {
    if (latestMessage) {
      const timer = setTimeout(() => setLatestMessage(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [latestMessage]);

  if (!!!user || pathname === "/support") return null;

  return (
    <div className="fixed left-8 bottom-10 z-[999] flex items-center gap-4 ltr">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 1 }}
        className={`rounded-full size-18 lg:size-24 bg-white shadow-lg text-white border-2 flex items-center justify-center flex-shrink-0`}
      >
        <Link
          href={`/support`}
          className="flex items-center gap-3"
          onClick={() => setLatestMessage(null)}
        >
          <Image
            src={"/images/common/support.png"}
            alt="Support Icon"
            width={1000}
            height={1000}
            quality={90}
            className="w-14 lg:w-20"
          />
        </Link>
      </motion.div>

      <AnimatePresence>
        {latestMessage && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            className="relative bg-white text-black px-5 py-3 rounded-2xl shadow-2xl border border-gray-100 min-w-[150px] max-w-[250px] lg:max-w-[300px]"
          >
            <p className="text-sm lg:text-base font-bold text-center whitespace-pre-wrap">
              {latestMessage}
            </p>
            <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-white border-b-[10px] border-b-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
