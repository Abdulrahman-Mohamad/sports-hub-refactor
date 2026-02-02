import React from "react";
import MessageComponent from "../Message";
import { SupportMessage } from "@/utils/types/ٍSupport";

type props = {
  allMessages?: SupportMessage[];
  lastElementRef: (node: HTMLDivElement | null) => void;
};

export default function AllMessagesComponent({
  allMessages,
  lastElementRef,
}: props) {
  return (
    <div className="flex flex-col-reverse gap-4 overflow-y-auto  flex-grow min-h-0 px-4 py-2">
      {allMessages?.map((m: SupportMessage, index: number) => {
        const isLastElement = index === allMessages.length - 1;
        return (
          <MessageComponent
            key={index}
            data={m}
            ref={isLastElement ? lastElementRef : null}
          />
        );
      })}
    </div>
  );
}
