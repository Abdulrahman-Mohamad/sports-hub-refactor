import useTriviaStartGame from '@/lib/tanstack/Trivia/useStartGame';
import { TriviaStepProps } from '@/utils/types&schemas/Trivia/TriviaStep';
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from 'next/image';
import ErrorBoundary from '@/hooks/ErrorBoundary';
import { useForm } from 'react-hook-form';
import useTriviaEndGame from '@/lib/tanstack/Trivia/useEndGame';
import { toast } from 'react-toastify';

type AnswerProps = {
    id: string | number;
    answer: string;
    media: string | null;
    que_id: string | number;
}

type QuestionProps = {
    id: number | string;
    question: string;
    media: string | null;
    answers: AnswerProps[];
}

export default function TriviaGameStep({
    joker,
    setStep,
    setData
}: {
    joker: boolean;
    setStep: (step: TriviaStepProps) => any;
    setData: (data: any) => any;
}) {
    const { data, ...methods } = useTriviaStartGame({ use_joker: joker });
    const questions = data?.data?.data || [];
    const [timer, setTimer] = useState(30);
    const swiperRef = useRef<any>(null);
    const totalSlides = questions.length;
    const [activeIndex, setActiveIndex] = useState(0);
    const { setValue, watch } = useForm({});

    const onSuccess = (data: any) => {
        console.log(data);
        const response = data?.data?.data;
        console.log(response);
        setData(response);
        setStep("completed")
    };
    const onError = (e: any) => {
        toast.error(e?.response?.data?.message || "Error Occurred");
    }

    const endGame = useTriviaEndGame({ onSuccess, onError });
    const finishedRef = useRef(false);

    const onComplete = (data?: any) => {
        console.log("complete", watch());
        if (finishedRef.current) return; // guard against multiple calls
        finishedRef.current = true;
        const payload = data ?? watch();
        console.log("complete", payload);
        endGame.mutate(payload);
    }
    /* console.log(watch()); */
    /* console.log(activeIndex); */

    const onSelect = (answer: AnswerProps) => {
        /* console.log(answer); */
        setValue(`game_result.${activeIndex}`, {
            que_id: answer.que_id,
            ans_id: answer.id
        });
        goNext();
    }
    const onSlideChange = (s: any) => {
        setActiveIndex(s.activeIndex);
        /* console.log(s); */
        setTimer(30);
    }
    const goNext = () => {
        const swiper = swiperRef.current;
        const idx = (swiper?.activeIndex ?? activeIndex ?? 0);

        // if we're on the last slide, finish the game
        if (idx >= Math.max(0, totalSlides - 1)) {
            onComplete();
            return;
        }

        // otherwise move to next slide and reset timer
        if (swiper) {
            swiper.slideNext();
            setTimer(30);
        }
    };
    // handler when time reaches zero
    const handleTimeUp = () => {
        const swiper = swiperRef.current;
        // determine current index (prefer actual swiper index if available)
        const idx = (swiper?.activeIndex ?? activeIndex ?? 0);
        // mark current question as unanswered (ans_id: null)
        const currentQuestion = questions?.[idx];
        if (currentQuestion) {
            setValue(`game_result.${idx}`, {
                que_id: currentQuestion.id,
                ans_id: null
            });
        }

        /* const activeIndex = swiper.activeIndex ?? 0; */
        if (idx < Math.max(0, totalSlides - 1)) {
            swiper.slideNext();
            setTimer(30); // reset timer after moving next
        } else {
            // last slide: run provided function (or fallback to setStep)
            onComplete();
        }
    };
    // interval to decrement timer
    useEffect(() => {
        if (totalSlides === 0) return;
        const id = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    // time will reach zero -> handle and return reset value
                    // use timeout to ensure state updates in order
                    setTimeout(() => handleTimeUp(), 0);
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalSlides, swiperRef.current]); // rerun if questions change

    return (
        <div className='space-y-4'>
            <div className='py-3 text-center bg-darkGunmetalA2 border-greenblue text-white font-digital rounded-lg font-bold text-2xl w-fit px-16 mx-auto'>00:{timer}</div>
            <ErrorBoundary {...methods}>
                <form className='max-w-[100vw] px-4 md:px-0'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        onSlideChange={onSlideChange}
                        onSwiper={(s) => (swiperRef.current = s)} // <--- ensure ref is set
                        modules={[Pagination]}
                        className="max-w-screen-md"
                        allowTouchMove={false}        // disable user swipe/drag
                        simulateTouch={false}        // avoid simulated touch
                        preventInteractionOnTransition={true} // safer during programmatic moves
                    /* pagination={{ clickable: false }} */
                    >
                        {questions?.map((q: QuestionProps) => (
                            <SwiperSlide key={q?.id} className='mb-4 py-2  px-1 !h-auto'>
                                <Question question={q} onSelect={onSelect} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </form>
            </ErrorBoundary>
            {/* <Question /> */}
        </div>
    )
}


const Question = ({ question, onSelect }: {
    question: QuestionProps;
    onSelect: (answer: AnswerProps) => any;
}) => {
    return (
        <div className='rounded-xl mx-6 border-greenblue bg-darkGunmetalA2 ring-2 ring-[#FCDE02]/20 p-6'>
            <div className='w-full p-4 bg-darkGunmetalA3 rounded-lg border'>
                <h3 className='text-white font-medium text-center text-2xl  md:text-3xl'>{question?.question}</h3>
            </div>
            <div className=' py-3 flex flex-col gap-8  flex-grow'>
                {
                    question.media &&
                    <div className='flex justify-center'>
                        <Image
                            src={question.media}
                            alt={question.question}
                            className='w-[250px] h-auto'
                            width={300}
                            height={300}
                        />
                    </div>
                }
                <div className='grid grid-cols-2 gap-4'>
                    {
                        question?.answers?.map((a) => {
                            return <Answer answer={a} key={a?.id} onSelect={onSelect} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const Answer = ({ answer, onSelect }: {
    answer: AnswerProps,
    onSelect: (answer: AnswerProps) => any;
}) => {
    return (
        <label className='border bg-darkGunmetalA3 rounded-lg p-3 flex gap-3 hover:border-greenA1 hover:cursor-pointer text-white' htmlFor={`${answer?.answer}-${answer?.id}`}>
            {
                answer?.media &&
                <div className='flex-shrink-0'>
                    <Image
                        src={answer.media}
                        alt={answer?.answer}
                        className='w-[70px] h-auto'
                        width={100}
                        height={200}
                    />
                </div>
            }
            <div className='flex-grow text-center text-lg'>{answer?.answer}</div>
            <input
                id={`${answer?.answer}-${answer?.id}`}
                type='radio'
                name='answers'
                onChange={() => onSelect(answer)}
                hidden
            />
        </label>
    )
}