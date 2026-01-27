import Modal from "@/components/ui/Modal";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations();
  const currentUrl = typeof window !== "undefined" && window.location.origin;
  const locale = useLocale();
  /* console.log(currentUrl); */

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
      <div className="bg-darkMain rounded-xl border-worm glow-worm w-full px-2 py-10">
        <h2 className="text-white font-medium text-center">
          {t("pages.profile.invite_friend")}
        </h2>
        <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto py-4">
          <div className="px-6 py-4 flex gap-4 items-center ">
            <input
              id="password_confirmation"
              placeholder={t("pages.profile.invite_friend")}
              className="flex-grow w-full border rounded-lg p-3 disabled:bg-neutral1/10 text-center"
              value={`${currentUrl}/${locale}/register?invited_by=${code}`}
              readOnly
            />
          </div>

          <div className="flex items-center justify-center flex-wrap gap-4 mt-6 w-full sm:px-4 md:w-3/4 mx-auto lg:w-1/2">
            <button
              className="btn bg-white hover:bg-white/70 text-redA1 border border-redA1 w-[calc(50%-16px)]"
              onClick={onClose}
            >
              {t("common.back")}
            </button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn bg-gradient-wormA1 text-white font-bold border !px-10 w-[calc(50%-16px)]"
              type="button"
              onClick={handleCopy}
            >
              {t('pages.profile.copy')}
            </motion.button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
