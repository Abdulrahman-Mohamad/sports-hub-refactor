import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { activeBackground } from "../../_sections/PackageDetails";
import { useState } from "react";
import { checkPromoCodeFetch } from "@/lib/api/packages/checkPromoCode";
import { ImSpinner4 } from "react-icons/im";
import { PromoCodeResponse } from "@/utils/types/Packages/PromoCode";

export default function PackageDetailsPromoCode({
  setPromoResponse,
  promoResponse,
  package_id,
  type,
}: {
  package_id: number;
  type: "vip" | "gold" | "silver" | "basic";
  setPromoResponse: (response: PromoCodeResponse) => void;
  promoResponse?: PromoCodeResponse;
}) {
  const t = useTranslations("pages.main.packages_id.promo_code");
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const onSuccess = (data: any) => {
    setIsLoading(false);
    setPromoResponse(data);
  };

  const onError = (error: any) => {
    setIsLoading(false);
    setPromoResponse(error);
  };

  const onSubmitPromo = (data: { code: string }) => {
    setIsLoading(true);
    checkPromoCodeFetch(
      { code: data.code, package_id: package_id },
      { onSuccess, onError },
    );
  };

  return (
    <form
      className="space-y-2 mt-6 xl:mt-8"
      onSubmit={handleSubmit(onSubmitPromo)}
    >
      <div className="relative flex items-center flex-col md:flex-row gap-4 w-full md:items-stretch">
        <div className="relative w-full md:w-2/3">
          <input
            className="bg-gray-100 py-3 px-4 rounded-lg font-normal w-full text-black text-sm border-2 border-gray-200"
            placeholder={t("placeholder")}
            {...register("code", {
              required: `${t("required")}`,
            })}
          />
        </div>
        <motion.button
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          type="submit"
          className={`btn md:py-3 w-full md:w-1/3 font-bold flex-center
            ${type === "vip" ? "text-white" : "text-black"}
                    ${activeBackground(type)}`}
        >
          {isLoading ? (
            <ImSpinner4 className="animate-spin" size={24} />
          ) : (
            t("activate")
          )}
        </motion.button>

        {/* Promo Code Message */}
        {promoResponse && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "0" }}
            className="absolute top-full left-0 w-full mt-0 text-xs lg:text-sm flex items-center gap-2"
          >
            {promoResponse?.status == true ? (
              <p className="text-statusSuccess">
                {promoResponse?.data?.promo_code?.discount_value}
              </p>
            ) : (
              <p className="text-statusError">{promoResponse?.message}</p>
            )}
            {errors?.code && (
              <p className="text-statusError">{String(errors.code?.message)}</p>
            )}
          </motion.div>
        )}
      </div>
    </form>
  );
}
