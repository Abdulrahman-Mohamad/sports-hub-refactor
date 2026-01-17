import { useUser } from "@/context/UserContext";
import Image from "next/image";

export default function PointsSection() {
  const { profile } = useUser();
  return (
    <div>
      <div className=" bg-white px-3 py-2 grid grid-cols-3 gap-2  !rounded-lg font-medium text-xs
      md:px-6 md:py-2.5 md:text-base
      ">
        {/* coins */}
        <div className="flex items-center gap-2 justify-center">
          <div className="flex-shrink-0">
            <Image
              src="/images/common/z-coin.png"
              alt="Zee Coin Image"
              width={20}
              height={20}
              className="w-[16px] h-auto"
            />
          </div>
          <div>{profile?.user.zee_coins}</div>
        </div>
        {/* Joker */}
        <div className="flex items-center gap-2 justify-center">
          <div className="flex-shrink-0">
            <Image
              src="/images/common/joker.png"
              alt="Joker Image"
              width={24}
              height={15}
              className="w-[24px] h-auto object-contain"
              unoptimized
            />
          </div>
          <div>{profile?.user.joker}</div>
        </div>
        {/* Points */}
        <div className="flex items-center gap-2 justify-center">
          <div className="flex-shrink-0">
            <Image
              src="/images/common/rank-fire.png"
              alt="Points Image"
              width={12}
              height={16}
              className="w-[12px] h-auto"
            />
          </div>
          <div>{profile?.user.points}</div>
        </div>
      </div>
    </div>
  );
}
