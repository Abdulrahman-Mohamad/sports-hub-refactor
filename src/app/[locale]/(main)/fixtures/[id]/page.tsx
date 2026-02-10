"use client";
// import PredictionsHeroSection from '../_sections/Hero';
import usePredictionsHighlights from "@/lib/tanstack/Predictions/useHighlight";
import ErrorBoundary from "@/hooks/ErrorBoundary";
import PredictionsHighlightsSection from "./_sections/Highlights";
import { useParams } from "next/navigation";

export default function HighlightPage() {
  const { id } = useParams();

  const { data, ...methods } = usePredictionsHighlights(id);
  const response = data?.data?.data || {};

  return (
    <div className="flex-grow">
      {/* <PredictionsHeroSection /> */}
      <ErrorBoundary {...methods}>
        <PredictionsHighlightsSection data={response} />
      </ErrorBoundary>
    </div>
  );
}
