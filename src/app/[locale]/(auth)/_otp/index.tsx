"use client";
import React, { useState } from "react";
import FormStep from "./Form";
import SuccessStep from "./Success";
import ErrorStep from "./Error";
import { useApp } from "@/context/AppContext";
import { useUser } from "@/context/UserContext";

export default function OTPModal() {
  const [step, setStep] = useState("form");
  const { otpModal } = useApp();
  const { user } = useUser();

  if (!otpModal || !user) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      {step === "form" ? (
        <FormStep setStep={setStep} />
      ) : step === "success" ? (
        <SuccessStep />
      ) : (
        <ErrorStep />
      )}
    </div>
  );
}
