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
import { notificationsFetch } from "@/lib/api/notifications/index";
import { notificationCountUnreadFetch } from "@/lib/api/notifications/countUnreadNotification";
import { notificationMakeAsReadFetch } from "@/lib/api/notifications/makeAsRead";
import { useUser } from "./UserContext";

export type Notification = {
  id: string;
  data: {
    title: string;
    body: string;
    user_name: string;
  };
  read_at: string | null;
  created_at: string;
};

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  fetchNotifications: (targetPage?: number) => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  setPage: (page: number | ((prev: number) => number)) => void;
  addLocalNotification: (notification: any) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchUnreadCount = useCallback(async () => {
    if (!user) return;
    try {
      const res = await notificationCountUnreadFetch();
      setUnreadCount(res?.data?.count_unread_notifications || 0);
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  }, [user]);

  const fetchNotifications = useCallback(
    async (targetPage: number = 1) => {
      if (!user) return;
      setIsLoading(true);
      try {
        const res = await notificationsFetch(targetPage);
        const newNotifications = res?.data?.data || [];

        if (targetPage === 1) {
          setNotifications(newNotifications);
        } else {
          setNotifications((prev) => [...prev, ...newNotifications]);
        }

        setHasMore(
          newNotifications.length > 0 && targetPage < res?.data?.last_page,
        );
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [user],
  );

  const markAsRead = useCallback(async (id: string) => {
    try {
      await notificationMakeAsReadFetch(id);
      setUnreadCount((prev) => Math.max(0, prev - 1));
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read_at: new Date().toISOString() } : n,
        ),
      );
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  }, []);

  const addLocalNotification = useCallback((newNotif: any) => {
    setNotifications((prev) => [newNotif, ...prev]);
    setUnreadCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      fetchNotifications(1);
    } else {
      setNotifications([]);
      setUnreadCount(0);
      setPage(1);
    }
  }, [user, fetchUnreadCount, fetchNotifications]);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      isLoading,
      hasMore,
      page,
      fetchNotifications,
      fetchUnreadCount,
      markAsRead,
      setPage,
      addLocalNotification,
    }),
    [
      notifications,
      unreadCount,
      isLoading,
      hasMore,
      page,
      fetchNotifications,
      fetchUnreadCount,
      markAsRead,
      addLocalNotification,
    ],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};
