'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations('components.layout.footer');
  const pathname = usePathname();
  const {user}= useUser();

  return (
    <footer className="text-white mt-44 md:mt-52 lg:mt-64 z-20 relative">
      <div className="w-full h-4 bg-gradient-primary relative">
      <Image 
      src={'/images/footer/ball.png'} 
      alt="ball" 
      width={1000} 
      height={1000} 
      className="absolute bottom-0 left-6 w-26
      md:w-36
      lg:w-44
      "/>

      </div>
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* first column : logo */}
          <div className="flex flex-col justify-end h-full">
              <h3 className="text-lg font-bold uppercase mt-8">
                {t("play_connect_conquer")}
              </h3>
          </div>

          {/* fourth column : follow us */}
          <div className="grid md:grid-cols-2 gap-8 font-medium text-lg">
            <div className="flex flex-col gap-4">
              <Link
                href={`/`}
                className={`text-neutral10 hover:font-black transition-all duration-200 ${
                  pathname === `/` &&
                  "font-black text-primary2"
                }`}
              >
                {t("home")}
              </Link>
              <Link
                href={`/packages`}
                className={`text-neutral10 hover:font-black transition-all duration-200 ${
                  pathname.includes("/packages") &&
                  " font-black text-primary2"
                }`}
              >
                {t("packages")}
              </Link>
              <Link
                href={`/leaderboards`}
                className={`text-neutral10 hover:font-black transition-all duration-200 ${
                  pathname.includes("/leaderboards") &&
                  " font-black text-primary2"
                }`}
              >
                {t("leaderboards")}
              </Link>
              <Link
                href={`/games`}
                className={`text-neutral10 hover:font-black transition-all duration-200 ${
                  pathname.includes("/games") &&
                  " font-black text-primary2"
                }`}
              >
                {t("games")}
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {user && (
                <Link
                  href={`/history`}
                  className={`text-neutral10 hover:font-black transition-all duration-200 ${
                    pathname.includes("/history") &&
                    " font-black text-primary2"
                  }`}
                >
                  {t("history")}
                </Link>
              )}
              <Link
                href={`/terms`}
                className={`text-neutral10 hover:font-black transition-all duration-200 ${
                  pathname.includes("/terms") &&
                  " font-black text-primary2"
                }`}
              >
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
        {/* under footer copy rights */}
        {/* <div className="mt-8 text-center text-white">
            <p>&copy; {new Date().getFullYear()} OCTAR SCHOOL. All rights reserved.</p>
          </div> */}
      </div>
    </footer>
  );
}
