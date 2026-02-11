import Image from "next/image";
import TimelineSection from "../Timeline";
import { useTranslations } from "next-intl";
import { HighlightsProps } from "@/utils/types/Fixtures/Highlights";
import HighlightBackButton from "../../_component/BackButton";
import HighlightUpdateButton from "../../_component/UpdateButton";
import Link from "next/link";
import * as motion from "motion/react-client";

export default function PredictionsHighlightsSection({
  data,
}: {
  data: HighlightsProps;
}) {
  const t = useTranslations("pages.main.highlights");
  const { fixture, fixture_events: events, prediction } = data || {};
  const { league, teams, goals } = fixture || {};

  return (
    <div className="px-4 mt-24 lg:mt-32 lg:px-20">
      <div className=" max-w-6xl mx-auto bg-[#231C28] rounded-xl" dir="ltr">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          {/* go back button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="border-gradient-primary h-full flex items-center gap-2 rounded-xl rounded-bl-none rounded-tr-none origin-top-left"
          >
            <HighlightBackButton />
          </motion.div>
          {/* update button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="border-gradient-primary h-full flex items-center gap-2 rounded-xl rounded-br-none rounded-tl-none origin-top-right"
          >
            <HighlightUpdateButton />
          </motion.div>
        </div>
        {/* Body */}
        <div className="px-6 md:px-12 max-w-4xl mx-auto py-8 flex flex-col gap-4 items-center text-white">
          {/* Maun Title */}
          <h1 className="font-medium !text-3xl sm:!text-4xl md:!text-5xl text-white text-shadow-white text-center">
            {t("title")}
          </h1>
          {/* League Title */}
          <div className="w-full py-2 flex items-center justify-center font-medium gap-2">
            <div>
              <Image
                src={league?.logo}
                alt={league?.name}
                className="w-[50px] h-auto"
                width={50}
                height={50}
              />
            </div>
            <span className="text-xl md:text-4xl text-nowrap">
              {league?.name}
            </span>
          </div>
          {/* Match Time */}
          <div className="flex-center flex-col gap-4 md:gap-4 w-full md:text-lg lg:text-xl">
            <span>{fixture?.fixture_date}</span>
            <span>{fixture?.fixture_time}</span>
          </div>
          {/* Match Teams Logos */}
          <div className="w-full flex justify-between items-center gap-4">
            {/* Home Team */}
            <div className="p-2 flex-center flex-col gap-2 md:gap-6 w-full">
              <Image
                alt="Home Team"
                src={teams?.home?.logo || "/team-default.png"}
                width={200}
                height={200}
                className="w-[75px] md:w-[150px] !h-auto"
              />
              <span className="font-medium text-lg md:text-5xl">
                {goals?.home}
              </span>
            </div>
            {/* VS Image */}
            <div className="flex-center flex-col w-full">
              <Image
                alt="VS Image"
                src="/images/highlights/vs.png"
                width={1000}
                height={1000}
                quality={100}
                className="w-[40px] md:w-[80px] !h-auto"
              />
              <span className="text-center text-xs md:text-2xl text-nowrap mt-2 sm:text-sm">
                {fixture?.long_status_trans}
              </span>
            </div>
            {/* Away Team */}
            <div className="p-2 flex-center flex-col gap-2 md:gap-6 w-full">
              <Image
                alt="Away Team"
                src={teams?.away?.logo || "/team-default.png"}
                width={200}
                height={200}
                className="w-[75px] md:w-[150px] !h-auto"
              />
              <span className="font-medium text-lg md:text-5xl">
                {goals?.away}
              </span>
            </div>
          </div>
          {/* Match Timeline */}
          <TimelineSection
            events={events}
            teams={teams}
            predictions={prediction}
          />
          <Link href={"/fixtures"}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="btn !px-24 py-2 bg-gradient-primary text-white font-medium mt-3 md:mt-6"
            >
              {t("back")}
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
