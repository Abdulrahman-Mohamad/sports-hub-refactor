"use client";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Notifications from "../Notifications";
import { useEffect, useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const t = useTranslations("navbar");
  const { user, profile, logOut } = useUser();

  console.log(profile?.user.username);

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const [isScrolled, setIsScrolled] = useState(false);

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
              width={1100}
              height={22}
              quality={100}
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
                  <span className="rounded-full w-8 h-8 flex justify-center items-center">
                    <Image
                      src={
                        profile?.user.media || "/images/common/default-user.png"
                      }
                      alt={`${profile?.user.username} Image` || "User Image"}
                      width={40}
                      height={40}
                      className="rounded-full w-8 h-8"
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
                <Notifications />
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
    </>
  );
}
