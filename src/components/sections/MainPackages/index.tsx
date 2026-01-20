import PackageCard from "@/components/ui/PackageCard";
import { PackagesProps } from "@/utils/types/Packages/Packages";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function MainPackagesSection({
  effectis = false,
  data,
}: {
  data: PackagesProps[];
  effectis?: boolean;
}) {
  const t = useTranslations("pages.main.packages");
  return (
    <>
      <section className="mt-10 lg:mt-16">
        {/* title */}
        <div className="w-full text-center relative">
          {effectis && (
            <>
              {/* Glow Circle */}
              <div className="absolute left-0 w-full aspect-square -translate-y-1/2 -translate-x-1/2 bg-radial from-[#E400FB]/60 via-transparent to-transparent" />
              {/* GIF Arrows */}
              <div className="absolute left-8 -translate-y-1/4 md:left-16">
                <Image
                  className="w-24 opacity-20 lg:w-28"
                  src={"/gif/common/arrow-sharp-v.gif"}
                  alt="arrow-sharp"
                  width={1000}
                  height={1000}
                />
              </div>
            </>
          )}

          <h2 className="w-full text-center text-white font-bold md:!text-4xl lg:!text-5xl">
            {t("packages")}
          </h2>
        </div>
        {/* Packages */}
        <div
          className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-10 xl:gap-16 2xl:gap-24 mt-50"
          dir="ltr"
        >
          {data.map((item) => (
            <PackageCard key={item.id} data={item} />
          ))}
        </div>
      </section>
    </>
  );
}
