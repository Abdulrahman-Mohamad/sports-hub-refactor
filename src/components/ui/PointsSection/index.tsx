import { pointsFetch } from "@/lib/api/profile/showPointsFetch";
import Image from "next/image";

export default async function PointsSection() {
  const res = await pointsFetch();
  const pointsData = res?.data;
  return (
    <div>
      <div className="bg-white px-3 py-2 grid grid-cols-3 gap-2 !rounded-lg font-medium text-xs md:px-6 md:py-2.5 md:text-base min-w-[150px]">
        <>
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
            <div>{pointsData?.zee_coins ?? 0}</div>
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
            <div>{pointsData?.joker ?? 0}</div>
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
            <div>{pointsData?.points ?? 0}</div>
          </div>
        </>
      </div>
    </div>
  );
}
