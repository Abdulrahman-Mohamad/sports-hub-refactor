"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function HighlightBackButton() {
  const t = useTranslations("pages.main.highlights");
  const router = useRouter();
  return (
    <>
      <button
        type="button"
        onClick={() => router.back()}
        className="p-2 flex items-center gap-2 font-medium cursor-pointer"
      >
        <IoIosArrowBack size={22} className="text-primary"/>
        <span className="hidden md:block text-primary">
          {t("back")}
        </span>
      </button>
    </>
  );
}
