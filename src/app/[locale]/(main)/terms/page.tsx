import { termsFetch } from "@/lib/api/terms/TermsFetch";
import TermsHeroSection from "./_section/Hero";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

const TermsSection = dynamic(() => import("./_section/Terms"));

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("title")} | ${t("terms")}`,
    description: t("description"),
    alternates: {
      canonical: "/terms",
    },
  };
}

export default async function TermsPage() {
  const res = await termsFetch();
  const data = res?.data;
  return (
    <>
      <TermsHeroSection />
      <Suspense fallback={<Spinner />}>
      <TermsSection data={data}/>
      </Suspense>
    </>
  );
}
