import Image from "next/image";
import SidebarHeader from "../SidebarHeader";
import * as motion from "motion/react-client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function UserSidebar({
  toggleUserMenu,
}: {
  toggleUserMenu: () => void;
}) {
  const t = useTranslations("navbar");
  const { profile, logOut } = useUser();
  return (
    <>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-[#0E0011] text-white"
      >
        {/* Header */}
        <SidebarHeader toggleSidebar={toggleUserMenu} />

        {/* user Data */}
        <div className="flex flex-col items-center gap-4 px-6 py-14">
          <div className="rounded-full w-36 h-36 flex justify-center items-center border-2">
            <Image
              src={profile?.user.media || "/images/common/default-user.png"}
              alt="User Image"
              width={1000}
              height={1000}
              className="rounded-full w-full h-full"
            />
          </div>
          <span className="font-medium mt-4 text-2xl">
            {profile?.user.username}
          </span>
        </div>

        {/* Break Line */}
        <div className="h-0.25 w-[90%] bg-gradient-primary mx-auto" />

        {/* Profile & Logout Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 px-22 pt-8">
          <Link 
          onClick={toggleUserMenu}
          href="/profile"
          className="w-full text-center font-medium bg-white/10 border border-white/20 py-3 rounded"
          >
            {t("links.profile")}
            </Link>
          <button 
          onClick={logOut}
          className="w-full text-center font-medium bg-white/10 border border-white/20 py-3 rounded"
          >
            {t("links.logout")}
            </button>
        </div>
      </motion.div>
    </>
  );
}
