import { termsFetch } from "@/lib/api/terms/TermsFetch";
import TermsHeroSection from "./_section/Hero";
import TermsSection from "./_section/Terms";

type termsData = {
  content: string;
};

export default async function TermsPage() {
  const res = await termsFetch();
  const data: termsData = res?.data;
  return (
    <>
      <TermsHeroSection />
      <TermsSection data={data}/>
    </>
  );
}
