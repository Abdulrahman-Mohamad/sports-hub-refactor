import React, { useCallback, useRef, useState } from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
import NotificationModal from "./NotificationModal";
import SingleNotification from "./SingleNotification";
import { AnimatePresence, motion } from "framer-motion";
import useNotificationsIndex from "@/lib/tanstack/Notifications/useIndex";
import useNotificationsShowCount from "@/lib/tanstack/Notifications/useShowCount";
import useNotificationRead from "@/lib/tanstack/Notifications/useRead";
import ErrorBoundary from "@/hooks/ErrorBoundary";
import { useTranslations, useLocale } from "next-intl";

export default function NotificationDropdown({
  className = "",
  animationType = "vertical",
}: {
  className?: string;
  animationType?: "vertical" | "horizontal";
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);
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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...methods } =
    useNotificationsIndex();
  // Flatten the posts from all pages
  const allNotifications = data?.pages?.flatMap(
    (page) => page?.data?.data?.data || []
  );

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (methods.isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          const first = entries[0];

          // ✅ Add more specific conditions to prevent unwanted triggers
          if (
            first.isIntersecting &&
            hasNextPage &&
            !isFetchingNextPage &&
            !methods.isLoading
          ) {
            fetchNextPage();
          }
        },
        {
          root: scrollContainerRef.current,
          rootMargin: "100px", // ✅ Trigger when user scrolls near the top
          threshold: 0.1,
        }
      );

      if (node) observer.current.observe(node);
    },
    [methods.isLoading, fetchNextPage, hasNextPage, isFetchingNextPage]
  ); // ✅ Added missing dependencies

  const { data: countData, ...CountMethods } = useNotificationsShowCount();
  const count = countData?.data?.data?.count_unread_notifications;

  const read = useNotificationRead({});
  const makeRead = async (id: string) => {
    read.mutate(id);
  };
  const handleClick = (data: any) => {
    setSelected(data);
    setModal(true);
    setIsOpen(false);
    if (data.read_at) return;
    makeRead(data.id);
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
        className="
            relative p-2 text-white hover:text-gray-200 hover:cursor-pointer hidden lg:block
            rounded-lg "
      >
        <Bell size={25} />
        {/* Notification Badge */}
        <span className="absolute top-0 end-0 border-2 border-black bg-gradient-wormA1 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      </button>
      <AnimatePresence>
        {/* Dropdown Panel */}
        {isOpen && (
          <motion.div
            initial={
              animationType === "horizontal"
                ? { x: locale === "en" ? "100%" : "-100%", opacity: 0 }
                : { y: "-100%", opacity: 0 }
            }
            animate={
              animationType === "horizontal"
                ? { x: 0, opacity: 1 }
                : { y: 0, opacity: 1 }
            }
            exit={
              animationType === "horizontal"
                ? { x: locale === "en" ? "100%" : "-100%", opacity: 0 }
                : { y: "-100%", opacity: 0 }
            }
            className={`absolute -end-5 flex flex-col gap-4
              ${
                animationType === "vertical"
                  ? "top-[calc(100%-5px)] z-[-1]"
                  : "mt-6 z-50"
              }`}
          >
            <div
              className={`w-96 bg-darkMain2 shadow-xl border-[3px] border-gray-300 overflow-hidden pt-10 glow-blue-green-notification
                ${className}
                ${
                  animationType === "vertical"
                    ? "rounded-xl rounded-t-none border-t-0"
                    : "rounded-xl"
                }`}
            >
              {/* Header */}
              <div className="p-4  border-gray-100">
                <h3 className="text-lg font-medium text-white  px-3">
                  {t("notifications.title")}
                </h3>
              </div>

              {/* Notifications List */}
              <ErrorBoundary {...methods}>
                <div className="max-h-96 overflow-y-auto">
                  {allNotifications?.map((notification, index: number) => {
                    const isLastElement =
                      index === allNotifications?.length - 1;
                    return (
                      <SingleNotification
                        ref={isLastElement ? lastElementRef : null}
                        notification={notification}
                        key={`${notification.id} - ${index}`}
                        onClick={handleClick}
                      />
                    );
                  })}
                </div>
              </ErrorBoundary>
            </div>

            {/* Gif below the dropdown */}
            <div className="w-full -mt-[22px] flex justify-center">
              <Image
                src="/gif/notification/controller.png"
                alt="External Footer Image"
                width={100}
                height={100}
                className=""
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* IntersectionObserver */
