import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TriviaAnswer, TriviaQuestion } from "@/utils/types/Trivia";
import { PredictionStepProps } from "@/utils/types/Prediction";
import { triviaEndGameFetch } from "@/lib/api/trivia/endGame";

export default function TriviaGameStep({
  setStep,
  setData,
  questions,
  loading,
}: {
  setStep: (step: PredictionStepProps) => any;
  setData: (data: any) => any;
  questions: TriviaQuestion[];
  loading: boolean;
}) {
  const [timer, setTimer] = useState(30);
  const swiperRef = useRef<any>(null);
  const totalSlides = questions.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const { setValue, watch } = useForm({});

  const finishedRef = useRef(false);

  const onComplete = async (data?: any) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const payload = data ?? watch();

    try {
      const res = await triviaEndGameFetch(payload);
      if (res?.status) {
        setData(res.data);
        setStep("completed");
      } else {
        toast.error(res?.message || "Error ending game");
        setStep("rules");
      }
    } catch (error) {
      console.error("End Game Error", error);
      setStep("rules");
    }
  };

  const onSelect = (answer: TriviaAnswer, questionId: number) => {
    setValue(`game_result.${activeIndex}`, {
      que_id: questionId,
      ans_id: answer.id,
    });
    goNext();
  };

  const goNext = () => {
    const swiper = swiperRef.current;
    const idx = swiper?.activeIndex ?? activeIndex ?? 0;

    if (idx >= Math.max(0, totalSlides - 1)) {
      onComplete();
      return;
    }

    if (swiper) {
      swiper.slideNext();
      setTimer(30);
    }
  };

  const handleTimeUp = () => {
    const swiper = swiperRef.current;
    const idx = swiper?.activeIndex ?? activeIndex ?? 0;
    const currentQuestion = questions?.[idx];
    if (currentQuestion) {
      setValue(`game_result.${idx}`, {
        que_id: currentQuestion.id,
        ans_id: null,
      });
    }

    if (idx < totalSlides - 1) {
      swiper.slideNext();
      setTimer(30);
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    if (totalSlides === 0 || loading) return;
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setTimeout(() => handleTimeUp(), 0);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides, loading, activeIndex]);

  const onSlideChange = (s: any) => {
    setActiveIndex(s.activeIndex);
    setTimer(30);
  };

  return (
    <div className="space-y-4">
      <div className="fixed bottom-10 left-10 md:bottom-20 md:left-20 flex items-center justify-center pointer-events-none">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          {/* صورة الساعة كخلفية */}
          <Image
            src="/images/gameplay/trivia/watch.png"
            alt="Timer"
            fill
            className="object-contain"
          />
          {/* الرقم في المنتصف */}
          <span className="absolute inset-0 flex items-center justify-center text-black font-bold text-2xl md:text-3xl pb-2">
            {timer}
          </span>
        </div>
      </div>
      <form className="max-w-[100vw] px-4 md:px-0">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          onSlideChange={onSlideChange}
          onSwiper={(s) => (swiperRef.current = s)}
          modules={[Pagination]}
          className="max-w-screen-md"
          allowTouchMove={false}
          simulateTouch={false}
          preventInteractionOnTransition={true}
        >
          {questions?.map((q: TriviaQuestion) => (
            <SwiperSlide key={q?.id} className="mb-4 py-2  px-1 !h-auto">
              <Question question={q} onSelect={(ans) => onSelect(ans, q.id)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </form>
    </div>
  );
}

const Question = ({
  question,
  onSelect,
}: {
  question: TriviaQuestion;
  onSelect: (answer: TriviaAnswer) => any;
}) => {
  return (
    <div className="rounded-xl bg-black/80 mx-6 p-6">
      <div className="w-full p-4 bg-[#F8F8F8] rounded-lg border">
        <h3 className="text-black font-medium text-center text-2xl  md:text-3xl">
          {question?.question}
        </h3>
      </div>
      <div className=" py-3 flex flex-col gap-8  flex-grow">
        {question.media && (
          <div className="flex justify-center">
            <Image
              src={question.media}
              alt={question.question}
              className="w-[250px] h-auto"
              width={300}
              height={300}
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          {question?.answers?.map((a) => {
            return <Answer answer={a} key={a?.id} onSelect={onSelect} />;
          })}
        </div>
      </div>
    </div>
  );
};

const Answer = ({
  answer,
  onSelect,
}: {
  answer: TriviaAnswer;
  onSelect: (answer: TriviaAnswer) => any;
}) => {
  return (
    <label
      className="border bg-[#F8F8F8] rounded-lg p-3 flex gap-3 text-black cursor-pointer"
      htmlFor={`${answer?.answer}-${answer?.id}`}
    >
      {answer?.media && (
        <div className="flex-shrink-0">
          <Image
            src={answer.media}
            alt={answer?.answer}
            className="w-[70px] h-auto"
            width={100}
            height={200}
          />
        </div>
      )}
      <div className="flex-grow text-center text-lg">{answer?.answer}</div>
      <input
        id={`${answer?.answer}-${answer?.id}`}
        type="radio"
        name="answers"
        onChange={() => onSelect(answer)}
        hidden
      />
    </label>
  );
};
