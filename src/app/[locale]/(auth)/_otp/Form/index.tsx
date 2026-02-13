"use client";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { resendOTPFetch } from "@/lib/api/auth/resendOTPFetch";
import { verifyOTPFetch } from "@/lib/api/auth/verifyOTPFetch";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { ImSpinner4 } from "react-icons/im";

export default function FormStep({
  setStep,
  preventInitialResend,
  setSuccessMessage,
  setErrorMessage,
}: {
  setStep: (step: string) => any;
  preventInitialResend: boolean;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}) {
  const t = useTranslations("pages.auth.otp");
  const { user } = useUser();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState<number>(45);

  const isZain = user?.operator === "zain";
  const otpLength = isZain ? 5 : 4;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= otpLength) {
      setOtp(value);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== otpLength) return;
    setLoading(true);
    await verifyOTPFetch(
      { otp },
      {
        onSuccess: (res) => {
          setLoading(false);
          setSuccessMessage(res?.message);
          setStep("success");
        },
        onError: (error) => {
          setLoading(false);
          setErrorMessage(error?.message);
          setStep("error");
        },
      },
    );
  };

  const handleManualResend = () => {
    if (cooldown > 0) return;
    if (isZain) {
      setStep("operator");
    } else {
      triggerResend();
    }
  };

  const triggerResend = useCallback(
    async (clickId?: string) => {
      const getChannelId = () => {
        switch (user?.operator) {
          case "zain":
            return "143";
          case "stc":
            return "144";
          case "batelco":
            return "133";
          default:
            return "133";
        }
      };

      const channel_id = getChannelId();
      await resendOTPFetch(
        { click_id: clickId, channel_id },
        {
          onSuccess: (res) => {
            if (res?.data?.url && typeof res.data.url === "string") {
              window.location.href = res.data.url;
              return;
            }
            setCooldown(45);
            setOtp("");
            toast.success(res?.message);
          },
          onError: (error) => {
            toast.error(error?.message);
          },
        },
      );
    },
    [user?.operator],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (preventInitialResend || isZain) return;
    triggerResend();
  }, [preventInitialResend, isZain, triggerResend]);

  return (
    <form
      onSubmit={handleVerify}
      className="bg-white rounded-3xl flex flex-col w-[90%] max-w-2xl p-6 md:p-12 space-y-6 shadow-2xl"
    >
      {/* Top Section */}
      <div className="w-full text-center space-y-4">
        <h2 className="text-gradient-primary text-3xl md:text-5xl font-bold">
          {t("title")}
        </h2>
        <p className="text-gray-600 text-sm md:text-xl font-medium">
          {t("description", { otpLength })}
        </p>
      </div>

      {/* Body Section */}
      <div className="flex flex-col space-y-8">
        <div className="w-full max-w-md mx-auto">
          <input
            type="text"
            value={otp}
            onChange={handleInputChange}
            placeholder={t("placeholders", { otpLength })}
            maxLength={otpLength}
            className="w-full text-center p-4 border-2 border-gray-200 rounded-xl focus:border-primary outline-none transition-all font-bold text-xl"
          />
        </div>

        {/* Resend Logic Text */}
        <div className="text-center text-xs md:text-sm text-gray-500 font-medium">
          {t("didnt_receive")}{" "}
          {cooldown > 0 ? (
            <span className="text-gray-400">
              {t("resend_in", { time: formatTime(cooldown) })}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleManualResend}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              {t("resend_code")}
            </button>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full max-w-xs mx-auto pt-4">
          <motion.button
            whileHover={{
              scale: otp.length === otpLength && !loading ? 1.1 : 1,
            }}
            whileTap={{ scale: otp.length === otpLength && !loading ? 0.9 : 1 }}
            type="submit"
            disabled={otp.length !== otpLength || loading}
            className={`w-full py-4 rounded-xl text-white text-xl font-bold ${
              otp.length !== otpLength || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-primary-r cursor-pointer"
            }`}
          >
            {loading ? (
              <ImSpinner4 className="animate-spin mx-auto" />
            ) : (
              t("verify")
            )}
          </motion.button>
        </div>
      </div>
    </form>
  );
}
