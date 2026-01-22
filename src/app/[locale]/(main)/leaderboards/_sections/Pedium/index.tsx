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
      <section className="mt-10 lg:mt-16 overflow-hidden z-[1] relative flex-grow">
        <div className="flex items-top justify-center md:gap-10 mt-10">
          {podiumOrder.map((user) => (
            <div key={user.id} className="flex flex-col items-center flex-grow">
              <div className="relative">
                {user.ranking === 1 && (
                  <Image
                    src="/images/leaderboard/first-rank-crown.png"
                    alt="crown"
                    width={100}
                    height={100}
                    className="absolute -top-1 -left-1 w-14 h-14 z-10 -rotate-6"
                  />
                )}

                <div
                  className={`relative rounded-full w-20 h-20 overflow-hidden border-2 
                    ${!user.media ? "border-white" : "border-transparent"}
                    `}
                >
                  <Image
                    src={user.media || "/images/common/default-user.png"}
                    alt="user image"
                    fill
                    className={`object-center ${!user.media ? "p-8 object-contain" : "object-cover"}`}
                  />
                </div>
              </div>

              <p className="text-white font-bold mt-2">
                {user.username}
              </p>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/common/rank-fire.png"
                  alt="rank fire"
                  width={24}
                  height={24}
                />
                <span className="text-white font-medium text-lg">
                  {user.points}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
