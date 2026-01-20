import MainPackagesSection from "@/components/sections/MainPackages"
import HeroSection from "@/components/ui/Hero"
import { getTranslations } from "next-intl/server"
import { packagesFetch } from "@/lib/api/packages"

export default async function PackagesPage() {
  const t = await getTranslations()
  const { data } = await packagesFetch();
  console.log(data);
  
  return (
    <div>
      <HeroSection
      title={t('pages.main.packages.hero.title')}
      description={t('pages.main.packages.hero.description')}
      />

      { data.packages && <MainPackagesSection data={data.packages} effectis={true}/>}
    </div>
  )
}