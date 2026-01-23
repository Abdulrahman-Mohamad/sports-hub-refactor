import TypeSection from "@/components/sections/Type";
import HistoryHeroSection from "./_sections/Hero";
import { HistoryType } from "@/utils/types/History";
import HistoryDateInput from "./_sections/DateInput";
import { historyFetch } from "@/lib/api/History/HistoryFetch";
import HistoryTriviaTable from "./_sections/TriviaTable";
import HistoryPredictionTable from "./_sections/PredictionTable";
import HistoryShootTable from "./_sections/ShootTable";

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
      <div className="max-w-6xl mx-auto bg-[#1a111c] flex-grow rounded-xl my-20 px-4 pb-10">
        <HistoryDateInput currentDate={date} />

        {type === "trivia" && <HistoryTriviaTable data={data} />}
        {type === "prediction" && <HistoryPredictionTable data={data} />}
        {type === "shot_on_net" && <HistoryShootTable data={data} />}
      </div>
    </>
  );
}
