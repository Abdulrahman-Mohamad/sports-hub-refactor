"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useTranslations } from "next-intl";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export default function NotificationModal({
  isOpen,
  onClose,
  data,
}: NotificationModalProps) {
  const t = useTranslations("components.notifications.toaster");
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] text-black"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="rounded-lg px-2 py-4 w-[80vw] bg-white relative
                        sm:py-6
                        md:w-[60vw] md:px-8
                        lg:w-[50vw] lg:px-12
                        xl:w-[40vw] xl:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-[1em] end-[1em] ">
              <IoClose
                size={25}
                className="cursor-pointer hover:text-gray-500 transition-colors duration-300"
                onClick={onClose}
              />
            </div>
            <div className="flex gap-6 items-center">
              <div>
                <div className="p-2 my-auto border-2 rounded-full w-16 h-16 md:w-28 md:h-28 flex items-center justify-center">
                  <Image
                    src={t("logo")}
                    alt="logo"
                    className="rounded-full object-fill"
                    width={80}
                    height={80}
                  />
                </div>
              </div>

              <div className="capitalize space-y-1">
                <h3 className="font-bold text-lg">{data?.data?.title}</h3>
                <p>{data?.data?.body}</p>
                <span className="font-bold text-sm">{data?.created_at}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
