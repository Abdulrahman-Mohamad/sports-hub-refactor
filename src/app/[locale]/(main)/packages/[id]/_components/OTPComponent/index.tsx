// src/app/[locale]/(main)/packages/[id]/_components/OTPComponent/index.tsx

"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useUser } from "@/context/UserContext";
import {
  modalStepType,
  PackagesShowProps,
} from "@/utils/types/Packages/PackagesShow";
import { PromoCodeResponse } from "@/utils/types/Packages/PromoCode";
import { FaX } from "react-icons/fa6";
import { packagesCheckoutFetch } from "@/lib/api/packages/chechout";
import { PackageVerifyPINCodeFetch } from "@/lib/api/packages/verifyPINCode";
import { ImSpinner4 } from "react-icons/im";

interface OtpComponentProps {
  setStep: (step: modalStepType) => void;
  paymentId: number;
  promoResponse?: PromoCodeResponse | null;
  pack: PackagesShowProps["package"];
  onClose: () => void;
}

export default function OtpComponent({
  setStep,
  onClose,
  pack,
  paymentId,
  promoResponse,
}: OtpComponentProps) {
  const t = useTranslations("pages.main.packages_id.modals.otp");
  const { user } = useUser();
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(45);
  const [loading, setLoading] = useState(false);

  const isZain = user?.operator === "zain";
  const otpLength = isZain ? 5 : 4;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleResend = async () => {
    if (isZain) {
      setStep("operator");
      return;
    }

    const channel_id = user?.operator === "stc" ? "144" : "143";

    await packagesCheckoutFetch(
      {
        package_id: pack.id,
        payment_method_id: paymentId,
        promo_code_id: promoResponse?.data?.promo_code?.id || 0,
        channel_id: channel_id,
      },
      {
        onSuccess: () => {
          setTimeLeft(45);
          setOtp("");
        },
        onError: () => {
          setStep("error");
        },
      },
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= otpLength) setOtp(value);
  };

  const handleVerify = async () => {
    if (otp.length !== otpLength) return;

    setLoading(true);
    await PackageVerifyPINCodeFetch(
      { pin_code: otp },
      {
        onSuccess: (res) => {
          setLoading(false);
          if (res?.status) {
            setStep("success");
          } else {
            setStep("error");
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onError: (err) => {
          setLoading(false);
          setStep("error");
        },
      },
    );
  };

  return (
    <div className="bg-white rounded-xl py-8 px-6 relative flex flex-col items-center mx-4">
      <div onClick={onClose} className="absolute top-3 end-4 cursor-pointer">
        <FaX className="text-gray-900 hover:text-gray-400 transition-colors" />
      </div>

      <h2 className="text-2xl font-bold text-gradient-primary mb-4">
        {t("title")}
      </h2>
      <p className="text-gray-600 text-center mb-8 font-medium px-6">
        {isZain ? t("description_zain") : t("description_other")}
      </p>

      <input
        type="text"
        value={otp}
        onChange={handleInputChange}
        placeholder={isZain ? t("placeholder_zain") : t("placeholder_other")}
        className="w-full text-center p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none transition-all font-bold text-xl"
        maxLength={otpLength}
      />

      <div className="mt-6 text-sm text-gray-500 font-medium text-center">
        {t("didnt_receive")}{" "}
        {timeLeft > 0 ? (
          <span className="text-gray-400">
            {t("resend_in", { time: formatTime(timeLeft) })}
          </span>
        ) : (
          <button
            onClick={handleResend}
            className="text-blue-500 font-medium hover:underline cursor-pointer bg-transparent border-none"
          >
            {t("resend_code")}
          </button>
        )}
      </div>

      <button
        onClick={handleVerify}
        disabled={otp.length !== otpLength || loading}
        className={`mt-8 w-full py-3 rounded-xl font-medium text-white transition-all flex items-center justify-center ${
          otp.length === otpLength && !loading
            ? "bg-gradient-primary cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {loading ? <ImSpinner4 size={20} className="animate-spin"/> : t("verify")}
      </button>
    </div>
  );
}
