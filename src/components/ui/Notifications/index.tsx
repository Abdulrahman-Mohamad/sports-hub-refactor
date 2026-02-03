"use client";

import React, { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNotifications } from "@/context/NotificationContext";
import { useTranslations } from "next-intl";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationModal from "./NotificationModal";
import SingleNotification from "./SingleNotification";

export default function NotificationDropdown() {
  const t = useTranslations("components.notifications");
  const {
    notifications,
    unreadCount,
    isLoading,
    hasMore,
    setPage,
    markAsRead,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          const first = entries[0];
          if (first.isIntersecting && hasMore && !isLoading) {
            setPage((prev) => prev + 1);
          }
        },
        {
          root: scrollContainerRef.current,
          rootMargin: "100px",
          threshold: 0.1,
        },
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, setPage],
  );

  const handleClick = (data: any) => {
    setSelected(data);
    setModal(true);
    setIsOpen(false);
    if (data.read_at) return;
    markAsRead(data.id);
  };

  return (
    <div className={`relative`} ref={dropdownRef}>
      <NotificationModal
        isOpen={modal}
        onClose={() => {
          setSelected(null);
          setModal(false);
        }}
        data={selected}
      />
      {/* Notification Button */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 hover:text-gray-500 cursor-pointer"
      >
        <IoIosNotificationsOutline size={25} />
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 end-0 border-2 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {/* Dropdown Panel */}
        {isOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            className={`absolute top-[calc(100%+20px)] -end-4 flex flex-col gap-4`}
          >
            <div className={`w-96 bg-white overflow-hidden rounded-xl`}>
              {/* Header */}
              <div className="p-4 border-b-4 border-gray-200">
                <h3 className="text-lg font-medium px-3">{t("title")}</h3>
              </div>

              {/* Notifications List */}
              <div
                className="max-h-96 overflow-y-auto"
                ref={scrollContainerRef}
              >
                {notifications?.map((notification, index: number) => {
                  const isLastElement = index === notifications?.length - 1;
                  return (
                    <SingleNotification
                      ref={isLastElement ? lastElementRef : null}
                      notification={notification}
                      key={`${notification.id} - ${index}`}
                      onClick={handleClick}
                      onMarkAsRead={(id) => markAsRead(id)}
                    />
                  );
                })}
                {isLoading && (
                  <div className="p-4 text-center text-sm italic">
                    {t("loading")}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
