import MainPackagesSection from "@/components/sections/MainPackages"
import HeroSection from "@/components/ui/Hero"
import { getTranslations } from "next-intl/server"
import { packagesFetch } from "@/lib/api/packages"
import AdditionalPackagesSection from "./_sections/AdditionalPackages"

export default async function PackagesPage() {
  const t = await getTranslations()
  const { data } = await packagesFetch();
  
  return (
    <div>
      <HeroSection
      title={t('pages.main.packages.hero.title')}
      description={t('pages.main.packages.hero.description')}
      />

      { data.packages.length > 0 && <MainPackagesSection data={data.packages} effectis={true}/>}
      { data.additional_packages.length > 0 && <AdditionalPackagesSection data={data.additional_packages}/>}
    </div>
  )
}