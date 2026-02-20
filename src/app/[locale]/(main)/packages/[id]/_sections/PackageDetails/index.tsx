import { PackagesShowProps } from "@/utils/types/Packages/PackagesShow";
import { useTranslations } from "next-intl";
import OrderHandler from "../../_components/OrderHandler";

// Pckages Theme Colors
export const activeBackground = (type: "vip" | "gold" | "silver" | "basic") => {
  switch (type) {
    case "vip":
      return "bg-gradient-primary text-white";
    case "gold":
      return "bg-gradient-gold";
    case "silver":
      return "bg-gradient-silver";
    default:
      return "bg-[#7100FB] text-white";
  }
};

export default function PackageDetailsSection({
  data,
}: {
  data: PackagesShowProps;
}) {
  const t = useTranslations("pages.main.packages_id");

  // Distruction
  const {
    package: { id, type, type_trans, zee_coins, joker },
  } = data;

  return (
    <>
      <section className="mt-10 lg:mt-16 px-4">
        <div className="container lg:max-w-3xl xl:max-w-5xl bg-white mx-auto mt-10 lg:mt-16 rounded-xl overflow-hidden min-h-[400px]">
          {/* Header Section */}
          <div className={`py-4 px-6 ${activeBackground(type)}`}>
            <h2 className=" text-white !font-bold lg:!text-4xl">{type_trans}</h2>
          </div>
          {/* content */}
          <div className="px-4 py-6 lg:px-8">
            {/* info section */}
            <div className="flex flex-col gap-2 font-medium mt-6 xl:mt-10">
              <p className="lg:text-lg">
                {zee_coins} <span>{t("zee_coin")}</span>
              </p>
              <p className="lg:text-lg">
                {joker} <span>{t("joker")}</span>
              </p>
            </div>
            <OrderHandler id={id} data={data} />
          </div>
        </div>
      </section>
    </>
  );
}
