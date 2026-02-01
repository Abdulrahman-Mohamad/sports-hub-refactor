import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RefreshHandler from "@/utils/helperFn/RefreshHandler";
import PointsSection from "@/components/ui/PointsSection";
import { cookies } from "next/headers";

export default async function layout({ children }: { children: React.ReactNode }) {
  const cookiesStore = await cookies();
  const hasToken = cookiesStore.has('access_token')
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between bg-[#0E0011]">
        <Navbar pointsComponent={hasToken ? <PointsSection /> : null} />
        <main className="flex-1">
          <RefreshHandler />
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
