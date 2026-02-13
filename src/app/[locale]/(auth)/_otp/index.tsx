"use client";
import React, { useEffect, useState } from "react";
import FormStep from "./Form";
import SuccessStep from "./Success";
import ErrorStep from "./Error";
import { useApp } from "@/context/AppContext";
import { useUser } from "@/context/UserContext";
import { useSearchParams } from "next/navigation";

import OperatorStep from "./Operator";

export default function OTPModal() {
  const [step, setStep] = useState("");
  const [preventInitialResend, setPreventInitialResend] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { otpModal, openOTP } = useApp();
  const { user } = useUser();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (otpModal && user) {
      const typeParam = searchParams.get("type");
      if (typeParam === "2") {
        setPreventInitialResend(true);
        setStep("form");
      } else if (user.operator === "zain") {
        setStep("operator");
      } else {
        setStep("form");
      }
    } else {
      setStep("");
      setPreventInitialResend(false);
    }
  }, [otpModal, user?.operator, searchParams, user]);

  useEffect(() => {
    const showOtp = searchParams.get("otp");
    const typeParam = searchParams.get("type");

    if (
      (showOtp === "true" || typeParam === "2") &&
      user &&
      !user.is_subscribed
    ) {
      openOTP();

      const params = new URLSearchParams(window.location.search);
      params.delete("otp");
      params.delete("type");

      const newPath =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");
      window.history.replaceState(null, "", newPath);
    }
  }, [searchParams, user, openOTP]);

  if (!otpModal || !user) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      {step === "operator" ? (
        <OperatorStep setStep={setStep} />
      ) : step === "form" ? (
        <FormStep
          setStep={setStep}
          preventInitialResend={preventInitialResend}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : step === "success" ? (
        <SuccessStep message={successMessage} />
      ) : (
        <ErrorStep message={errorMessage} setStep={setStep} />
      )}
    </div>
  );
}
