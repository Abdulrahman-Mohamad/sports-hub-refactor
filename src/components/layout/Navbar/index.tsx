"use client";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Notifications from "../Notifications";

export default function Navbar() {
  const t = useTranslations("navbar");
  const { user } = useUser();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="hidden lg:flex fixed top-10 right-30 left-30 z-50 items-center justify-between bg-white rounded-lg py-3 px-4 max-h-12 ">
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
