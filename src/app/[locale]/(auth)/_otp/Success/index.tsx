import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useApp } from "@/context/AppContext";
import { useTranslations } from "next-intl";

export default function SuccessStep() {
  const { closeOTP } = useApp();
  const t = useTranslations();

  const handleClose = () => {
    closeOTP();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col items-center min-w-[80%] md:min-w-[60%] p-6">
      <div className="flex justify-end w-full">
        <button onClick={handleClose} type="button">
          <IoClose size={30} className="text-gray-400 hover:text-gray-600" />
        </button>
      </div>
      <div className="w-48 h-48 relative mb-6">
        <Image
          src="/gif/common/success.gif"
          alt="Success"
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-center text-xl font-bold text-gray-800">
        {t("pages.auth.otp.success_verified")}
      </h3>
    </div>
  );
}
