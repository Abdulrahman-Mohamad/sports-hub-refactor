import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { Prediction } from "@/utils/types/Fixtures/Fixture";

export default function PredictionCompletedStep({
  data: response,
}: {
  data: Prediction;
}) {
  const router = useRouter();
  const t = useTranslations("games.prediction.steps.completed");

  const getWinner = () => {
    if (!response?.prediction) return t("draw");
    const { home_score, away_score } = response.prediction;

    if (home_score > away_score) return response.teams.home.name;
    if (away_score > home_score) return response.teams.away.name;
    return t("draw");
  };

  return (
    <div className="rounded-xl bg-black/50 p-4 md:p-8 !py-12 w-full max-w-2xl">
      {/* Header */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-bold text-center !text-xl md:!text-3xl lg:!text-4xl text-white">
          {t("title")}
        </h2>
        <div className="flex items-center gap-2 text-white md:gap-4 mt-4 md:mt-6">
          <Image
            src={response?.league?.logo || ""}
            alt="league logo"
            width={1000}
            height={1000}
            quality={90}
            className="w-8 lg:w-10"
          />
          <p className="md:text-xl lg:text-2xl xl:text-xl font-medium">
            {response?.league?.name}
          </p>
        </div>
      </div>
      {/* Body */}
      <div className="pt-8 flex flex-col gap-10 mx-auto text-white max-w-md">
        {/* Teams */}
        <div className="flex items-center justify-between gap-2 md:gap-4 w-full">
          {/* Home Team */}
          <Image
            alt="Home Team"
            src={response?.teams?.home?.logo || "/team-default.png"}
            width={200}
            height={200}
            className="w-[50px] md:w-[100px]"
          />
          {/* VS Image */}
          <Image
            alt="VS Image"
            src="/images/gameplay/prediction/vs.png"
            width={100}
            height={100}
            className="w-[50px] !h-auto"
          />
          {/* Away Team */}
          <Image
            alt="Away Team"
            src={response?.teams?.away?.logo || "/team-default.png"}
            width={200}
            height={200}
            className="w-[50px] md:w-[100px]"
          />
        </div>

        <div className="flex flex-col items-center gap-2 justify-center text-lg md:text-2xl font-semibold">
          {!(
            response.prediction?.away_score === response.prediction?.home_score
          ) && <span className="rtl:-order-1">{t("victory")}</span>}
          <span>{getWinner()}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="btn bg-gradient-primary mt-4 mx-auto text-lg !px-16 !rounded-full"
          onClick={() => router.push("/fixtures")}
        >
          {t("exit")}
        </motion.button>
      </div>
    </div>
  );
}
