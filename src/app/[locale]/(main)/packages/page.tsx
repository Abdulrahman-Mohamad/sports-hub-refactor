import MainPackagesSection from "@/components/sections/MainPackages"
import { packagesFetch } from "@/lib/api/packages"
import AdditionalPackagesSection from "./_sections/AdditionalPackages"
import PackagesHeroSection from "./_sections/Hero";

export default async function PackagesPage() {
  const { data } = await packagesFetch();
  
  return (
    <div>
      <PackagesHeroSection/>
      { data.packages.length > 0 && <MainPackagesSection data={data.packages} effectis={true}/>}
      { data.additional_packages.length > 0 && <AdditionalPackagesSection data={data.additional_packages}/>}
    </div>
  )
}