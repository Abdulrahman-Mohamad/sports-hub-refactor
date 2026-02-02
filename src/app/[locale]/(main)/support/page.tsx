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

// old code
// "use client";
// import React, { useCallback, useRef } from "react";
// import ErrorBoundary from "@/hooks/ErrorBoundary";
// import AllMessagesComponent from "./_components/AllMessages";
// import SendMessageComponent from "./_components/SendMessage";
// import useSupportIndex from "@/lib/tanstack/Support/useSupport";
// import { RiArrowGoBackFill } from "react-icons/ri";
// import { useRouter } from "next/navigation";
// import PointsSection from "@/components/ui/PointsSection";
// import { useSelector } from "react-redux";

// export default function Messages() {
//   const router = useRouter();
//   const observer = useRef<IntersectionObserver | null>(null);
//   const scrollContainerRef = useRef<HTMLDivElement | null>(null);
//   const user = useSelector((state: any) => state.user.user);
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...methods } =
//     useSupportIndex();
//   // Flatten the posts from all pages
//   const allMessages = data?.pages.flatMap(
//     (page) => page?.data?.data?.data || []
//   );

//   const lastElementRef = useCallback(
//     (node: HTMLDivElement | null) => {
//       if (methods.isLoading) return;

//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver(
//         (entries) => {
//           const first = entries[0];

//           // ✅ Add more specific conditions to prevent unwanted triggers
//           if (
//             first.isIntersecting &&
//             hasNextPage &&
//             !isFetchingNextPage &&
//             !methods.isLoading
//           ) {
//             fetchNextPage();
//           }
//         },
//         {
//           root: scrollContainerRef.current,
//           rootMargin: "100px", // ✅ Trigger when user scrolls near the top
//           threshold: 0.1,
//         }
//       );

//       if (node) observer.current.observe(node);
//     },
//     [methods.isLoading, fetchNextPage, hasNextPage, isFetchingNextPage]
//   ); // ✅ Added missing dependencies

//   return (
//     <div className="relative pt-0.5">

//       {!!user && (
//         <div
//           className="absolute left-[1.5rem] md:left-[4.5rem] md:top-[1.5rem] hidden md:block
//               rtl:md:right-[4.5rem] rtl:md:left-auto
//               "
//         >
//           <PointsSection />
//         </div>
//       )}

//       <div className="max-w-6xl md:mx-auto  mx-4 h-[80vh] flex flex-col my-24 border-gradient-greenblue-empty relative">
//         <button
//           onClick={() => router.back()}
//           className="absolute top-0 end-0 p-2 border-b-2 border-l-2 border-greenA1 rounded-bl-xl
//         rtl:border-l-0 rtl:border-r-2   rtl:rounded-br-xl rtl:rounded-bl-none rtl:border-blueA1"
//         >
//           <RiArrowGoBackFill color="white" size={30} />
//         </button>
//         {/* <div className='py-6 px-4 rounded-t-2xl flex justify-center bg-primaryA1 text-primaryA1'>
//                         <div>
//                             <Image
//                             src={t("logo.light")}
//                             alt='Logo'
//                             width={200}
//                             height={100}
//                             className='w-[200px] h-auto'
//                             />
//                         </div>
//                 </div> */}
//         {/* Messages */}
//         <ErrorBoundary {...methods}>
//           <AllMessagesComponent
//             allMessages={allMessages}
//             lastElementRef={lastElementRef}
//           />
//         </ErrorBoundary>
//         {/* Input */}
//         <SendMessageComponent />
//       </div>
//     </div>
//   );
// }
