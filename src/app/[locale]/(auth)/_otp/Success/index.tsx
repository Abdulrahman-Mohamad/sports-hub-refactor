import Image from "next/image";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useApp } from "@/context/AppContext";
import { useTranslations } from "next-intl";

export default function SuccessStep({ message }: { message: string }) {
  const { closeOTP } = useApp();
  const t = useTranslations("pages.auth.otp");

  const handleClose = () => {
    closeOTP();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      closeOTP();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [closeOTP]);

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col items-center min-w-[80%] md:min-w-[60%] p-6">
      <div className="relative w-full">
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-0 end-0 cursor-pointer"
        >
          <IoClose size={30} className="text-gray-400 hover:text-gray-600" />
        </button>
      </div>
      <div className="flex-center flex-col w-full">
        <div className="mb-6">
          <Image
            src="/gif/common/success.gif"
            alt="Success"
            width={1000}
            height={1000}
            className="w-60"
          />
        </div>
        <h3 className="text-center text-xl font-bold text-gray-800">
          {message || t("success_message")}
        </h3>
      </div>
    </div>
  );
}
