import { termsFetch } from "@/lib/api/terms/TermsFetch";
import TermsHeroSection from "./_section/Hero";
import TermsSection from "./_section/Terms";

export default async function TermsPage() {
  const res = await termsFetch();
  const data = res?.data;
  return (
    <>
      <TermsHeroSection />
      <TermsSection data={data}/>
    </>
  );
}
