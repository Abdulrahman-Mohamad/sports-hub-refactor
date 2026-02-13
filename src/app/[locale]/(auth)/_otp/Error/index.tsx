import Image from "next/image";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function ErrorStep({
  message,
  setStep,
}: {
  message: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useTranslations("pages.auth.otp");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStep("form");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [setStep]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg flex flex-col items-center min-w-[80%] md:min-w-[60%] p-6">
        <div className="flex-center flex-col w-full">
          <div className="mb-6">
            <Image
              src="/gif/common/error.gif"
              alt="Error"
              width={1000}
              height={1000}
              className="w-60"
            />
          </div>
          <h3 className="text-center text-xl font-bold text-gray-800">
            {message || t("error_message")}
          </h3>
        </div>
      </div>
    </>
  );
}
