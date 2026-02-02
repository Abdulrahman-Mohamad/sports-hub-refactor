"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RiArrowGoBackFill } from "react-icons/ri";
import AllMessagesComponent from "../AllMessages";
import SendMessageComponent from "../SendMessage";
import { usePusher } from "@/hooks/usePusher";
import { useUser } from "@/context/UserContext";
import { SupportMessage } from "@/utils/types/ٍSupport";
import { fetchSupportMessages } from "@/lib/api/messages";
import GradientIcon from "@/components/ui/GradientIcon";

interface SupportChatContainerProps {
  initialMessages: SupportMessage[];
  totalPages: number;
}

export default function SupportChatContainer({
  initialMessages,
  totalPages,
}: SupportChatContainerProps) {
  const router = useRouter();
  const { user } = useUser();

  const [messages, setMessages] = useState<SupportMessage[]>(initialMessages);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setMessages((prev) => {
      const existingIds = new Set(prev.map((msg) => msg.message_id));
      const newMessages = initialMessages.filter(
        (msg) => !existingIds.has(msg.message_id),
      );
      return [...newMessages, ...prev];
    });
  }, [initialMessages]);

  const loadMoreMessages = async () => {
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    const moreData = await fetchSupportMessages(nextPage);

    if (moreData?.status) {
      setMessages((prev) => [...prev, ...moreData.data.data]);
      setCurrentPage(nextPage);
    }
    setLoadingMore(false);
  };

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          loadMoreMessages();
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadingMore, currentPage, totalPages],
  );

  usePusher("my-channel", `support-message-${user?.id}`, (data) => {
    console.log("New support message received via Pusher:", data);
    router.refresh();
  });

  return (
    <div className="relative pt-0.5">
      <div className="md:mx-auto h-[80vh] flex flex-col my-24 bg-white relative rounded-2xl lg:rounded-4xl overflow-hidden">
        <button
          onClick={() => router.back()}
          className="flex items-center bg-[#F1F1F1] justify-end p-4 "
        >
          <GradientIcon
          icon={RiArrowGoBackFill} size={30}
          />
          {/* <RiArrowGoBackFill color="white" size={30} /> */}
        </button>

        <AllMessagesComponent
          allMessages={messages}
          lastElementRef={lastElementRef}
        />

        <SendMessageComponent />
      </div>
    </div>
  );
}
