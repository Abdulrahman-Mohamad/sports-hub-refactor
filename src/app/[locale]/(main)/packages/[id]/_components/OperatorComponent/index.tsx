import { useUser } from "@/context/UserContext";
import { packagesCheckoutFetch } from "@/lib/api/packages/chechout";
import { modalStepType } from "@/utils/types/Packages/PackagesShow";
import { PromoCodeResponse } from "@/utils/types/Packages/PromoCode";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect } from "react";

declare const AlacrityFraud: any;

interface OperatorComponentProps {
  setStep: (step: modalStepType) => void;
  packageId: number;
  promoResponse?: PromoCodeResponse | null;
  paymentId: number;
}

export default function OperatorComponent({
  setStep,
  packageId,
  promoResponse,
  paymentId,
}: OperatorComponentProps) {
  const t = useTranslations("pages.main.packages_id.modals.operator");
  const { user } = useUser();

  const handleCheckout = useCallback(
    async (tokenId: string) => {
      await packagesCheckoutFetch(
        {
          package_id: packageId,
          payment_method_id: paymentId,
          promo_code_id: promoResponse?.data?.promo_code?.id || 0,
          channel_id: "143",
          click_id: tokenId,
        },
        {
          onSuccess: () => {
            setStep("otp");
          },
          onError: () => {
            setStep("error");
          },
        },
      );
    },
    [packageId, promoResponse, setStep, paymentId],
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
        </div>
      `;
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
                clearInterval(tokenCheckInterval);
                handleCheckout(tokenInput.value);
              }
            }, 1000);
          }
        }, 1000);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setStep("error");
      }
    };

    initZainFraud();

    return () => {
      if (tokenCheckInterval) clearInterval(tokenCheckInterval);
      document.getElementById("fraud_form")?.remove();
    };
  }, [user, setStep, handleCheckout]);

  return (
    <div className="bg-white rounded-xl flex flex-col items-center justify-center py-8 min-h-[300px]">
      <Image
        src={"/images/packages/zain.png"}
        alt="Zain Company"
        width={1000}
        height={1000}
        className="w-60 lg:w-80"
      />
      <p className="text-lg font-medium mt-6 lg:text-xl">{t("message")}</p>
    </div>
  );
}
