import { packagesFetch } from "@/lib/api/packages";
import PackagesHeroSection from "./_sections/Hero";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

const MainPackagesSection = dynamic(
  () => import("@/components/sections/MainPackages"),
);
const AdditionalPackagesSection = dynamic(
  () => import("./_sections/AdditionalPackages"),
);

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("title")} | ${t("packages")}`,
    description: t("description"),
    alternates: {
      canonical: "/packages",
    },
  };
}

export default async function PackagesPage() {
  const { data } = await packagesFetch();

  return (
    <div>
      <PackagesHeroSection />
      <Suspense fallback={<Spinner />}>
      {data.packages.length > 0 && (
        <MainPackagesSection data={data.packages} effectis={true} />
      )}
      {data.additional_packages.length > 0 && (
        <AdditionalPackagesSection data={data.additional_packages} />
      )}
      </Suspense>
    </div>
  );
}
