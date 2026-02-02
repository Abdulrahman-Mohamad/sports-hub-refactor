"use client";
import { useUser } from "@/context/UserContext";
import { usePathname } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SupportButton() {
  const locale = useLocale();
  const { user } = useUser();
  const pathname = usePathname();
  const t = useTranslations("pages.support");
  if (!!!user || pathname === "/support") return null;
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 1 }}
      className={`fixed left-8 bottom-10 z-[100] rounded-full size-18 lg:size-24 bg-white shadow-lg text-white border-2 flex-center`}
    >
      <Link href={`/${locale}/support`} className="flex items-center gap-3">
        <Image
          src={"/images/common/support.png"}
          alt="Support Icon"
          width={1000}
          height={1000}
          quality={90}
          className="w-14 lg:w-20"
        />
      </Link>
    </motion.div>
  );
}
