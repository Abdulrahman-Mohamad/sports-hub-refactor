import Modal from "@/components/ui/Modal";
import { PackagesProps } from "@/utils/types/Packages/Packages";
import { PromoCodeResponse } from "@/utils/types/Packages/PromoCode";
import { useEffect, useState } from "react";
import ShippingComponent from "../ShippingComponent";
import OtpComponent from "../OTPComponent";
import PackagesSuccessConponent from "../SuccessConponent";
import PackagesErrorComponent from "../ErrorComponent";
import OperatorComponent from "../OperatorComponent";
import { modalStepType } from "@/utils/types/Packages/PackagesShow";

export default function PackagesPurchaseModal({
  isOpen,
  onClose,
  paymentId,
  promoResponse,
  pack,
}: {
  isOpen: boolean;
  onClose: () => void;
  paymentId: number;
  promoResponse?: PromoCodeResponse;
  pack: PackagesProps;
}) {
  const [step, setStep] = useState<modalStepType>("shipping");

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("shipping");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const renderStep = (step: modalStepType) => {
    switch (step) {
      case "shipping":
        return (
          <ShippingComponent
            setStep={setStep}
            paymentId={paymentId}
            promoResponse={promoResponse}
            pack={pack}
            onClose={onClose}
          />
        );
      case "operator":
        return (
          <OperatorComponent
            setStep={setStep}
            paymentId={paymentId}
            packageId={pack.id}
            promoResponse={promoResponse}
          />
        );
      case "otp":
        return (
          <OtpComponent
            setStep={setStep}
            paymentId={paymentId}
            promoResponse={promoResponse}
            pack={pack}
            onClose={onClose}
          />
        );
      case "success":
        return <PackagesSuccessConponent onClose={onClose} />;
      case "error":
        return (
          <PackagesErrorComponent
            onClose={onClose}
            onRetry={() => setStep("otp")}
          />
        );
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {renderStep(step)}
      </Modal>
    </>
  );
}
