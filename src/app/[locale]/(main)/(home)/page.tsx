import { homeFetch } from "@/lib/api/home/HomeFetch";
import HomeHeroSection from "./_sections/HeroSection";
import HomeNewsSection from "./_sections/News";
import HomeUserStatsSection from "./_sections/UserState";

export default async function HomeContentPage() {
  const {data} = await homeFetch();
console.log(data);
  return (
    <div className="min-h-[3000px] ">
      <HomeHeroSection />
      {data?.news && <HomeNewsSection data={data.news} />}
      {data?.user && <HomeUserStatsSection data={data.user} />}
    </div>
  );
}
