import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

type props = {
  ref: any;
  notification: Notification;
  onClick: any;
  onMarkAsRead?: (id: string) => void;
};
type Notification = {
  id: string;
  data: {
    title: string;
    body: string;
    user_name: string;
  };
  read_at: string;
  created_at: string;
};
export default function SingleNotification({
  ref,
  notification,
  onClick,
  onMarkAsRead,
}: props) {
  const t = useTranslations("components.notifications.toaster");
  return (
    <div
      onClick={() => onClick(notification)}
      ref={ref}
      key={notification.id}
      className="p-4 hover:bg-blue-100 cursor-pointer transition-colors duration-150"
    >
      <div className="flex items-center gap-2 space-x-3">
        {/* Avatar */}
        <div
          className={`rounded-full w-14 h-14 flex items-center justify-center border`}
        >
          <Image alt="Logo" src={t("logo")} width={40} height={40} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-[700] truncate">
              {notification.data.title}
            </h4>
          </div>

          <p className="text-xs font-[300] line-clamp-2">
            {notification.data.body}
          </p>

          <span className="text-xs font-[700]">{notification.created_at}</span>
        </div>

        {/* Status Indicator (Far Right) */}
        <div
          className="flex-shrink-0 flex items-center justify-center ms-2 z-10"
          onClick={(e) => {
            if (!notification.read_at && onMarkAsRead) {
              e.stopPropagation();
              onMarkAsRead(notification.id);
            }
          }}
        >
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              !notification.read_at
                ? "bg-gradient-primary cursor-pointer"
                : "bg-gray-300"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
