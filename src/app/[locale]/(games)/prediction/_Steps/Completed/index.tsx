import { FixtureProps } from "@/utils/types&schemas/Predictions/Fixture";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

export default function FixtureCompletedStep({
  data: response,
}: {
  data: FixtureProps;
}) {
  const router = useRouter();
  const t = useTranslations("pages.prediction_game.completed");
  return (
    <div className="rounded-xl mx-6 border-greenblue bg-darkGunmetalA2 ring-2 ring-[#FCDE02]/20 p-4 md:p-8 !py-12 w-full max-w-2xl">
      {/* Header */}
      <div className="border bg-darkGunmetalA3 rounded-lg flex items-center justify-center py-4">
        <h2 className="text-white font-medium text-center text-xl  md:text-2xl">
          {t("title")}
        </h2>
      </div>
      {/* Body */}
      <div className="pt-8 flex flex-col gap-10  max-w-3xl mx-auto text-white">
        {/* Teams */}
        <div className="flex items-stretch justify-between gap-2 md:gap-10 w-full">
          {/* Home Team */}
          <div className="border bg-darkGunmetalA3 rounded-lg flex md:items-center flex-col gap-2 justify-center flex-1 py-4">
            <div className="flex flex-col items-center w-full md:flex-row justify-center gap-4 p-6 md:p-4 h-full">
              <Image
                alt="Home Team"
                src={response?.teams?.home?.logo || "/team-default.png"}
                width={200}
                height={200}
                className="w-[50px] md:w-[75px]"
              />

              <div className="flex flex-col items-center">
                <span className="font-medium text-sm md:text-lg">
                  {response?.teams?.home?.name}
                </span>
                <span className="font-medium text-sm md:text-lg">
                  {response?.prediction?.home_score}
                </span>
              </div>
            </div>
          </div>
          {/* VS Image */}
          <div className="flex items-center justify-center">
            <div />
            <Image
              alt="VS Image"
              src="/images/gameplay/prediction-vs.png"
              width={100}
              height={100}
              className="w-[50px] !h-auto"
            />
          </div>
          {/* Away Team */}
          <div className="border bg-darkGunmetalA3 rounded-lg flex md:items-center flex-col gap-2 justify-center flex-1 py-4">
            <div className="flex items-center flex-col md:flex-row justify-between gap-4 p-6 md:p-4 w-full h-full">
              <Image
                alt="Away Team"
                src={response?.teams?.away?.logo || "/team-default.png"}
                width={200}
                height={200}
                className="w-[50px] md:w-[75px]"
              />
              <div className="flex flex-col items-center md:-order-1">
                <span className="font-medium text-sm md:text-lg">
                  {response?.teams?.away?.name}
                </span>
                <span className="font-medium text-sm md:text-lg">
                  {response?.prediction?.away_score}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center text-lg md:text-2xl font-semibold">
          <span>
            {response?.prediction
              ? response.prediction.home_score > response.prediction.away_score
                ? response.teams.home.name
                : response.prediction.home_score < response.prediction.away_score
                ? response.teams.away.name
                : "draw"
              : "draw"}
          </span> 
          <span className="rtl:-order-1">{t('victory')}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="btn bg-gradient-bluegreenA1 border-2 mt-4 mx-auto !px-10"
          onClick={() => router.push("/predictions")}
        >
          {t("back")}
        </motion.button>
      </div>
    </div>
  );
}
