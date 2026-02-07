import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { activeBackground } from "../../_sections/PackageDetails";

export default function SubscribeButton({
  type,
  onSubmit,
}: {
  type: "vip" | "gold" | "silver" | "basic";
  onSubmit: () => void;
}) {
  const t = useTranslations("pages.main.packages_id");

  return (
    <>
      <motion.button
        onClick={onSubmit}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`btn w-3/4 mx-auto mt-6 sm:w-1/2 md:w-1/3 lg:text-lg xl:mt-8
          ${activeBackground(type)}
          `}
      >
        {t("Subscribe")}
      </motion.button>
    </>
  );
}
