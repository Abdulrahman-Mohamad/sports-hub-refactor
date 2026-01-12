"use client";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const t = useTranslations("navbar");
  return (
    <>
      <nav className="fixed top-10 right-16 left-16 z-50 flex items-center justify-between bg-white rounded-lg py-3 px-4 max-h-12">
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
                className="hover:text-primary transition-colors duration-300"
              >
                {t("links.home")}
              </Link>
            </li>
            <li>
              <Link
                href={"/packages"}
                className="hover:text-primary transition-colors duration-300"
              >
                {t("links.packages")}
              </Link>
            </li>
            <li>
              <Link
                href={"/leaderboards"}
                className="hover:text-primary transition-colors duration-300"
              >
                {t("links.leaderboards")}
              </Link>
            </li>
            <li>
              <Link
                href={"/games"}
                className="hover:text-primary transition-colors duration-300"
              >
                {t("links.games")}
              </Link>
            </li>
            <li>
              <Link
                href={"/history"}
                className="hover:text-primary transition-colors duration-300"
              >
                {t("links.history")}
              </Link>
            </li>
          </ul>
        </div>

        {/* right */}
        <div className="flex justify-end items-center">
          {/* language switcher */}
          <div>
            <LanguageSwitcher />
          </div>

          {/* user */}
          <div></div>

          {/* Notifications */}
          <div></div>
        </div>
      </nav>
    </>
  );
}
