"use client";
import Input from "@/components/form/Input";
import { OTPProps, OTPSchema } from "@/utils/schemas/Auth/OTP";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { MdOutlinePassword } from "react-icons/md";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useApp } from "@/context/AppContext";
import { resendOTPFetch } from "@/lib/api/auth/resendOTPFetch";
import { verifyOTPFetch } from "@/lib/api/auth/verifyOTPFetch";

export default function FormStep({
  setStep,
}: {
  setStep: (step: string) => any;
}) {
  const t = useTranslations();
  const [tranId, setTranId] = useState<string | null>(null);
  const { closeOTP } = useApp();

  // cooldown state (seconds)
  const [cooldown, setCooldown] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  const onResendSuccess = useCallback(
    (res: any) => {
      setCooldown(60);
      toast.success(res?.message || t("pages.auth.otp.success_message"));
      if (res?.data?.is_verified) {
        closeOTP();
      } else {
        setTranId(res?.data?.transaction_id);
      }
    },
    [closeOTP, t],
  );

  const onResendError = useCallback(
    (error: any) => {
      console.error("Resend OTP Error:", error);
      toast.error(error?.message || t("common.error_occurred"));
    },
    [t],
  );

  const handleResend = useCallback(async () => {
    if (cooldown > 0) return;
    await resendOTPFetch({
      onSuccess: onResendSuccess,
      onError: onResendError,
    });
  }, [cooldown, onResendSuccess, onResendError]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<OTPProps>({
    resolver: zodResolver(OTPSchema(t)),
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
    await verifyOTPFetch(
      { ...data, transaction_id: tranId },
      { onSuccess: onVerifySuccess, onError: onVerifyError },
    );
  };

  useEffect(() => {
    if (cooldown === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) return 0;
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [cooldown]);

  useEffect(() => {
    handleResend();
  }, [handleResend]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow-lg flex flex-col min-w-[80%] md:min-w-[60%] space-y-4"
    >
      {/* Top Red Section */}
      <div className="bg-primary rounded-t-xl w-full px-2 py-4">
        <h2 className="text-white font-semibold text-center">
          {t("pages.auth.otp.title")}
        </h2>
      </div>
      {/* Body White Section */}
      <div className="px-8 py-10 space-y-10">
        <Input
          id="pin_code"
          placeholder={t("components.forms.placeholders.enter_4_digit_code")}
          register={register}
          errors={errors}
          icon={<MdOutlinePassword size={20} className="text-primary" />}
        />
        <p className="mt-3 text-sm text-gray-600">
          {t("pages.auth.otp.didnt_receive")}
        </p>
        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            type="submit"
            className="btn bg-primary text-white"
            disabled={!tranId}
          >
            {t("pages.auth.otp.verify")}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className={`btn border border-primary text-primary`}
          >
            {cooldown > 0
              ? t("pages.auth.otp.resend_countdown", { seconds: cooldown })
              : t("pages.auth.otp.resend")}
          </button>
        </div>
      </div>
    </form>
  );
}
