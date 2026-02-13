"use client";
import { useUser } from "@/context/UserContext";
import { resendOTPFetch } from "@/lib/api/auth/resendOTPFetch";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

declare const AlacrityFraud: any;

export default function OperatorStep({
  setStep,
}: {
  setStep: (step: string) => void;
}) {
  const t = useTranslations("pages.auth.otp");
  const { user } = useUser();

  const handleResendWithToken = useCallback(
    async (tokenId: string) => {
      console.log("Token received, initiating resend-otp...");
      await resendOTPFetch(
        { click_id: tokenId, channel_id: "143" },
        {
          onSuccess: (res) => {
            console.log("Resend OTP success:", res);
            if (res?.data?.url && typeof res.data.url === "string") {
              window.location.href = res.data.url;
              return;
            }
            setStep("form");
          },
          onError: (err) => {
            console.error("Resend OTP error:", err);
            toast.error(err?.message || "Error occurred");
            setStep("form");
          },
        },
      );
    },
    [setStep],
  );

  useEffect(() => {
    if (user?.operator !== "zain") return;

    const msisdn = user?.phone;
    let tokenCheckInterval: NodeJS.Timeout;

    if (!document.getElementById("fraud_form")) {
      const fraudFormHtml = `
        <div id="fraud_form" style="display: none;">
          <button id="fraud_subscribe_btn"></button>
          <button id="fraud_cancel_btn"></button>
          <input id="pincode" type="hidden" />
          <input id="${msisdn}" type="hidden" />
        </div>`;
      document.body.insertAdjacentHTML("beforeend", fraudFormHtml);
    }

    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initZainFraud = async () => {
      try {
        await Promise.all([
          loadScript("https://fd.sla-alacrity.com/d513e9e03227.js?v3"),
          loadScript("https://mediaworldsdp.com/assets/js/AlacrityFraud.js?v5"),
        ]);

        setTimeout(() => {
          const he_api_key = "c2aef98baed72b65f35b5e5bfa44fd85";
          const channel_id = "149";
          const ids = {
            form: "fraud_form",
            confirm_button: "fraud_subscribe_btn",
            cancel_button: "fraud_cancel_btn",
            pin_input: "pincode",
            msisdn_input: msisdn,
          };

          if (typeof AlacrityFraud !== "undefined") {
            const Fraud = new AlacrityFraud(he_api_key, channel_id);
            Fraud.execute(ids);

            tokenCheckInterval = setInterval(() => {
              const tokenInput = document.querySelector(
                'input[name="token"]',
              ) as HTMLInputElement;
              if (tokenInput && tokenInput.value) {
                console.log("Fraud token detected:", tokenInput.value);
                clearInterval(tokenCheckInterval);
                handleResendWithToken(tokenInput.value);
              }
            }, 1000);
          } else {
            console.error(
              "AlacrityFraud script loaded but not found in window",
            );
          }
        }, 1200);
      } catch (error) {
        console.error("Fraud init failed:", error);
        setStep("error");
      }
    };

    initZainFraud();

    return () => {
      if (tokenCheckInterval) clearInterval(tokenCheckInterval);
      document.getElementById("fraud_form")?.remove();
    };
  }, [user, setStep, handleResendWithToken]);

  return (
    <div className="bg-white rounded-3xl flex flex-col items-center justify-center p-12 min-h-[400px] w-full max-w-2xl border shadow-xl">
      <Image
        src={"/images/packages/zain.png"}
        alt="Zain"
        width={200}
        height={200}
        className="w-60"
      />
      <p className="text-xl font-medium mt-8 text-gray-700">
        {t("operator_message")}
      </p>
    </div>
  );
}
