import { ProfileUser } from "@/utils/types/User/profile";
import Image from "next/image";

export default function ProfileStateSection({
  data,
}: {
  data: ProfileUser;
}) {

  const { media, username, zee_coins, joker, points } = data;
  return (
    <>
    {/* user profile picture */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 size-[160px] rounded-full overflow-hidden border-8 border-[#0E0011]
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

          {/* name */}
          <div>
            <p className="text-white text-center text-3xl font-semibold">
              {username}
            </p>
          </div>

          {/* points */}
          <div className="flex items-center justify-center gap-8 text-white text-xl font-medium mt-6">
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
    </>
  )
}