"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNotifications } from "@/context/NotificationContext";
import { useTranslations } from "next-intl";
import SingleNotification from "../../ui/Notifications/SingleNotification";
import NotificationModal from "../../ui/Notifications/NotificationModal";
import SidebarHeader from "../SidebarHeader";

export default function NotificationsSidebar({
  toggleNotificationsSidebar,
}: {
  toggleNotificationsSidebar: () => void;
}) {
  const t = useTranslations("components.notifications");
  const {
    notifications: allNotifications,
    isLoading,
    hasMore,
    setPage,
    markAsRead,
  } = useNotifications();

  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, setPage],
  );

  const handleClick = (data: any) => {
    setSelected(data);
    setModal(true);
    if (!data.read_at) {
      markAsRead(data.id);
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed inset-0 z-[100] flex justify-end"
    >
      <NotificationModal
        isOpen={modal}
        onClose={() => {
          setSelected(null);
          setModal(false);
        }}
        data={selected}
      />
      {/* Backdrop */}
      <div className="fixed inset-0" />

      {/* Sidebar Content */}
      <div className="relative w-full bg-[#0E0011] h-full flex flex-col shadow-2xl">
        {/* Header */}
        <SidebarHeader toggleSidebar={toggleNotificationsSidebar} />

        <div className="px-4 mt-4">
          <h3 className="text-white">{t("title")}</h3>
        </div>
        {/* List */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
          {allNotifications.length === 0 && !isLoading ? (
            <div className="p-8 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            allNotifications.map((notification, index) => {
              const isLast = index === allNotifications.length - 1;
              return (
                <SingleNotification
                  key={`${notification.id}-${index}`}
                  ref={isLast ? lastElementRef : null}
                  notification={notification}
                  onClick={handleClick}
                  onMarkAsRead={(id) => markAsRead(id)}
                  isMobile={true}
                />
              );
            })
          )}
          {isLoading && (
            <div className="p-4 text-center text-gray-200 italic">
              {t("loading")}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
