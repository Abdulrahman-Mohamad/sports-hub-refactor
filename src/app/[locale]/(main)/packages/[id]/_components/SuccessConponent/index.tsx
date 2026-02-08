import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import { FaX } from "react-icons/fa6";

export default function PackagesSuccessConponent({
  onClose,
  message,
}: {
  onClose: () => void;
  message?: string;
}) {
  const t = useTranslations("pages.main.packages_id.modals.success");
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <>
      <div className="bg-white rounded-xl py-8 relative flex-center flex-col">
        <div onClick={onClose} className="absolute top-3 end-4 cursor-pointer">
          <FaX className="text-gray-900 hover:text-gray-400 transition-colors duration-300" />
        </div>
        <Image
          src={"/gif/common/success.gif"}
          alt="Success Animation"
          width={1000}
          height={1000}
          className="w-60"
        />
        <p className="text-center text-lg font-medium px-6">
          {message || t("message")}
        </p>
      </div>
    </>
  );
}
