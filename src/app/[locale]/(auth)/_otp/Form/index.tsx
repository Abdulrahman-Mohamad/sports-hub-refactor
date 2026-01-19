"use client";
import Input from "@/components/form/Input";
import { OTPProps, OTPSchema } from "@/utils/schemas/Auth/OTP";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useApp } from "@/context/AppContext";
import { resendOTPFetch } from "@/lib/api/auth/resendOTPFetch";
import { verifyOTPFetch } from "@/lib/api/auth/verifyOTPFetch";
import { motion } from "framer-motion";

export default function FormStep({
  setStep,
}: {
  setStep: (step: string) => any;
}) {
  const t = useTranslations("pages.auth.otp");
  const {} = useApp();

  // cooldown state (seconds) - Start with 45 to show timer immediately
  const [cooldown, setCooldown] = useState<number>(45);

  // Helper to format seconds to 00:00
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const onResendSuccess = useCallback(
    (res: any) => {
      console.log("OTP Resend Success:", res);
      setCooldown(45); // Restart timer
      toast.success(res?.message || t("success_message"));
    },
    [t],
  );

  const onResendError = useCallback(
    (error: any) => {
      console.error("OTP Resend Error:", error);
      toast.error(error?.message || t("common.error_occurred"));
    },
    [t],
  );

  // Core resend logic
  const triggerResend = useCallback(async () => {
    await resendOTPFetch({
      onSuccess: onResendSuccess,
      onError: onResendError,
    });
  }, [onResendSuccess, onResendError]);

  // Manual click handler
  const handleManualResend = useCallback(() => {
    setCooldown(45);
    if (cooldown > 0) return;
    triggerResend();
  }, [cooldown, triggerResend]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<OTPProps>({
    resolver: zodResolver(OTPSchema(t)),
    mode: "onChange",
  });

  const onVerifySuccess = useCallback(() => {
    setStep("success");
  }, [setStep]);

  const onVerifyError = useCallback(
    (error: any) => {
      console.error("Verify OTP Error:", error);
      toast.error(error?.message || t("common.error_occurred"));
    },
    [t],
  );

  const onSubmit = async (data: OTPProps) => {
    await verifyOTPFetch(data, {
      onSuccess: onVerifySuccess,
      onError: onVerifyError,
    });
  };

  // Timer Logic - Persistent interval for maximum reliability
  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initial trigger on mount - Only once
  const isInitialSent = useRef(false);
  useEffect(() => {
    if (!isInitialSent.current) {
      isInitialSent.current = true;
      triggerResend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl flex flex-col w-[90%] max-w-2xl p-6 md:p-12 space-y-6 shadow-2xl"
    >
      {/* Top Section */}
      <div className="w-full text-center space-y-4">
        <h2 className="text-gradient-primary text-3xl md:text-5xl font-bold">
          {t("title")}
        </h2>
        <p className="text-gray-600 text-sm md:text-xl font-medium">
          {t("description", { digit: 4 })}
        </p>
      </div>

      {/* Body Section */}
      <div className="flex flex-col space-y-8">
        <div className="w-full max-w-md mx-auto">
          <Input
            id="otp"
            placeholder={t("placeholders", { digit: 4 })}
            register={register}
            errors={errors}
            className="!text-center !text-xl !py-4 !rounded-xl border-gray-200"
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
          whileHover={{scale: isValid ? 1.1 : 1}}
          whileTap={{scale: isValid ? 0.9 : 1}}
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 rounded-xl text-white text-xl font-bold ${
              !isValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-primary-r cursor-pointer"
            }`}
            
          >
            {t("verify")}
          </motion.button>
        </div>
      </div>
    </form>
  );
}
