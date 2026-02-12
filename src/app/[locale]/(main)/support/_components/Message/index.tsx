import { SupportMessage } from "@/utils/types/Support";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { forwardRef } from "react";

type Props = {
  data: SupportMessage;
};

const MessageComponent = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const t = useTranslations("metadata");
  const isAdmin = data.is_admin;
  const showBorder = isAdmin || !data?.user?.image_path;

  return (
    <div
      ref={ref}
      className={`flex ${
        !isAdmin ? "justify-end ms-auto" : "justify-start me-auto"
      } gap-2 w-3/6`}
    >
      {/* Image */}
      <div
        className={`
                w-10 md:w-12 aspect-square rounded-full
                flex items-center justify-center object-cover shadow-xl 
            ${!isAdmin ? "order-2" : ""} 
            ${showBorder ? "border-2 border-[#44229A] bg-white" : ""}
            
            `}
      >
        <Image
          src={
            isAdmin
              ? t("icon")
              : data?.user.image_path || "/images/common/default-user.png"
          }
          width={100}
          height={100}
          alt="Image"
          className={`w-8 md:w-10 h-auto aspect-square object-contain rounded-full
            ${showBorder ? "p-1" : ""}
            `}
        />
      </div>
      {/* Message */}
      <div
        className={`
                px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold flex items-center justify-center text-sm md:text-base
                ${
                  !isAdmin
                    ? "ltr:rounded-br-none rtl:rounded-bl-none bg-greenA1"
                    : "ltr:rounded-bl-none rtl:rounded-br-none bg-blueA1"
                }`}
      >
        {data?.message}
      </div>
    </div>
  );
});

MessageComponent.displayName = "MessageComponent";
export default MessageComponent;
