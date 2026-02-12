"use client";
import { useApp } from "@/context/AppContext";
import { PosterShowFetch } from "@/lib/api/poster/show";
import { PosterData } from "@/utils/types/Poster";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function PosterModal() {
  const { posterModal, openPoster, closePoster } = useApp();
  const [posterData, setPosterData] = useState<PosterData | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(async () => {
    if(timeoutRef.current) clearTimeout(timeoutRef.current);
    try {
      // Call A: Get intial open_mins
      const res = await PosterShowFetch();
      if (res?.status && res?.data) {
        const mins = res.data.open_mins || 0;
        const delay = mins * 60 * 1000;

        timeoutRef.current = setTimeout(async () => {
          // Call B: Get fresh data before showing
          const freshRes = await PosterShowFetch();
          if (freshRes?.status && freshRes.data) {
            setPosterData(freshRes.data);
            openPoster();
          }
        }, delay);
      }
    } catch (error) {
      console.error("Poster Timer Error:", error);
    }
  }, [openPoster]);

  // Restart timer when modal is closed
  useEffect(() => {
    if (!posterModal) {
      startTimer();
    }
    return ()=>{
      if(timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [posterModal, startTimer]);

  return (
    <>
      <AnimatePresence>
        {posterModal && posterData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 bg-black/50 z-50"
          >
            <div className="min-h-screen flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="bg-white rounded-2xl relative w-[92vw] sm:w-[85vw] md:w-[70vw] lg:w-[65vw] xl:w-[50vw]"
              >
                <button
                  onClick={closePoster}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 cursor-pointer text-2xl sm:text-3xl"
                >
                  <IoClose
                    className="text-grayA4 hover:text-grayA1 hover:cursor-pointer"
                    size={24}
                  />
                </button>
                <div className="w-full px-4 py-10 md:px-8 lg:px-12">
                  {posterData.title && (
                    <h2 className="text-lg font-bold text-black mb-4 md:text-xl xl:text-2xl">
                      {posterData.title}
                    </h2>
                  )}
                  {posterData.media_path && (
                    <div className="my-6 relative w-full sm:px-2 md:px-4">
                      <Image
                        src={posterData.media_path}
                        alt={posterData.title || "Poster Image"}
                        width={780}
                        height={481}
                        quality={90}
                        priority={true}
                        className="object-cover object-center mx-auto h-full w-full"
                      />
                    </div>
                  )}
                  {posterData.description && (
                    <p className="text-sm leading-relaxed mb-6 md:text-base xl:text-lg">
                      {posterData.description}
                    </p>
                  )}
                  {posterData.link && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-3/4 mx-auto block py-1.5 text-lg bg-gradient-primary-r text-white rounded-lg font-medium cursor-pointer md:w-2/3 md:py-2.5 md:text-xl lg:w-3/5 xl:w-1/2"
                    >
                      <Link
                        href={posterData.link}
                        target="_blank"
                        className="size-full"
                      >
                        {document.documentElement.dir === "rtl"
                          ? "إذهب للرابط"
                          : "Go to the link"}
                      </Link>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
