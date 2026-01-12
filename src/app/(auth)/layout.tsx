import Navbar from "@/components/layout/Navbar";

export default function layout({children}: {children: React.ReactNode}) {
  return (<>
  <div className="min-h-screen flex flex-col items-center justify-center">
<Navbar/>
<main className="flex-1">
  {children}
</main>
  </div>
  </>)
}