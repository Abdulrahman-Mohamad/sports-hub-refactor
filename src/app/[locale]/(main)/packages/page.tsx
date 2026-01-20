import { useTranslations } from "next-intl"
import PackageHeroSection from "./_sections/Hero"

export default function PackagesPage() {
  const t = useTranslations()
  return (
    <div>
      <PackageHeroSection
      title={t('pages.main.packages.hero.title')}
      description={t('pages.main.packages.hero.description')}
      />
    </div>
  )
}