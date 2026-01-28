import { ProfileUser } from "@/utils/types/User/profile";
import Image from "next/image";

export default function ProfileStateSection({ data }: { data: ProfileUser }) {
  const { media, username, zee_coins, joker, points } = data;
  return (
    <>
      {/* user profile picture */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 size-[160px] rounded-full overflow-hidden border-8 border-[#0E0011] sm:left-1/4 md:left-1/6 lg:left-36 lg:size-[200px]
              ${media ? "" : "bg-[#0E0011]"}
            `}
      >
        <Image
          src={media || "/images/common/default-user.png"}
          alt="user profile"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="sm:w-1/2 sm:ms-auto sm:pe-8 md:w-3/4 md:ps-8 lg:col-span-4 lg:col-start-3 xl:col-start-2 xl:ps-14">
        {/* name */}
        <div>
          <p className="text-white text-center text-3xl font-semibold
          sm:text-start
          ">
            {username}
          </p>
        </div>

        {/* points */}
        <div
          className="flex items-center justify-center gap-8 text-white text-xl font-medium mt-6
          sm:justify-start
          "
        >
          {/* coins */}
          <div className="flex items-center gap-2">
            <Image
              src={"/images/common/z-coin.png"}
              alt="Z Coin"
              width={27}
              height={27}
              className="size-6.5"
            />
            <span>{zee_coins}</span>
          </div>
          {/* joker */}
          <div className="flex items-ceter gap-2">
            <Image
              src={"/images/common/joker.png"}
              alt="Joker"
              width={40}
              height={26}
              className="w-10 h-6.5"
            />
            <span>{joker}</span>
          </div>
          {/* points */}
          <div className="flex items-ceter gap-2">
            <Image
              src={"/images/common/rank-fire.png"}
              alt="Points"
              width={20}
              height={27}
              className="w-5 h-6.5"
            />
            <span>{points}</span>
          </div>
        </div>
      </div>
    </>
  );
}
