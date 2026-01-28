import Modal from "@/components/ui/Modal";
// import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { FaCopy, FaTimes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

export default function ProfileInviteModal({
  isOpen,
  onClose,
  code,
}: {
  isOpen: boolean;
  onClose: () => void;
  code: string;
}) {
  const t = useTranslations('pages.main.profile.modals.invite_friend');
  const currentUrl = typeof window !== "undefined" && window.location.origin;
  const locale = useLocale();

  const handleCopy = async () => {
    const url = `${currentUrl}/${locale}/register?invited_by=${code}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied To Clipboard");
    } catch (e: any) {
      toast.error("Failed to copy", e.message);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="!max-w-5xl w-full">
      <div className="rounded-xl bg-white space-y-8 py-14 relative">
        <div className="absolute top-4 end-4">
          <button type="button" onClick={onClose}>
            <IoMdClose size={24} className="cursor-pointer text-gray-500 hover:text-gray-700"/>
          </button>
        </div>
        <div className="rounded-t-xl w-full px-2 ">
          <h2 className="font-medium text-center text-gradient-primary">
            {t("title")}
          </h2>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
          <div className="px-6 flex items-stretch ">
            <input
              id="password_confirmation"
              placeholder={t("pages.profile.invite_friend")}
              className="flex-grow w-full border rounded-lg p-3 disabled:bg-gray-300 !rounded-e-none border-e-0"
              value={`${currentUrl}/${locale}/register?invited_by=${code}`}
              disabled
            />
            <button
              type="button"
              className="btn bg-gradient-primary flex-center !rounded-s-none border border-s-0"
              onClick={handleCopy}
            >
              <FaCopy color="white" size={24}/>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
