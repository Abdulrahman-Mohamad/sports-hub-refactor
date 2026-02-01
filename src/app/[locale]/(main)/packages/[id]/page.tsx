import dynamic from "next/dynamic";
import { packagesShowFetch } from "@/lib/api/packages/show";
import { PackagesShowProps } from "@/utils/types/Packages/PackagesShow";
import PackagesHeroSection from "../_sections/Hero";

const PackageDetailsSection = dynamic(() => import("./_sections/PackageDetails"));
export default async function SinglePackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await packagesShowFetch(id);
  const data = res?.data as PackagesShowProps;

  return <>
  <PackagesHeroSection/>
  <PackageDetailsSection data={data}/>
  </>;
}
