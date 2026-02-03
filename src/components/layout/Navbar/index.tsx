"use client";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import { FaBars, FaUser } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import NotificationDropdown from "@/components/ui/Notifications";
import { IoIosNotificationsOutline } from "react-icons/io";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("../Sidebar"), { ssr: false });
const UserSidebar = dynamic(() => import("../UserSidebar"), { ssr: false });
const NotificationsSidebar = dynamic<{
  toggleNotificationsSidebar: () => void;
}>(() => import("../NotificationsSidebar"), { ssr: false });

import { useNotifications } from "@/context/NotificationContext";

export default function Navbar({
  pointsComponent,
}: {
  pointsComponent?: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsSidebarOpen, setIsNotificationsSidebarOpen] = useState(false);

  const t = useTranslations("navbar");
  const { user, profile, logOut, fetchProfile } = useUser();
  const { unreadCount } = useNotifications();
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleNotificationsSidebar = ()=>{
    setIsNotificationsSidebarOpen(!isNotificationsSidebarOpen);
  }

  useEffect(() => {
    if (user && !profile) {
      fetchProfile();
    }
  }, [user, profile, fetchProfile]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {/* points Section in desktop */}
      {user && pathname === "/" && (
        <div
          className={` w-fit z-50 transition-all duration-300 hidden lg:block
      ${
        isScrolled
          ? "fixed top-14 start-0"
          : "absolute top-24 left-30  right-30"
      }`}
        >
          {pointsComponent}
        </div>
      )}

      {/* desktop */}
      <nav
        className={`hidden lg:flex z-50 items-center justify-between bg-white transition-all duration-300 max-h-12 
          ${
            isScrolled
              ? "fixed top-0 left-0 right-0 rounded-none py-4 px-10 shadow-md"
              : "absolute top-10 left-30 right-30 rounded-lg py-3 px-4"
          }`}
      >
        {/* Left */}
        <div className="flex items-center gap-6 xl:gap-10">
          {/* logo */}
          <Link href={"/"} className="flex items-center">
            <Image
              className="w-44 translate-y-0.5 rtl:w-36"
              src={t("logo")}
              alt="SPORTS HUB"
              width={200}
              height={40}
              priority
              quality={90}
            />
          </Link>

          {/* Links */}
          <ul className="flex items-center gap-4 xl:gap-8">
            <li>
              <Link
                href={"/"}
                className={`hover:text-primary transition-colors duration-300
                  ${isActive("/") ? "text-primary" : ""}
                  `}
              >
                {t("links.home")}
              </Link>
            </li>
            <li>
              <Link
                href={"/packages"}
                className={`hover:text-primary transition-colors duration-300
                  ${isActive("/packages") ? "text-primary" : ""}
                  `}
              >
                {t("links.packages")}
              </Link>
            </li>
            <li>
              <Link
                href={"/leaderboards"}
                className={`hover:text-primary transition-colors duration-300
                  ${isActive("/leaderboards") ? "text-primary" : ""}
                  `}
              >
                {t("links.leaderboards")}
              </Link>
            </li>
            <li>
              <Link
                href={"/games"}
                className={`hover:text-primary transition-colors duration-300
                  ${isActive("/games") ? "text-primary" : ""}
                  `}
              >
                {t("links.games")}
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  href={"/history"}
                  className={`hover:text-primary transition-colors duration-300
                  ${isActive("/history") ? "text-primary" : ""}
                  `}
                >
                  {t("links.history")}
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* right */}
        <div className="flex justify-between min-w-48 xl:min-w-60 items-center">
          {/* language switcher */}
          <div>
            <LanguageSwitcher />
          </div>

          {user ? (
            <>
              <Dropdown
                icon={
                  <span
                    className={`rounded-full w-8 h-8 flex justify-center items-center ${!profile?.user.media && "border"}`}
                  >
                    <Image
                      src={
                        profile?.user.media || "/images/common/default-user.png"
                      }
                      alt={`${profile?.user.username} Image` || "User Image"}
                      width={40}
                      height={40}
                      quality={80}
                      className={`rounded-full  object-cover object-center
                        ${!profile?.user.media ? "p-1.5":"size-8"}
                        `}
                    />
                  </span>
                }
                label={
                  <div className="text-start hidden md:block font-medium truncate">
                    <span>{profile?.user.username}</span>
                  </div>
                }
              >
                <Link
                  className="flex items-center gap-4 text-start px-8 hover:cursor-pointer hover:bg-gray-200 py-4 w-full"
                  href={`/profile`}
                >
                  <span>
                    <FaUser size={18} />
                  </span>
                  <span className="text-sm text-nowrap font-semibold">
                    {t("links.profile")}
                  </span>
                </Link>
                <button
                  className="flex items-center text-primaryA1 text-start gap-4 px-8  hover:cursor-pointer hover:bg-gray-200 py-4 w-full"
                  onClick={() => logOut()}
                >
                  <span>
                    {/* <IoMdLogOut size={22} /> */}
                    <Image
                      src="/images/auth/logout.svg"
                      alt="logout"
                      width={16}
                      height={16}
                    />
                  </span>
                  <span className="text-sm text-nowrap font-semibold">
                    {t("links.logout")}
                  </span>
                </button>
              </Dropdown>
              <div>
                <NotificationDropdown />
              </div>
            </>
          ) : (
            <div>
              <Link
                href={"/login"}
                className={`flex items-center gap-2 hover:text-primary transition-colors duration-300
                  ${isActive("/login") ? "text-primary" : ""}
                  `}
              >
                {t("links.login")}
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* mobile */}
      <div className="lg:hidden fixed z-20 top-10 start-8">
        <div className="flex items-center gap-2 md:gap-5">
          {/* bar button */}
          <div
            onClick={toggleSidebar}
            className="bg-white/70 w-8 h-8 md:w-12 md:h-12 flex-center p-2 rounded-full cursor-pointer"
          >
            <FaBars className="text-lg md:text-2xl" color="#13355C" />
          </div>
          {/* use button */}
          <div
            onClick={user ? toggleUserMenu : () => router.push("/login")}
            className={`w-8 h-8 md:w-12 md:h-12 flex-center bg-white/70 rounded-full border border-white cursor-pointer ${user ? "" : "p-1.5"}`}
          >
            {profile?.user.media ? (
              <Image
                src={profile?.user.media || "/images/common/default-user.png"}
                alt={`${profile?.user.username} Image` || "User Image"}
                width={50}
                height={50}
                quality={80}
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <FaUser size={18} color="#13355C" />
            )}
          </div>
          {user && (
            <div
              onClick={toggleNotificationsSidebar}
              className="w-8 h-8 md:w-12 md:h-12 flex-center bg-white/70 rounded-full border border-white cursor-pointer relative"
            >
              <IoIosNotificationsOutline size={22} color="#13355C" />
              {unreadCount > 0 && (
                <span className="absolute top-0 end-0 bg-red-500 text-white text-[8px] font-bold rounded-full h-4 w-4 flex-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </div>
          )}
          {/* points */}
          {user && pathname === "/" && <div>{pointsComponent}</div>}
        </div>
        <AnimatePresence>
          {isSidebarOpen && (
            <Sidebar key="main-sidebar" toggleSidebar={toggleSidebar} />
          )}
          {isUserMenuOpen && (
            <UserSidebar key="user-sidebar" toggleUserMenu={toggleUserMenu} />
          )}
          {isNotificationsSidebarOpen && (
            <NotificationsSidebar
              key="notifications-sidebar"
              toggleNotificationsSidebar={toggleNotificationsSidebar}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
