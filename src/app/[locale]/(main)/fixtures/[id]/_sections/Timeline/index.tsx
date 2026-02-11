import Image from "next/image";
import { getEventIcon } from "@/utils/helperFn/TimelineFunctions/TypesIcons";
import { useTranslations } from "next-intl";
import { FixtureEvent, FixtureOver } from "@/utils/types/Fixtures/Highlights";
import { prediction as PredictionType } from "@/utils/types/Fixtures/Fixture";
export default function TimelineSection({
  events,
  teams,
  predictions,
}: {
  events: FixtureEvent[];
  teams: FixtureOver["teams"];
  predictions: PredictionType|null ;
}) {
  const homeTeam = teams?.home?.id;
  /* console.log(predictions); */
  const t = useTranslations("pages.main.highlights.timeline");
  return (
    <>
      <div className={`bg-white rounded-lg shadow-2xl py-6 px-2 md:px-8 w-full border relative ${predictions ? "mt-10" : ""}`}>
        {predictions && (
        <div className="bg-white rounded-t-lg mx-auto px-1.5 md:px-3 pt-3 md:pt-5 pb-3 -mb-11 min-w-[150px] md:min-w-[250px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
          <div className="w-full border-2 border-gradient-primary py-2 md:py-3 text-[#403F3E] flex justify-center gap-2 font-bold relative rounded text-xs md:text-base">
            <span >
              {predictions?.home_score}
            </span>
            <span>-</span>
            <span>
              {predictions?.away_score}
            </span>
            <div className="absolute -top-3 px-2 text-nowrap text-center w-fit bg-white ">
              <span className="text-gradient-primary">
              {t("your_prediction")}
              </span>
            </div>
          </div>
        </div>
      )}
        <div className="relative py-20">
          {/* Vertical line in the middle */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-[#EAEAEA] h-full"></div>

          {/* Start indicator (top - end of match) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 border-3 border-[#EAEAEA] rounded-full  bg-white size-8 md:size-12">
              <Image
                src="/images/highlights/whistle.png"
                alt="End Match Whistle Image"
                width={100}
                height={100}
                className=" rounded-full object-contain bg-white p-1"
              />
          </div>
          {/* Events */}
          <div className="flex flex-col-reverse gap-6">
            {events.map((event, index) => {
              const isHomeTeam = event.team?.id === homeTeam;

              return (
                    <div key={index} className="relative flex items-center">
                      {/* Time badge on the line */}
                      <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div
                          className={`w-8 h-8 md:w-12 md:h-12 rounded-full bg-white border-3 border-[#EAEAEA] flex items-center justify-center shadow-lg z-10`}
                        >
                          <span className="text-gradient-primary font-bold text-sm">
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
                          <div className="w-1/2 ps-6 md:ps-12">
                            <EventComponent event={event} isHomeTeam={false} />
                          </div>
                        </>
                      )}
                    </div>
                
              );
            })}
          </div>
          {/* End indicator (bottom - start of match) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 border-3 border-[#EAEAEA] rounded-full bg-white size-8 md:size-12">
              <Image
                src="/images/highlights/whistle.png"
                alt="End Match Whistle Image"
                fill
                className=" rounded-full object-contain bg-white p-1"
              />
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
  const t = useTranslations("pages.main.highlights.timeline");
  return (
    <div
      className={`${
        isHomeTeam ? "flex-row-reverse " : ""
      } flex items-center justify-center rounded-lg p-2 md:p-4`}
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
          } flex flex-col gap-1 text-center`}
        >
          <span className={`font-bold text-gray-800 text-sm `}>
            {translateDetail(t, event.detail)}
          </span>
          <span className="text-gray-600 text-sm md:text-base">
            {event?.player?.name}
          </span>
          {event.assist.name && (
            <span className="text-gray-500 text-sm md:text-base">
              {event?.assist?.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
