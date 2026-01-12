"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const t = useTranslations("navbar");
  return (
    <>
      <nav className="fixed top-10 right-16 left-16 z-50 flex items-center justify-between bg-white rounded-lg py-3 px-4">
        {/* Left */}
        <div className="flex items-center gap-6">
          {/* logo */}
          <div className="flex items-center">
            <Image
              className="w-52 translate-y-0.5"
              src={t("logo")}
              alt="SPORTS HUB"
              width={1100}
              height={22}
              quality={100}
            />
          </div>
          {/* Links */}
          <ul className="flex items-center gap-4 container">
            <li>
              <Link
                href={"/"}
                className="text- hover:text-purble transition-colors duration-300"
              >
                {t("links.home")}
              </Link>
            </li>
            <li>
              <Link
                href={"/packages"}
                className="text- hover:text-purble transition-colors duration-300"
              >
                {t("links.packages")}
              </Link>
            </li>
            <li>
              <Link
                href={"/leaderboards"}
                className="text- hover:text-purble transition-colors duration-300"
              >
                {t("links.leaderboards")}
              </Link>
            </li>
            <li>
              <Link
                href={"/games"}
                className="text- hover:text-purble transition-colors duration-300"
              >
                {t("links.games")}
              </Link>
            </li>
            <li>
              <Link
                href={"/history"}
                className="text- hover:text-purble transition-colors duration-300"
              >
                {t("links.history")}
              </Link>
            </li>
          </ul>
        </div>

        {/* right */}
        <div></div>
      </nav>
    </>
  );
}
