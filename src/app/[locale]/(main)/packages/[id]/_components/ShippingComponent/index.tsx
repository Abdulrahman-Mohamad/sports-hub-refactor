import { useUser } from "@/context/UserContext";
import {
  modalStepType,
  PackagesShowProps,
} from "@/utils/types/Packages/PackagesShow";
import { PromoCodeResponse } from "@/utils/types/Packages/PromoCode";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaX } from "react-icons/fa6";

export default function ShippingComponent({
  setStep,
  paymentId,
  promoResponse,
  pack,
  onClose,
}: {
  setStep: (step: modalStepType) => void;
  paymentId: number;
  promoResponse?: PromoCodeResponse;
  pack: PackagesShowProps["package"];
  onClose: () => void;
}) {
  const t = useTranslations("pages.main.packages_id.modals.shipping");
  const { user } = useUser();

  const shippingSummary = [
    { label: t("subtotal"), value: pack.price, style: "" },
    { label: t("package_type"), value: pack.type_trans, style: "" },
    { label: t("package_price"), value: pack.price, style: "" },
  ];
  if (promoResponse) {
    shippingSummary.push(
      {
        label: t("after_discount"),
        value: promoResponse.data.package.total_price,
        style: "text-green-500",
      },
      {
        label: t("discount_value"),
        value: promoResponse.data.promo_code.discount_value,
        style: "text-green-500",
      },
    );
  }

  const handleSubmit = () => {
    switch(user?.operator) {
      case "zain": return handelZain()
      case "stc": return handelStc()
      case "batelco": return handelBatelco()
    }
    
  };

  const handelZain = () => {
    setStep("operator")
    
  }

  const handelStc = () => {
    console.log('stc');
    
  }

  const handelBatelco = () => {
    console.log('batelco');
    
  }

  return (
    <>
      <div className="py-8 mx-4 bg-white rounded-xl relative">
        {/* close Button */}
        <div onClick={onClose} className="absolute top-3 end-4 cursor-pointer">
          <FaX className="text-gray-900 hover:text-gray-400 transition-colors duration-300" />
        </div>

        {/* Title */}
        <h3 className="!text-xl !font-bold px-4">{t("title")}</h3>
        {/* Summary */}
        <div className="px-8 mt-6 flex flex-col gap-4 w-full">
          {shippingSummary.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between font-medium ${item.style}`}
            >
              <p className="">{item.label}</p>
              <p className="">{item.value}</p>
            </div>
          ))}
        </div>
        {/* Total */}
        <div className="px-8 pt-4 brder-t-2 border-gray-300 flex items-center justify-between font-medium">
          <p>{t("total")}</p>
          <p>
            {promoResponse
              ? promoResponse.data.package.total_price
              : pack.price}
          </p>
        </div>
        {/* submit button */}
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="btn bg-gradient-primary text-white !px-12 mx-auto mt-6"
        >
          {t("buy_now")}
        </motion.button>
      </div>
    </>
  );
}
