"use client";

import { LeaderboardType } from "@/utils/types/Leaderboards";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LeaderboardTypeSection({
  activeType,
}: {
  activeType: LeaderboardType;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("pages.main.leaderboard");
  const [isPending, startTransition] = useTransition();

  const tabs: { id: LeaderboardType; label: string }[] = [
    { id: "trivia", label: t("trivia") },
    { id: "prediction", label: t("prediction") },
    { id: "shot_on_net", label: t("shot_on_net") },
    { id: "all", label: t("all") },
  ];

  const handleTabchange = (type: LeaderboardType) => {
    startTransition(() => {
      router.push(`${pathname}?type=${type}`, { scroll: false });
    });
  };
  const onMouseEnter = (type: LeaderboardType) => {
    router.prefetch(`${pathname}?type=${type}`);
  };
  return (
    <>
      <div className="px-4">
        <div
          className="flex-center bg-white w-full mx-auto rounded-lg mt-10 lg:mt-16
        md:w-xl
        lg:w-2xl
        xl:w-4xl
        2xl:w-5xl
        "
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              disabled={isPending}
              onMouseEnter={() => onMouseEnter(tab.id)}
              onClick={() => handleTabchange(tab.id)}
              className={`py-2 px-3 rounded-lg text-nowrap font-medium flex-grow text-center cursor-pointer
                sm:py-3
                md:text-lg md:font-semibold
                xl:text-2xl xl:py-4
        ${activeType === tab.id ? "bg-gradient-primary text-white" : ""}
        ${isPending ? "cursor-not-allowed opacity-50" : ""}
        `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
