"use client";
import { useTranslations } from "next-intl";
import PackageDetailsPromoCode from "../PromoCode";
import SubscribeButton from "../SubscribeButton";
import { useState } from "react";
import { PackagesShowProps } from "@/utils/types/Packages/PackagesShow";
import Image from "next/image";

export default function OrderHandler({
  id,
  data,
}: {
  id: number;
  data: PackagesShowProps;
}) {
  // translations
  const t = useTranslations("pages.main.packages_id");

  // states
  const [paymentId, setPaymentId] = useState<number>(1);
  const [promoCodeId, setPromoCodeId] = useState<number | null>(null);

  // Destructing
  const {
    payment_methods,
    package: { with_offer, instead_of, price, type },
  } = data;

  return (
    <>
      {/* promo code section */}
      <PackageDetailsPromoCode
        setPromoCodeId={setPromoCodeId}
        package_id={id}
        type={type}
      />

      {/* slogan section */}
      <div className="flex flex-col w-full gap-2 mt-6 xl:mt-8">
        <p className="text-center font-semibold text-lg px-4 md:px-0 lg:text-xl">
          {t("statement")}
        </p>
        <p className="text-center text-sm text-slate-500 lg:text-base">
          {t("not_refundable")}
        </p>
      </div>

      {/* payment methods */}
      <div className="flex flex-col gap-3 mt-6 md:max-w-2/3 xl:mt-8">
        <h3 className="font-semibold !text-lg lg:!text-xl">{t("choose_payment")}</h3>
        <div className="flex flex-col gap-2">
          {payment_methods.map((method) => (
            <div
              key={method.id}
              onClick={() => setPaymentId(method.id)}
              className={`w-full py-2 px-4 flex items-center justify-between rounded-lg
              ${method.id === paymentId ? "border-gradient-primary" : "border border-[#CDCDCD]"}
              `}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={method.media_path}
                  alt={method.title}
                  width={50}
                  height={50}
                  className="w-8"
                />
                <p className="lg:text-lg">{method.title}</p>
              </div>
              {/* radial shape */}
              <div className="border border-[#CDCDCD] rounded-full size-5 p-0.5">
                <div className={`bg-gradient-primary rounded-full size-full ${method.id === paymentId ? "" : "hidden"}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* price section */}
      <div className="flex items-center justify-end gap-4 mt-6 xl:mt-8">
        {with_offer && (
          <div className="flex items-center gap-2">
            <p className="text-slate-600"><span className="line-through text-xl lg:text-2xl">{instead_of}</span> {t('currency')}</p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <p><span className="text-xl lg:text-2xl">{price}</span> {t('currency')}</p>
        </div>
      </div>

      <SubscribeButton
        data={{
          packageId: id,
          paymentId: paymentId!,
          promoCodeId: promoCodeId!,
          type: type!
        }}
      />
    </>
  );
}
