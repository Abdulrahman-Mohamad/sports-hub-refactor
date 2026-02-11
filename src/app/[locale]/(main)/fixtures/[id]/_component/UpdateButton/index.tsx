"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { IoReload } from "react-icons/io5";
import { toast } from "react-toastify";

export default function HighlightUpdateButton() {
  const t = useTranslations("pages.main.highlights");
  const router = useRouter();
  const handleUpdate = () => {
    router.refresh();
    toast.success("Data Has Been Updated");
  };
  return (
    <>
      <button
        type="button"
        onClick={handleUpdate}
        className="p-2 flex items-center gap-2 text-redA1 font-medium cursor-pointer"
      >
        <span>
          <IoReload size={22} className="text-primary" />
        </span>
        <span className="hidden md:block text-primary">{t("update")}</span>
      </button>
    </>
  );
}
