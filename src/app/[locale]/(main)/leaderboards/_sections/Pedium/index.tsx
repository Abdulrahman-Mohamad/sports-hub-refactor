import { LeaderboardUser } from "@/utils/types/Leaderboards";
import Image from "next/image";

export default function LeaderboardPodiumSection({
  data,
}: {
  data: LeaderboardUser[];
}) {
  const podiumOrder = [data[1], data[0], data[2]].filter(Boolean);
  return (
    <>
      <section className="relative w-full h-[390px] md:h-[550px] lg:h-[600px] xl:h-[850px] 2xl:h-[1000px]">
        <div className="relative w-full h-full max-w-5xl mx-auto">
          {podiumOrder.map((user, index) => {
            const positions = [
              "left-[5%] md:left-[13%] lg:left-[10%] xl:left-[0%] 2xl:-left-[10%] bottom-[50%] lg:bottom-[45%]  2xl:bottom-[50%]", // Rank-2
              "left-1/2 -translate-x-1/2 bottom-[65%] lg:bottom-[65%]", // Rank-1
              "right-[8%] md:right-[13%] lg:right-[10%] xl:right-[0%] 2xl:-right-[10%] bottom-[38%] lg:bottom-[28%] xl:bottom-[32%] 2xl:bottom-[36%]", // Rank-3
            ];

            return (
              <div
                key={user.id}
                className={`absolute ${positions[index]} flex flex-col items-center z-10`}
              >
                {/* Crown Image */}
                <div className="relative">
                  {user.ranking === 1 && (
                    <Image
                      src="/images/leaderboard/first-rank-crown.png"
                      alt="crown"
                      width={1000}
                      height={1000}
                      className="absolute -top-3.5 -left-4 xl: size-10 -rotate-7 
                      md:size-16 md:-left-7.5 md:-top-4 md:-rotate-10
                      lg:size-20 lg:-left-8.5 lg:-top-5 lg:-rotate-12
                      xl:size-26 xl:-left-11 xl:-top-7 xl:-rotate-12"
                    />
                  )}

                  {/* Glow backGround Image */}
                  {user.ranking === 1 && (
                    <Image
                      src="/images/leaderboard/first-rank-glow.png"
                      alt="glow"
                      width={1000}
                      height={1000}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[250%] max-w-none pointer-events-none"
                    />
                  )}

                  <div
                    className={`relative rounded-full size-18 md:size-32 lg:size-44 xl:size-56 overflow-hidden border-2 
                      ${user.ranking === 1 ? "border-yellow-400" : "border-white"}
                      `}
                  >
                    <Image
                      src={user.media || "/images/common/default-user.png"}
                      alt="user image"
                      fill
                      className={`object-center ${!user.media ? "p-4 md:p-8 object-contain" : "object-cover"}`}
                    />
                  </div>
                </div>

                <p className="text-white font-bold mt-2 text-sm md:text-xl lg:text-2xl">
                  {user.username}
                </p>
                <div className="flex items-center gap-1 md:gap-2">
                  <Image
                    src="/images/common/rank-fire.png"
                    alt="rank fire"
                    width={24}
                    height={24}
                    className="w-4 h-4 md:w-6 md:h-6"
                  />
                  <span className={`text-white font-medium text-xs md:text-lg lg:text-xl ${user.score_hide ? "blur-sm" : ""}`}>
                    {user.points}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
