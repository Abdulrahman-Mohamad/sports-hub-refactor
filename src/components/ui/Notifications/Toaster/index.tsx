"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { usePusher } from "@/hooks/usePusher";
import { FaX } from "react-icons/fa6";
import { useTranslations } from "next-intl";

type Message = {
  user_name: string;
  title: string;
  body: string;
};

export default function NotificationToaster() {
  const [notification, setNotification] = useState<Message | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { user } = useUser();
  const t = useTranslations("components.notifications.toaster");

  usePusher("my-channel", user?.id ? `notify-user-${user.id}` : "", (data) => {
    const notificationData = data.data.data;
    setNotification(notificationData);
    console.log("Data received from Pusher:", notificationData);
  });

  useEffect(() => {
    if (notification && !isPaused) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setNotification(null);
            return 100;
          }
          return prev + 1; // 1% increase every 50ms = 100% in 5s
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [notification, isPaused]);

  useEffect(() => {
    if (notification) {
      setProgress(0);
      setIsPaused(false);
    }
  }, [notification]);

  return (
    <>
      <AnimatePresence>
        {notification &&
          (() => {
            const { user_name, title, body } = notification;
            return (
              <motion.button
                key="notification-toaster"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                dir="ltr"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="fixed top-5 right-5 z-[999] bg-[#0E0011] border-2 border-primary rounded-xl shadow-2xl  flex flex-col gap-2 overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer w-80 p-4 
                sm:w-100 sm:p-6
                lg:w-120 lg:p-8 lg:border-3
                "
              >
                {/* Header */}
                <div className="flex items-center justify-between w-full border-b border-white/10 pb-2 mb-1 lg:mb-2 lg:pb-3">
                  <span className="text-xs font-bold text-white tracking-wider uppercase sm:text-sm">
                    {t("title")}
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setNotification(null);
                    }}
                    className="text-white hover:text-gray-300"
                  >
                    <FaX />
                  </span>
                </div>

                {/* Content */}
                <div className="w-full flex items-center gap-3 pb-2">
                  {/* Image Circle */}
                  <div className="w-14 h-14 rounded-full border-2 border-white/70 p-1 flex-shrink-0 bg-darkGunmetal flex items-center justify-center overflow-hidden">
                    <Image
                      width={40}
                      height={40}
                      quality={100}
                      alt="Notification Logo"
                      className="object-contain"
                      src={t("logo")}
                    />
                  </div>

                  {/* Text Group */}
                  <div className="flex flex-col text-start overflow-hidden">
                    <span
                      className="text-white font-bold text-sm truncate uppercase tracking-tight
                    sm:text-base
                    "
                    >
                      {user_name}
                    </span>
                    <p
                      className="text-white/80 text-xs line-clamp-2 font-light leading-snug
                    sm:text-sm
                    "
                    >
                      {title}
                    </p>
                    <p
                      className="text-white text-sm
                    sm:text-base
                    "
                    >
                      {body}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-white/10">
                  <div
                    className="h-full bg-gradient-primary-r"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.button>
            );
          })()}
      </AnimatePresence>
    </>
  );
}
