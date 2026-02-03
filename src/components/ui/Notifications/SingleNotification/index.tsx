import Image from "next/image";
import React from "react";

type props = {
  ref: any;
  notification: Notification;
  onClick: any;
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
}: props) {
  return (
    <div
      onClick={() => onClick(notification)}
      ref={ref}
      key={notification.id}
      className="p-4 hover:bg-darkGunmetal hover:cursor-pointer transition-colors duration-150"
    >
      <div className="flex items-center gap-2 space-x-3">
        {/* Avatar */}
        <div
          className={` text-white rounded-full w-14 h-14 flex items-center justify-center text-sm font-medium flex-shrink-0 border`}
        >
          <Image
            alt="Logo"
            src="/images/logo/logo.png"
            width={40}
            height={40}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-[700] text-white truncate">
              {notification.data.title}
            </h4>
            {/* Status Indicator */}
            {!notification.read_at && (
              <div className="w-2 h-2 bg-primaryA1 rounded-full flex-shrink-0 ml-2"></div>
            )}
          </div>

          <p className="text-xs text-white font-[300] line-clamp-2">
            {notification.data.body}
          </p>

          <span className="text-xs text-white font-[700]">
            {notification.created_at}
          </span>
        </div>
      </div>
    </div>
  );
}
