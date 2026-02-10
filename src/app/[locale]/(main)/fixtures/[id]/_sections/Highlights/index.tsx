import Image from "next/image";
import TimelineSection from "../Timeline";
import { useTranslations } from "next-intl";
import { HighlightsProps } from "@/utils/types/Fixtures/Highlights";
import HighlightBackButton from "../../_component/BackButton";
import HighlightUpdateButton from "../../_component/UpdateButton";
import Link from "next/link";
import * as motion from "motion/react-client"

export default function PredictionsHighlightsSection({
  data,
}: {
  data: HighlightsProps;
}) {
  const t = useTranslations("pages.main.highlights");
  const { fixture, fixture_events: events, prediction } = data || {};
  const { league, teams, goals } = fixture || {};

  return (
    <div className="px-4">
      <div
        className="my-20 max-w-6xl mx-auto border-worm bg-darkGunmetalA2 rounded-xl"
        dir="ltr"
      >
        {/* Header */}
        <div className="rounded-t-xl w-full flex  items-center justify-between">
          {/* go back button */}
          <div className="text-neutral10 border-2 border-yellowA1 h-full flex items-center gap-2 rounded-xl rounded-bl-none rounded-tr-none">
            <HighlightBackButton />
          </div>
          {/* update button */}
          <div className="text-neutral10 border-2 border-redA1 h-full flex items-center gap-2 rounded-xl rounded-br-none rounded-tl-none">
            <HighlightUpdateButton />
          </div>
        </div>
        {/* Body */}
        <div className="px-6 md:px-12 max-w-4xl mx-auto py-8 flex flex-col gap-10 items-center text-white">
          {/* Maun Title */}
          <h1 className="font-medium text-white text-shadow-white text-center">
            Match Highlights
          </h1>
          {/* League Title */}
          <div className="w-full py-5 bg-darkGunmetalA3 border-2 rounded-lg flex items-center justify-center font-medium gap-8">
            <div>
              <Image
                src={league?.logo}
                alt={league?.name}
                className="w-[70px] h-auto"
                width={50}
                height={50}
              />
            </div>
            <span className="text-xl md:text-4xl">{league?.name}</span>
          </div>
          {/* Match Time */}
          <div className="flex justify-between gap-4 md:gap-8 w-full">
            <div className=" w-1/2 py-6 bg-darkGunmetalA3 border-2 rounded-lg flex items-center justify-center font-medium text-lg">
              {fixture?.fixture_date}
            </div>
            <div className="w-1/2 py-6 bg-darkGunmetalA3 border-2 rounded-lg flex items-center justify-center font-medium text-xl">
              {fixture?.fixture_time}
            </div>
          </div>
          {/* Match Teams Logos */}
          <div className="w-full flex justify-between items-center gap-4">
            {/* Home Team */}
            <div className="p-5 bg-darkGunmetalA3 border-2 rounded-lg flex items-center justify-center gap-2 md:gap-6 w-full">
              <div className="flex items-center">
                <Image
                  alt="Home Team"
                  src={teams?.home?.logo || "/team-default.png"}
                  width={200}
                  height={200}
                  className="w-[75px] md:w-[150px] !h-auto"
                />
              </div>
              <span className="font-medium text-lg md:text-5xl">
                {goals?.home}
              </span>
            </div>
            {/* VS Image */}
            <div className="flex items-center justify-center w-full">
              <Image
                alt="VS Image"
                src="/images/predictions/highlight/vs.png"
                width={1000}
                height={1000}
                quality={100}
                className="w-[45px] md:w-[110px] !h-auto"
              />
            </div>
            {/* Away Team */}
            <div className="p-5 bg-darkGunmetalA3 border-2 rounded-lg flex items-center justify-center gap-2 md:gap-6 w-full">
              <span className="font-medium text-lg md:text-5xl">
                {goals?.away}
              </span>
              <div className="flex items-center">
                <Image
                  alt="Away Team"
                  src={teams?.away?.logo || "/team-default.png"}
                  width={200}
                  height={200}
                  className="w-[50px] md:w-[150px] !h-auto"
                />
              </div>
            </div>
          </div>
          {/* Match Timeline */}
          <TimelineSection
            events={events}
            teams={teams}
            predictions={prediction}
          />
          <Link href={'/fixtures'}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="btn !px-24 py-2 bg-gradient-wormA1 border text-white font-medium"
            >
              {t("back")}
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
