import dynamic from "next/dynamic";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { packagesFetch } from "@/lib/api/packages";

import PackagesHeroSection from "./_sections/Hero";
import CheckoutResultHandler from "../../../../providers/CheckoutResultHandler";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

const MainPackagesSection = dynamic(
  () => import("@/components/sections/MainPackages"),
);
const AdditionalPackagesSection = dynamic(
  () => import("./_sections/AdditionalPackages"),
);

// Metadata
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
    <div className="flex-grow overflow-hidden">
      <Suspense fallback={<Spinner />}>
        <CheckoutResultHandler />
      </Suspense>
      <PackagesHeroSection />
      {data?.packages?.length > 0 && (
        <MainPackagesSection data={data?.packages} effectis={true} />
      )}
      {data?.additional_packages?.length > 0 && (
        <AdditionalPackagesSection data={data?.additional_packages} />
      )}
      
      
    </div>
  );
}
