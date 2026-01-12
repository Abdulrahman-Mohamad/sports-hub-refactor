import Navbar from "@/components/layout/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen overflow-auto bg-[url('/images/auth/bg.png')] bg-cover bg-center bg-no-repeat">
        <Navbar />
        <main className="relative">
          {children}
        </main>
      </div>
    </>
  );
}
