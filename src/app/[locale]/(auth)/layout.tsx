import Navbar from "@/components/layout/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[url('/images/auth/bg.png')] bg-cover bg-center bg-no-repeat">
        <Navbar />
        <main className="flex-1 flex justify-center items-center">
          {children}
        </main>
      </div>
    </>
  );
}
