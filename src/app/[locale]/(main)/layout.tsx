import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RefreshHandler from "@/utils/helperFn/RefreshHandler";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 bg-[#0E0011]">
          <RefreshHandler />
          {children}
          </main>
        <Footer />
      </div>
    </>
  );
}
