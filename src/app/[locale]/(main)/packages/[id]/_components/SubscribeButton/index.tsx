import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { activeBackground } from "../../_sections/PackageDetails";

export default function SubscribeButton({
  data,
}: {
  data: {
    packageId: number;
    paymentId: number;
    promoCodeId: number;
    type: "vip" | "gold" | "silver" | "basic";
  };
}) {
  const t = useTranslations("pages.main.packages_id");

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`btn ${activeBackground(data.type)} w-3/4 mx-auto mt-6 sm:w-1/2 md:w-1/3 lg:text-lg xl:mt-8`}
      >
        {t("Subscribe")}
      </motion.button>
    </>
  );
}
