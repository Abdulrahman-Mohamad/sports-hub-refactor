import { homeFetch } from "@/lib/api/home/HomeFetch";
import HomeHeroSection from "./_sections/HeroSection";

export default async function HomeContentPage() {
  const data = await homeFetch();
// console.log(data);
  return (
    <div className="min-h-[3000px] ">
      <HomeHeroSection />
    </div>
  );
}
