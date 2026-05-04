import { useCallback, useEffect, useRef, useState } from "react";
import { PredictionStepProps } from "@/utils/types/Prediction";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ItCompleteStartData } from "@/utils/types/ItComplete";
import { itCompleteEndGameFetch } from "@/lib/api/itComplete/endGame";
import Spinner from "@/components/ui/Spinner";

export default function ItCompleteGameStep({
  startData,
  setStep,
  setData,
  loading,
}: {
  startData: ItCompleteStartData | null;
  setStep: (step: PredictionStepProps) => void;
  setData: (data: any) => void;
  loading: boolean;
}) {
  const t = useTranslations("games.it_complete.steps.game");
  const [timeLeft, setTimeLeft] = useState(180);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSubmitted = useRef(false);

  const alphabet_char = startData?.alphabet_char;
  const categories = startData?.categories;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      game_result:
        categories?.map((cat: any) => ({ category_id: cat.id, ans: "" })) || [],
    },
  });

  const onSubmit = useCallback(
    async (formData: any) => {
      if (hasSubmitted.current) return;
      hasSubmitted.current = true;
      setIsSubmitting(true);

      try {
        const res = await itCompleteEndGameFetch(formData);
        if (res?.status) {
          setData(res.data);
          setStep("completed");
        } else {
          toast.error(res?.message || "Error Occurred");
          hasSubmitted.current = false;
          setIsSubmitting(false);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Error Occurred");
        setIsSubmitting(false);
        hasSubmitted.current = false;
      }
    },
    [setData, setStep]
  );

  useEffect(() => {
    if (!startData || isSubmitting) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [startData, isSubmitting]);

  useEffect(() => {
    if (timeLeft === 0 && !isSubmitting && !hasSubmitted.current) {
      handleSubmit(onSubmit)();
    }
  }, [timeLeft, isSubmitting, handleSubmit, onSubmit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (loading || !startData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-white flex flex-col w-full items-center justify-center p-4 max-w-5xl mx-auto"
    >
      {/* Timer */}
      <div
        className={`w-full text-center py-4 px-10 max-w-[65vw] bg-[#0E0011] border-2 border-[#D600FB] rounded-xl text-2xl font-bold
          md:max-w-[220px] md:text-3xl shadow-[0_0_15px_rgba(214,0,251,0.5)]
          ${timeLeft < 30 ? "text-red-500 animate-pulse" : "text-white"}
        `}
      >
        {formatTime(timeLeft)}
      </div>

      <div className="w-full mt-16 bg-[#0E0011]/80 backdrop-blur-md border-2 border-[#D600FB] rounded-2xl flex justify-center items-center relative shadow-[0_0_30px_rgba(214,0,251,0.3)]">
        {/* Alphabet Char */}
        <div
          className={`flex justify-center items-center bg-gradient-to-br from-[#D600FB] to-[#7000FF] p-4 rounded-full shadow-[0_0_20px_rgba(214,0,251,0.8)]
        w-24 h-24 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#0E0011]`}
        >
          <span className="text-white uppercase text-5xl font-black mb-1">
            {alphabet_char}
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:px-8 md:px-0 lg:px-14 pb-10"
        >
          <div
            className="w-full p-4 pt-20 flex flex-col items-center gap-4 justify-center
            md:flex-row md:flex-wrap md:gap-6"
          >
            {categories?.map((category: any, index: number) => (
              <div
                key={category.id}
                className="flex flex-col justify-around items-center gap-3 bg-[#1A0B22] border border-[#D600FB]/50 py-6 px-6 rounded-xl text-center w-full max-w-72 lg:min-h-40 
                lg:w-[calc(33.33%-16px)] shadow-[inset_0_0_20px_rgba(214,0,251,0.1)] hover:border-[#D600FB] transition-colors"
              >
                <label className="text-lg font-bold text-white tracking-wide">
                  {category.title}
                </label>

                <input
                  type="hidden"
                  {...register(`game_result.${index}.category_id`)}
                  value={category.id}
                />
                <input
                  type="text"
                  placeholder={t("placeholder", { title: category.title })}
                  className="w-full bg-[#0E0011] border border-gray-600 focus:border-[#D600FB] text-white text-center rounded-lg px-4 py-3 outline-none placeholder:text-gray-500 transition-colors"
                  {...register(`game_result.${index}.ans`)}
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-3 px-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="btn bg-gradient-primary w-full py-4 font-bold text-xl rounded-xl text-white
              md:w-fit md:mx-auto md:px-16 shadow-[0_0_15px_rgba(214,0,251,0.6)]
              lg:w-fit disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Spinner size={20} />
              ) : (
                t("submit")
              )}
            </motion.button>
          </div>
        </form>

      </div>
    </motion.div>
  );
}
