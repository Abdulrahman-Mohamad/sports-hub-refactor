import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import GradientIcon from "@/components/ui/GradientIcon";
import { sendMessagesFetch } from "@/lib/api/messages/sendMessages";
import { useRouter } from "next/navigation";
import Input from "@/components/form/Input";
import { useTranslations } from "next-intl";

export default function SendMessageComponent() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("pages.main.support.send_message");

  const onSuccess = (res: any) => {
    if (res.status) {
      setMessage("");
      router.refresh();
    }
    setLoading(false);
  };

  const onError = (err: any) => {
    console.error("Error sending message", err);
    setLoading(false);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    setLoading(true);

    await sendMessagesFetch(message, { onSuccess, onError });
  };

  return (
    <form className="py-4 flex items-center gap-4 px-4" onSubmit={handleSend}>
      <Input
        id="message"
        settings={{
          value: message,
          onChange: (e: any) => setMessage(e.target.value),
          disabled: loading,
        }}
        errors={{}}
        className="w-full"
        placeholder={t("placeholder")}
        // icon={<BsEmojiSmileFill  size={22} className='text-gray-700' />}
      />
      <button
        disabled={loading}
        type="submit"
        className="text-secondaryA2 hover:text-secondaryA2/80 pt-2 cursor-pointer"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-greenA1 mr-2"></div>
        ) : (
          <GradientIcon
            icon={IoSend}
            fromColor="#5200FD"
            toColor="#E400FB"
            size={44}
            className="rtl:rotate-y-180"
          />
        )}
      </button>
    </form>
  );
}
