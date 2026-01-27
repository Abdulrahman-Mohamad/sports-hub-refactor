import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarHeader from "../SidebarHeader";
import { useUser } from "@/context/UserContext";

export default function Sidebar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const {user} = useUser();
  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-[#0E0011]"
      >
        {/* Header */}
        <SidebarHeader toggleSidebar={toggleSidebar} />
        {/* Language Switcher & Notifications */}
        <div className="p-6">
          <LanguageSwitcher align="start" animationType="horizontal" />
        </div>

        {/* Links */}
        <div>
          {/* Links */}
          <ul className="flex flex-col text-white px-6 gap-4 xl:gap-8">
            <li>
              <Link
                href={"/"}
                onClick={toggleSidebar}
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
                onClick={toggleSidebar}
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
                onClick={toggleSidebar}
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
                onClick={toggleSidebar}
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
                  onClick={toggleSidebar}
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
      </motion.div>
    </>
  );
}
