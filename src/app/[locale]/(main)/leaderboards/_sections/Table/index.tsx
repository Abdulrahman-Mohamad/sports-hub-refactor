import { LeaderboardUser } from "@/utils/types/Leaderboards";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function LeaderboardTableSection({
  data,
  user,
}: {
  data: LeaderboardUser[];
  user?: LeaderboardUser;
}) {
  const t = useTranslations("pages.main.leaderboard");
  return (
    <section
      className="w-full bg-white/80 py-6 z-[1] relative
      md:py-10
      lg:py-14
    2xl:py-24
    "
    >
      {/* other users */}
      <div
        className="flex flex-col gap-2 mx-auto max-w-[95vw] md:max-w-[88vw]
      sm:px-6 
      md:gap-3
      lg:gap-4
      xl:gap-5
      "
      >
        {data.map((user) => (
          <div
            key={user.id}
            className="bg-white/65 py-2 px-4 rounded-lg flex items-center gap-3 last:gap-2 shadow-[0_0_15px_0px_rgba(0,0,0,0.3)]
            md:py-3 md:px-6 md:gap-5 md:last:gap-4.5
            lg:py-4 lg:px-8 lg:gap-6 lg:last:gap-5 lg:rounded-xl
            xl:py-5 xl:px-10 xl:gap-7 xl:last:gap-6
            2xl:py-6 2xl:px-12 2xl:gap-8 2xl:last:gap-7
            "
          >
            {/* Ranking */}
            <p
              className="font-semibold 
            lg:text-xl
            xl:text-2xl
            "
            >
              # <span>{user.ranking}</span>
            </p>
            {/* avatar */}
            <div
              className={`w-8 h-8 rounded-full overflow-hidden ${!user.media ? "border p-2" : ""}
            lg:w-12 lg:h-12
            xl:w-16 xl:h-16
            `}
            >
              <Image
                src={user.media || "/images/common/default-user.png"}
                alt={user.username}
                width={1000}
                height={1000}
                className={`w-full h-full object-center  ${!user.media ? "object-contain" : "object-cover"}`}
              />
            </div>
            {/* username */}
            <p
              className="font-semibold flex-grow truncate 
            lg:text-xl
            xl:text-2xl
            "
            >
              {user.username}
            </p>
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
              <Image
                src="/images/common/rank-fire.png"
                alt="rank-fire"
                width={1000}
                height={1000}
                className="w-4 lg:w-6 xl:w-7"
              />
              <p className={`font-medium lg:text-lg xl:text-xl  ${user.score_hide ? "blur-sm select-none" : ""}`}>
                {user.score_hide ? "Nice try" : user.points}{" "}
                <span className="text-xs font-normal lg:text-sm xl:text-base text-gray-500">
                  {t("points")}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* current user */}
      {user && (
        <div
          className="w-full bg-gradient-primary-r py-2 px-4 mt-2 flex items-center gap-3 shadow-[0_0_15px_0px_rgba(0,0,0,0.3)] text-white
      sm:gap-8
      md:py-3 md:px-6 md:gap-10 md:mt-3
      lg:py-4 lg:px-8 lg:gap-12 lg:mt-4
      xl:py-5 xl:px-10 xl:gap-16 xl:mt-5
      2xl:py-6 2xl:px-12 2xl:gap-20
      "
        >
          {/* Ranking */}
          <p
            className="font-semibold 
            lg:text-xl
            xl:text-2xl
            "
          >
            # <span>{user.ranking}</span>
          </p>
          {/* avatar */}
          <div
            className={`w-8 h-8 rounded-full overflow-hidden ${!user.media ? "border p-2" : ""}
            lg:w-12 lg:h-12
            xl:w-16 xl:h-16
            `}
          >
            <Image
              src={user.media || "/images/common/default-user.png"}
              alt={user.username}
              width={1000}
              height={1000}
              className={`w-full h-full object-center  ${!user.media ? "object-contain" : "object-cover"}`}
            />
          </div>
          {/* username */}
          <p
            className="font-semibold flex-grow truncate 
            lg:text-xl
            xl:text-2xl
            "
          >
            {user.username}
          </p>
          <div
            className="flex items-center gap-2 
          sm:gap-3
          lg:gap-4 
          xl:gap-5
          "
          >
            <Image
              src="/images/common/rank-fire.png"
              alt="rank-fire"
              width={1000}
              height={1000}
              className="w-4 lg:w-6 xl:w-7"
            />
            <p className={`font-medium lg:text-lg xl:text-xl ${user.score_hide ? "blur-sm select-none" : ""}`}>
              {user.score_hide ? "Nice try" : user.points}{" "}
              <span
                className="text-xs font-normal lg:text-sm xl:text-base text-white/60
              sm:ms-1
              "
              >
                {t("points")}
              </span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
