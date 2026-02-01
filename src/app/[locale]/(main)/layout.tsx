import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RefreshHandler from "@/utils/helperFn/RefreshHandler";
import PointsSection from "@/components/ui/PointsSection";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between bg-[#0E0011]">
        <Navbar pointsComponent={<PointsSection />} />
        <main className="flex-1">
          <RefreshHandler />
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
