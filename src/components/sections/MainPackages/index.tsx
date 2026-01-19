import PackageCard from "@/components/ui/PackageCard"
import { PackagesProps } from "@/utils/types/Packages/Packages"
import { useTranslations } from "next-intl"

export default function MainPackagesSection({
  data
}: {
  data: PackagesProps[]
}) {
  const t = useTranslations('pages.main.packages')
  return (
    <>
    <section className="mt-10 lg:mt-16">
      {/* title */}
      <h2 className="w-full text-center text-white font-bold md:!text-4xl lg:!text-5xl">{t('packages')}</h2>

      {/* Packages */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-10 xl:gap-16 2xl:gap-24 mt-50" dir="ltr">
        {data.map((item) => (
          <PackageCard key={item.id} data={item} />
        ))}
      </div>
    </section>
    </>
  )
}