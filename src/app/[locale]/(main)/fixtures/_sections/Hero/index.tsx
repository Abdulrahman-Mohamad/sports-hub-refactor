import { useTranslations } from "next-intl";

export default function FixturesHeroSection() {
  const t = useTranslations();
  return (
    <>
    <div className="pt-5 px-4 sm:px-6 sm:pt-7 lg:px-8 lg:pt-4 z-10 relative">
        <div className="bg-[url('/images/fixtures/fixtures-hero-bg-mobile.png')] bg-cover bg-center bg-no-repeat w-full min-h-[550px] rounded-2xl flex-center flex-col lg:bg-[url('/images/fixtures/fixtures-hero-bg.png')] lg:aspect-[1303/861] xl:pb-30 2xl:pb-40">
          <h1 className="text-white !text-[60px] !font-extrabold hero-shadow-bold md:!text-[80px] 2xl:!text-[120px]">
            {t("pages.main.fixtures.hero.title")}
          </h1>
          <p className="text-white text-center font-bold px-6 mt-6 text-lg hero-shadow-light md:w-3/4 md:text-2xl 2xl:text-3xl">
            {t("pages.main.fixtures.hero.description")}
          </p>
        </div>
      </div>
    </>
  )
}