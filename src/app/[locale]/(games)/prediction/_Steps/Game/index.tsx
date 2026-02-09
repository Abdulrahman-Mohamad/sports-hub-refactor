import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { PredictionStepProps } from "@/utils/types/Prediction";
import { Prediction } from "@/utils/types/Fixtures/Fixture";
import { updatePredictionFetch } from "@/lib/api/prediction/updatePrediction";
import { makePredictionFetch } from "@/lib/api/prediction/makePrediction";

export default function PredictionGameStep({
  setStep,
  joker,
  id,
  data: response,
  onSuccessExecute,
}: {
  setStep: (step: PredictionStepProps) => any;
  joker: boolean;
  id: string | number | undefined;
  data: Prediction;
  onSuccessExecute: (home: number, away: number) => void;
}) {
  const t = useTranslations("games.prediction.steps.game");
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      use_joker: joker,
      fixture_id: id,
      home_score: 0,
      away_score: 0,
      draw_score: 0,
    },
  });

  const onSubmit = async (data: any) => {
    const home = Number(data.home_score);
    const away = Number(data.away_score);

    const payload = {
      home_score: home,
      away_score: away,
    };

    let res;
    if (response?.prediction) {
      res = await updatePredictionFetch(id as string, payload);
    } else {
      res = await makePredictionFetch({
        ...payload,
        fixture_id: Number(id),
        use_joker: joker ? 1 : 0,
      });
    }

    if (res?.status) {
      onSuccessExecute(home, away);
      toast.success(res.message);
      setStep("completed");
    } else {
      toast.error(res?.message || t("error_occurred"));
    }
  };

  useEffect(() => {
    if (response?.prediction) {
      reset({
        home_score:response.prediction.home_score,
        away_score:response.prediction.away_score,
        
      });
    }
  }, [response, reset]);

  return (
    <div className="rounded-xl mx-6 bg-black/50 p-4 md:p-8 !py-12 w-full max-w-3xl">
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
          <p className="md:text-xl lg:text-2xl xl:text-xl font-medium">{response?.league?.name}</p>
        </div>
      </div>
      {/* Body */}
      <form
        className="pt-8 flex flex-col gap-10 mx-auto text-white max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Teams */}
        <div className="flex items-center justify-between gap-2 md:gap-4 w-full">
          {/* Home Team */}
          <Image
            alt="Home Team"
            src={response?.teams?.home?.logo || ""}
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
            className="w-[50px]"
          />
          {/* Away Team */}
          <Image
            alt="Away Team"
            src={response?.teams?.away?.logo || ""}
            width={200}
            height={200}
            className="w-[50px] md:w-[100px]"
          />
            
        </div>

        <div className="flex items-center justify-between gap-4">
          <input
            type="number"
            min={0}
            {...register("home_score", { required: true, min: 0 })}
            className="w-28 h-12 bg-white border rounded-lg text-center text-xl font-bold text-black outline-none"
          />
          <div className="w-6 h-1 bg-white rounded-full"/>
          <input
            type="number"
            min={0}
            {...register("away_score", { required: true, min: 0 })}
            className="w-28 h-12 bg-white border rounded-lg text-center text-xl font-bold text-black outline-none"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="btn bg-gradient-primary mt-4 mx-auto !px-10 !rounded-full"
        >
          {t("anticipation")}
        </motion.button>
      </form>
    </div>
  );
}
