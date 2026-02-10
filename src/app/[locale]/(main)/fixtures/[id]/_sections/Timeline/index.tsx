import { FixtureProps } from "@/utils/types&schemas/Predictions/Fixture";
import { FixtureEvent } from "@/utils/types&schemas/Predictions/Highlights";
import Image from "next/image";
import { getEventIcon } from "@/utils/helperFn/TimelineFunctions/TypesIcons";
import { useTranslations } from "next-intl";
import AnimateSection from "@/components/layout/AnimateSection";

export default function TimelineSection({
  events,
  teams,
  predictions,
}: {
  events: FixtureEvent[];
  teams: FixtureProps["teams"];
  predictions: FixtureProps["prediction"];
}) {
  const homeTeam = teams?.home?.id;
  /* console.log(predictions); */
  const t = useTranslations("pages.predictions.highlights");
  return (
    <>
      {predictions && (
        <div className="bg-white rounded-t-lg shadow-2xl border-t border-l border-r mx-auto px-3 pt-5 pb-3 -mb-11 min-w-[300px] ">
          <div className="w-full border-2 border-[#403F3E] py-2 text-[#403F3E] flex justify-center gap-2 font-bold relative rounded">
            <span>
              {predictions?.home_score ? predictions?.home_score : "4"}
            </span>
            <span>-</span>
            <span>
              {predictions?.away_score ? predictions?.away_score : "4"}
            </span>
            <div className="absolute -top-3 px-2 text-nowrap  text-center w-fit bg-white">
              {t("your_prediction")}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-2xl pt-10 px-2 md:px-8 w-full border ">
        <div className="relative py-20 ">
          {/* Vertical line in the middle */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-gradient-wormA1 h-full"></div>

          {/* Start indicator (top - end of match) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-2">
            <AnimateSection>
              <Image
                src="/images/predictions/highlight/whistle.png"
                alt="End Match Whistle Image"
                width={100}
                height={100}
                className="w-12 h-auto rounded-full object-contain bg-white"
              />
            </AnimateSection>
          </div>
          {/* Events */}
          <div className="flex flex-col-reverse gap-6">
            {events.map((event, index) => {
              const isHomeTeam = event.team?.id === homeTeam;

              return (
                <>
                  <AnimateSection>
                    <div key={index} className="relative flex items-center">
                      {/* Time badge on the line */}
                      <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div
                          className={`w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-wormA1 flex items-center justify-center shadow-lg z-10`}
                        >
                          <span className="text-white font-bold text-sm">
                            {event.time.elapsed}
                          </span>
                        </div>
                      </div>

                      {/* Event details - left for home, right for away */}
                      {isHomeTeam ? (
                        <div className="w-1/2 pr-6 md:pr-12 ml-0">
                          <EventComponent event={event} isHomeTeam={true} />
                        </div>
                      ) : (
                        <>
                          <div className="w-1/2"></div>
                          <div className="w-1/2 pl-6 md:pl-12">
                            <EventComponent event={event} isHomeTeam={false} />
                          </div>
                        </>
                      )}
                    </div>
                  </AnimateSection>
                </>
              );
            })}
          </div>
          {/* End indicator (bottom - start of match) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-white">
            <AnimateSection>
              <Image
                src="/images/predictions/highlight/whistle.png"
                alt="End Match Whistle Image"
                width={100}
                height={100}
                className="w-12 h-12 rounded-full object-contain bg-white"
              />
            </AnimateSection>
            {/* <div className="w-8 h-8 rounded-full border-4 border-red-500 bg-white"></div> */}
          </div>
        </div>
      </div>
    </>
  );
}

const translateDetail = (t: any, detail: any) => {
  switch (detail) {
    case "Normal Goal":
      return t("normal_goal");
    case "Own Goal":
      return t("own_goal");
    case "Penalty":
      return t("penalty");
    case "Missed Penalty":
      return t("missed_penalty");
    case "Yellow Card":
      return t("yellow_card");
    case "Red Card":
      return t("red_card");
    case "Substitution 1":
      return t("sub1");
    case "Substitution 2":
      return t("sub2");
    case "Substitution 3":
      return t("sub3");
    case "Substitution 4":
      return t("sub4");
    case "Substitution 5":
      return t("sub5");
    case "Goal cancelled":
      return t("goal_cancelled");
    case "Penalty confirmed":
      return t("penalty_confirmed");
    default:
      return detail; // fallback if it doesn't match any case
  }
};

const EventComponent = ({
  event,
  isHomeTeam,
}: {
  event: FixtureEvent;
  isHomeTeam: boolean;
}) => {
  const t = useTranslations("event_details");
  return (
    <div
      className={`${
        isHomeTeam ? "flex-row-reverse " : ""
      } flex items-center rounded-lg p-2 md:p-4 shadow-sm border`}
    >
      <div className="flex items-center flex-col md:flex-row gap-2 md:gap-8 ">
        <div
          className={`flex items-center justify-center flex-shrink-0  ${
            isHomeTeam && "md:order-2"
          } `}
        >
          {getEventIcon(event)}
        </div>
        <div
          className={`${
            isHomeTeam && "md:order-1"
          } flex flex-col gap-1 text-center capitalize`}
        >
          <span className={`font-bold text-gray-800 text-sm `}>
            {translateDetail(t, event.detail)}
          </span>
          <span className="text-grayA4 text-sm md:text-base">
            {event?.player?.name}
          </span>
          {event.assist.name && (
            <span className="text-grayA1 text-sm md:text-base">
              {event?.assist?.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
