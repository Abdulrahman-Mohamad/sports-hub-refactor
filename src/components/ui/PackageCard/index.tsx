import { PackagesProps } from "@/utils/types/Packages/Packages";
import { useLocale, useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import Link from "next/link";

export default function PackageCard({ data }: { data: PackagesProps }) {
  const t = useTranslations("pages.main.packages");
  const locale = useLocale();

  return (
    <>
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={`px-2.5 max-w-[300px]
        ${data.type === "vip" ? "order-1 lg:order-2" : data.type === "gold" ? "order-2 lg:order-3" : "order-3 lg:order-1"}
        ${data.type === "vip" ? "lg:-translate-y-1/4" : ""}
        `}
      >
        <div
          className={`bg-white rounded-xl flex flex-col items-center ${data.type === "basic" ? "" : "pb-20"}`}
        >
          {/* top */}
          <div className="w-full text-center space-y-2 p-6">
            <h2
              className={` !font-bold !text-4xl pb-2
              ${
                data.type === "vip"
                  ? "text-gradient-primary"
                  : data.type === "gold"
                    ? "text-gradient-gold"
                    : data.type === "silver"
                      ? "text-gradient-silver"
                      : "text-[#7100FB]"
              }
              `}
            >
              {data.type_trans}
            </h2>

            <p className="text-3xl font-medium text-[#595959]">
              {data?.price} <span>{t("currency")}</span>
            </p>
          </div>
          {/* center */}
          <div
            className={`relative w-[calc(100%+48px)] aspect-[351/366]  bg-center bg-cover pt-10 pb-8 flex flex-col gap-4
              ${data.type === "vip" ? "text-white" : "text-black"}
              ${data.type === "basic" ? "bg-[#7100FB] rounded-xl text-white justify-center" : "justify-end"}
              `}
            style={{
              backgroundImage: `url(/images/packages/${data.type === "vip" ? "vip" : data.type === "gold" ? "gold" : data.type === "silver" ? "silver" : ""}.png)`,
            }}
          >
            <ul className={`list-disc space-y-2 font-medium ps-12 `}>
              {data?.with_offer && (
                <li className="line-through">
                  {t("insted_of")} {data.instead_of} {t("currency")}
                </li>
              )}
              <li>
                {data.zee_coins} {t("zee_coin")}
              </li>
              <li>
                {data.joker} {t("joker")}
              </li>
            </ul>
            <p className="w-full text-center rtl:px-6">{t("description")}</p>
            <p
              className={`w-full text-center ${data.type !== "vip" ? "text-black/40" : "text-white/70"} ${data.type === "basic" ? "hidden" : ""}`}
            >
              {t("not_refundable")}
            </p>

            {/* button */}
            <Link
              href={`/packages/${data.id}`}
              className={`${data.type === "basic" ? "hidden" : ""}`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 btn !px-12 !py-2 text-nowrap 
              ${data.type === "vip" ? "bg-gradient-primary text-white" : data.type === "gold" ? "bg-gradient-gold" : "bg-gradient-silver"}
              `}
              >
                {t("Subscribe")}
              </motion.button>
            </Link>
          </div>
          <Link
            href={`/packages/${data.id}`}
            className={`${data.type === "basic" ? "" : "hidden"}`}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={` btn !px-12 !py-2 text-nowrap bg-[#7100FB] my-8 text-white cursor-pointer`}
            >
              {t("Subscribe")}
            </motion.div>
          </Link>
        </div>
      </div>
    </>
  );
}
