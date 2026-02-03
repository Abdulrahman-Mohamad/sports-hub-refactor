import { fetchSupportMessages } from "@/lib/api/messages";
import SupportChatContainer from "./_components/SupportChatContainer";

export default async function SupportPage() {
  const initialData = await fetchSupportMessages();
  return (
    <>
      <main className="px-4 md:px-8 lg:px-14 relative h-screen overflow-hidden">
        {/* Glow Lines */}
        {/* top */}
        <div className="absolute left-0 right-0 top-0 h-1/3 bg-linear-to-b from-[#E400FB]/30 via-transparent via-90% to-transparent"/>
        <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-linear-to-t from-[#5200FD]/30 via-transparent via-90% to-transparent"/>
        {/* button */}
        <div/>
        <SupportChatContainer
          initialMessages={initialData?.data?.data || []}
          totalPages={initialData?.data.total_pages || 1}
        />
      </main>
    </>
  );
}

