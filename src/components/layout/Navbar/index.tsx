"use client";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Notifications from "../Notifications";
import { useEffect, useState } from "react";

export default function Navbar() {
  const t = useTranslations("navbar");
  const { user } = useUser();

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
              ? "fixed top-0 left-0 right-0 rounded-none py-4 px-10 shadow-md" // شكل الـ Navbar عند التمرير
              : "absolute top-10 left-30 right-30 rounded-lg py-3 px-4" // الشكل الأصلي
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
        <div className="flex justify-between min-w-45  items-center">
          {/* language switcher */}
          <div>
            <LanguageSwitcher />
          </div>

          {user ? (
            <div className="w-full flex items-center justify-between">
              {/* user */}
              <div>{user.username}</div>

              {/* Notifications */}
              <div>
                <Notifications />
              </div>
            </div>
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
