"use client";

import { LeaderboardType } from "@/utils/types/Leaderboards";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function TypeSection({
  activeType,
  showAll = true,
}: {
  activeType: LeaderboardType;
  showAll?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("pages.main.leaderboard");
  const [isPending, startTransition] = useTransition();

  const tabs: { id: LeaderboardType; label: string }[] = [
    { id: "trivia", label: t("trivia") },
    { id: "prediction", label: t("prediction") },
    { id: "shot_on_net", label: t("shot_on_net") },
  ];

  if (showAll) {
    tabs.push({ id: "all", label: t("all") });
  }

  const handleTabchange = (type: LeaderboardType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", type);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const onMouseEnter = (type: LeaderboardType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", type);
    router.prefetch(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="px-4 mt-10 lg:mt-16">
        <div
          className="flex-center bg-white w-full mx-auto rounded-lg 
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
