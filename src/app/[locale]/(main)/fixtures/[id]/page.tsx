import PredictionsHighlightsSection from "./_sections/Highlights";
import { FixturesIdViewHighlightsFetch } from "@/lib/api/fixtures/ViewHighlights";

export default async function HighlightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await FixturesIdViewHighlightsFetch(id);
  const data = res?.data || {};

  return (
    <div className="flex-grow">
      <PredictionsHighlightsSection data={data} />
    </div>
  );
}
