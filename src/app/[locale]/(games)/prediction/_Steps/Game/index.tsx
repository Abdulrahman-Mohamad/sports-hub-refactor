import { FixtureProps } from "@/utils/types&schemas/Predictions/Fixture";
import { TriviaStepProps } from "@/utils/types&schemas/Trivia/TriviaStep";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import usePredictionCreatePrediction from "@/lib/tanstack/Predictions/useCreatePredictions";
import usePredictionUpdatePrediction from "@/lib/tanstack/Predictions/useUpdatePredictions";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

export default function FixtureGameStep({
  setStep,
  joker,
  id,
  data: response,
}: {
  setStep: (step: TriviaStepProps) => any;
  joker: boolean;
  id: string | undefined;
  data: FixtureProps;
}) {
  const [isDraw, setIsDraw] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isAway, setIsAway] = useState(false);
  const t = useTranslations("pages.prediction_game.game");
  const { register, reset, handleSubmit, setValue } = useForm({
    defaultValues: {
      use_joker: joker,
      fixture_id: id,
      home_score: 0,
      away_score: 0,
      draw_score: 0,
    },
  });

  const onSuccess = () => {
    setStep("completed");
  };
  const onError = (e: any) => {
    toast.error(e?.response?.data?.message || "Error Occurred");
  };

  const createPrediction = usePredictionCreatePrediction({
    onSuccess,
    onError,
  });
  const updatePrediction = usePredictionUpdatePrediction({
    onSuccess,
    onError,
  });

  const onSubmit = (data: any) => {
    if (!isHome && !isAway && !isDraw) {
      toast.error("Please select an outcome");
      return;
    }

    const finalData = { ...data };

    if (isDraw) {
      finalData.home_score = data.draw_score;
      finalData.away_score = data.draw_score;
    }

    // Validation
    const home = Number(finalData.home_score);
    const away = Number(finalData.away_score);

    if (isHome && home <= away) {
      toast.error("Home score must be greater than away score for a home win");
      return;
    }
    if (isAway && away <= home) {
      toast.error("Away score must be greater than home score for an away win");
      return;
    }
    if (isDraw && home !== away) {
      // This shouldn't happen with the current logic but good for safety
      toast.error("Scores must be equal for a draw");
      return;
    }
    delete finalData.draw_score;

    if (response?.check_prediction) {
      updatePrediction.mutate(finalData);
    } else {
      createPrediction.mutate(finalData);
    }
  };

  useEffect(() => {
    if (response?.check_prediction) {
      reset({
        home_score: response?.prediction?.home_score,
        away_score: response?.prediction?.away_score,
        fixture_id: id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="rounded-xl mx-6 border-greenblue bg-darkGunmetalA2 ring-2 ring-[#FCDE02]/20 p-4 md:p-8 !py-12 w-full max-w-3xl">
      {/* Header */}
      <div className=" border bg-darkGunmetalA3 rounded-lg flex items-center justify-center py-4">
        <h2 className="text-white font-medium text-center text-xl  md:text-2xl">
          {t("title")}
        </h2>
      </div>
      {/* Body */}
      <form
        className=" pt-8 flex flex-col gap-10  max-w-3xl mx-auto text-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Teams */}
        <div className="flex items-stretch justify-between gap-2 md:gap-4 w-full">
          {/* Home Team */}
          <div className="border bg-darkGunmetalA3 rounded-lg flex md:items-center flex-col gap-2 justify-center flex-1 py-4">
            <div className="flex flex-col items-center w-full md:flex-row justify-between gap-4 p-6 md:p-4 h-full">
              <Image
                alt="Home Team"
                src={response?.teams?.home?.logo || "/team-default.png"}
                width={200}
                height={200}
                className="w-[50px] md:w-[75px]"
              />

              <span className="font-medium text-sm md:text-lg">
                {response?.teams?.home?.name}
              </span>
            </div>
            <span
              onClick={() => {
                setIsHome(true);
                setIsDraw(false);
                setIsAway(false);
                setValue("draw_score", 0);
              }}
              className={` text-center rounded mx-3  border-2 md:w-3/4 hover:cursor-pointer font-medium py-1
            ${isHome ? "bg-gradient-bluegreenA1" : "bg-white text-black"}`}
            >
              {t("vector")}
            </span>
          </div>
          {/* VS Image */}
          <div className="flex flex-col items-center justify-between gap-6 py-4">
            <div />
            <Image
              alt="VS Image"
              src="/images/gameplay/prediction-vs.png"
              width={100}
              height={100}
              className="w-[50px] !h-auto"
            />
            <span
              onClick={() => {
                setIsHome(false);
                setIsDraw(true);
                setIsAway(false);
                setValue("home_score", 0);
                setValue("away_score", 0);
              }}
              className={` text-center rounded mx-3  border-2 px-2 md:px-10 hover:cursor-pointer font-medium py-1
            ${isDraw ? "bg-gradient-bluegreenA1" : "bg-white text-black"}`}
            >
              {t("draw")}
            </span>
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
              <span className="font-medium text-sm md:text-lg md:-order-1">
                {response?.teams?.away?.name}
              </span>
            </div>
            <span
              onClick={() => {
                setIsAway(true);
                setIsDraw(false);
                setIsHome(false);
                setValue("draw_score", 0);
              }}
              className={` text-center rounded mx-3 border-2 md:w-3/4 hover:cursor-pointer font-medium py-1
            ${isAway ? "bg-gradient-bluegreenA1 " : "bg-white text-black"}`}
            >
              {t("vector")}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          {(isHome || isAway) && (
            <>
              <div className="flex flex-col items-center gap-2">
                <input
                  type="number"
                  min={0}
                  {...register("home_score", { required: true, min: 0 })}
                  className="w-28 h-12 bg-darkGunmetalA3 border rounded-lg text-center text-xl font-bold focus:border-greenA1 outline-none"
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <input
                  type="number"
                  min={0}
                  {...register("away_score", { required: true, min: 0 })}
                  className="w-28 h-12 bg-darkGunmetalA3 border rounded-lg text-center text-xl font-bold focus:border-greenA1 outline-none"
                />
              </div>
            </>
          )}
          {isDraw && (
            <div className="flex flex-col items-center gap-2 w-full">
              <input
                type="number"
                min={0}
                {...register("draw_score", { required: true, min: 0 })}
                className="w-28 h-12 bg-darkGunmetalA3 border rounded-lg text-center text-xl font-bold focus:border-greenA1 outline-none"
              />
            </div>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="btn bg-gradient-bluegreenA1 border-2 mt-4 mx-auto !px-10"
        >
          {t("button")}
        </motion.button>
      </form>
    </div>
  );
}
