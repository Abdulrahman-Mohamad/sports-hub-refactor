import { modalStepType, PackagesShowProps } from "@/utils/types/Packages/PackagesShow";
import { PromoCodeResponse } from "@/utils/types/Packages/PromoCode";

export default function OtpComponent({
  setStep,
  paymentId,
  promoResponse,
  pack,
}: {
  setStep: (step: modalStepType) => void;
  paymentId: number;
  promoResponse?: PromoCodeResponse;
  pack: PackagesShowProps["package"];
}) {
  return (
    <></>
  )
}