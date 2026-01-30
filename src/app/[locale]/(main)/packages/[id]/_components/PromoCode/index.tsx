import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { activeBackground } from "../../_sections/PackageDetails";
import { useState } from "react";
import { checkPromoCodeFetch } from "@/lib/api/packages/checkPromoCode";

export default function PackageDetailsPromoCode({
  setPromoCodeId,
  package_id,
  type,
}: {
  setPromoCodeId: (id: number) => void;
  package_id: number;
  type: "vip" | "gold" | "silver" | "basic";
}) {
  const t = useTranslations("pages.main.packages_id.promo_code");
  const [isLoading, setIsLoading] = useState(false);
  const [promoMessage, setPromoMessage] = useState<{
    status: string;
    message: string;
  }>({
    status: "",
    message: "",
  });

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
    setPromoMessage({
      status: "success",
      message: data.message,
    });
    setPromoCodeId(data.promo_code);
  };

  const onError = (error:any) => {
    setIsLoading(false);
    setPromoMessage({
      status: "error",
      message: error.message,
    });
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
      <div className="flex items-center flex-col md:flex-row gap-4 w-full md:items-stretch">
        <input
          className="bg-gray-100 md:w-2/3 py-3 px-4 rounded-lg font-normal w-full text-black text-sm border-2 border-gray-200"
          placeholder={t("placeholder")}
          {...register("code", {
            required: `${t("required")}`,
          })}
        />
        <motion.button
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          type="submit"
          className={`btn md:py-3 w-full md:w-1/3 font-bold flex-center
                    ${activeBackground(type)}`}
        >
          {t("activate")}
        </motion.button>
      </div>
      {promoMessage.message && (
        <motion.p
          initial={{opacity:0,x:"-50"}}
          animate={{opacity:1,x:"0"}}
          className={`${
            promoMessage?.status === "success"
              ? "text-statusSuccess"
              : "text-statusError"
          }`}
        >
          {promoMessage?.message}
        </motion.p>
      )}
      {errors?.code && (
        <motion.p
        initial={{opacity:0,x:"-50%"}}
        animate={{opacity:1,x:"0"}}
        className="text-statusError">{String(errors.code?.message)}</motion.p>
      )}
    </form>
  );
}
