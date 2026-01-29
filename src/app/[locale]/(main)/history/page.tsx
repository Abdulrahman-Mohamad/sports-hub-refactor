import TypeSection from "@/components/sections/Type";
import HistoryHeroSection from "./_sections/Hero";
import { HistoryType } from "@/utils/types/History";
import HistoryDateInput from "./_sections/DateInput";
import { historyFetch } from "@/lib/api/History/HistoryFetch";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

const HistoryTriviaTable = dynamic(() => import("./_sections/TriviaTable"));
const HistoryPredictionTable = dynamic(
  () => import("./_sections/PredictionTable"),
);
const HistoryShootTable = dynamic(() => import("./_sections/ShootTable"));

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("title")} | ${t("history")}`,
    description: t("description"),
    alternates: {
      canonical: "/history",
    },
  };
}

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: HistoryType; date?: string }>;
}) {
  const today = new Date().toISOString().split("T")[0];
  const { type = "trivia", date = today } = await searchParams;

  const res = await historyFetch(type, date);
  const data = res?.data;
  return (
    <>
      <HistoryHeroSection />
      <TypeSection activeType={type} showAll={false} />
      <Suspense fallback={<Spinner />}>
      <div className="max-w-6xl mx-auto bg-[#1a111c] flex-grow rounded-xl my-20 px-4 pb-10">
        <HistoryDateInput currentDate={date} />
        {type === "trivia" && <HistoryTriviaTable data={data} />}
        {type === "prediction" && <HistoryPredictionTable data={data} />}
        {type === "shot_on_net" && <HistoryShootTable data={data} />}
      </div>
      </Suspense>
    </>
  );
}
