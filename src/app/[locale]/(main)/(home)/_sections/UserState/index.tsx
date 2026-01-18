import { UserStateProps } from "@/utils/types/Home/UserState";
import Image from "next/image";
import { HiPlus } from "react-icons/hi";
import * as motion from "motion/react-client";
import Link from "next/link";

export default function HomeUserStatsSection({
  data,
}: {
  data: UserStateProps;
}) {
  const { points, zee_coins, joker, ranking, win, loss, ratio, total } = data;
  return (
    <div className="flex flex-col md:flex-row md:items-stretch justify-center items-center gap-4 px-4 mt-10 text-white lg:px-8 lg:gap-8 xl:gap-12">
      {/* Coins & Joker & Ranking */}
      <div
        className="relative bg-[#625964] p-4 w-full rounded-xl space-y-2 overflow-hidden flex flex-col justify-center
      sm:p-6
      md:w-2/3 md:py-8 md:px-14
      xl:px-18
      "
      >
        {/* Glow Circles */}
        <div className="w-full h-full absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 bg-radial from-[#D600FB]/70 via-transparent via-[80%] to-transparent z-0 pointer-events-none" />
        <div className="w-full h-full absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 bg-radial from-[#5C73FE]/70 via-transparent via-[80%] to-transparent z-0 pointer-events-none" />
        {/* Coins */}
        <div className=" bg-linear-to-r from-[#FAA000] to-[#FAA100] p-0.5 rounded-xl z-[1] relative">
          <div className="bg-[#151515] w-full flex items-center justify-between gap-3 rounded-xl px-6 py-2.5
          sm:gap-4 sm:py-4
          lg:gap-8
          ">
            <Image
              src={"/images/common/z-coin.png"}
              alt={"Coin"}
              width={100}
              height={100}
              className="w-[30px]"
            />
            <span className="flex-grow font-medium lg:text-xl">{zee_coins}</span>
            <Link href={"/packages"} className="cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="border-2 border-[#FAA000] rounded-full p-1 md:p-2"
              >
                <HiPlus color="#FAA000" size={20}/>
              </motion.div>
            </Link>
          </div>
        </div>
        {/* Joker */}
        <div className=" bg-linear-to-r from-[#63AFFA] via-[#58B44F] to-[#FC4A32] p-0.5 rounded-xl z-[1] relative
        ">
          <div className="bg-[#151515] w-full flex items-center justify-between gap-3 rounded-xl px-6 py-2.5
          sm:gap-4 sm:py-4
          lg:gap-8
          ">
            <Image
              src={"/images/common/joker.png"}
              alt={"Coin"}
              width={100}
              height={100}
              className="w-[30px] me-0.5"
            />
            <span className="flex-grow font-medium lg:text-xl">{joker}</span>
            <Link href={"/packages"} className="cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-linear-to-r from-[#63AFFA] via-[#58B44F] to-[#FC4A32] p-0.25 rounded-full"
              >
                <div className="rounded-full p-1 flex-center bg-[#151515] md:p-2">
                  <HiPlus color="#FAA000" size={20}/>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
        {/* Rank */}
        <div className=" bg-linear-to-r from-[#FAA000] to-[#FAA100] p-0.5 rounded-xl z-[1] relative">
          <div className="bg-[#151515] w-full flex items-center justify-between gap-3 rounded-xl px-6 py-2.5
          sm:gap-4 sm:py-4
          lg:gap-8
          ">
            <Image
              src={"/images/common/rank-fire.png"}
              alt={"Coin"}
              width={100}
              height={100}
              className="w-[20px] me-3"
            />
            <span className="flex-grow font-medium lg:text-xl">{points}</span>
            <Link href={"/games"} className="cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="border-2 border-[#FAA000] rounded-full p-1 md:p-2"
              >
                <HiPlus color="#FAA000" size={20}/>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      {/* Wins & Losses & Ratio & Total & Rank*/}
      <div
        className="flex flex-col justify-center gap-4 bg-[#625964] p-4 w-full rounded-xl overflow-hidden
      sm:p-6 sm:px-8
      md:w-1/3 md:py-0
      "
      >
        {/* Win */}
        <StateItem title="Wins" value={win} />
        {/* Loses */}
        <StateItem title="Loses" value={loss} />
        {/* Ratio */}
        <StateItem title="Ratio" value={ratio} />
        {/* Total */}
        <StateItem title="Total" value={total} />
        {/* Rank */}
        <StateItem title="Rank" value={ranking} />
      </div>
    </div>
  );
}

const StateItem = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <div className="flex items-center justify-between text-start text-lg font-semibold lg:text-xl">
      <span className="w-1/2">{title}</span>
      <span className="w-1/2">{value}</span>
    </div>
  );
};
