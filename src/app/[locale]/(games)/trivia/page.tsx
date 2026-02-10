"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import TriviaGameStep from "./_Steps/Game";
import TriviaCompletedStep from "./_Steps/Completed";
import GameRulesStep from "../_Steps/Rules";
import GameInsufficientCoinsStep from "../_Steps/InsufficientCoins";
import GameInsufficientJokerStep from "../_Steps/InsufficientJoker";
import GameJokerActiveStep from "../_Steps/JokerActive";
import GameJokerCheckStep from "../_Steps/JokerCheck";
import { triviaShowFetch } from "@/lib/api/trivia/show";
import { PredictionStepProps } from "@/utils/types/Prediction";
import {
  TriviaConfig,
  TriviaQuestion,
  TriviaResult,
} from "@/utils/types/Trivia";
import { triviaStartGameFetch } from "@/lib/api/trivia/startGame";

export default function TriviaPage() {
  const [step, setStep] = useState<PredictionStepProps>("completed");
  const [joker, setJoker] = useState<boolean>(false);
  const [config, setConfig] = useState<TriviaConfig | null>(null);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [completedData, setCompletedData] = useState<TriviaResult | null>({
    total_que: 10,
    correct_que: 7,
    points: 70,
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch trivia show
  useEffect(() => {
    const fetchConfig = async () => {
      setLoading(true);
      const res = await triviaShowFetch();
      if (res?.status) {
        setConfig(res?.data);
      }
      setLoading(false);
    };
    fetchConfig();
  }, []);

  // Get Questions when user start game
  useEffect(() => {
    if (step === "game" && questions.length === 0) {
      const fetchQuestions = async () => {
        setLoading(true);
        const res = await triviaStartGameFetch(joker);
        if (res?.status) {
          setQuestions(res?.data);
        }
        setLoading(false);
      };
      fetchQuestions();
    }
  }, [step, joker, questions.length]);

  // Reset data when back to rules to allow re-play
  useEffect(() => {
    if (step === "rules") {
      setQuestions([]);
      setCompletedData(null);
    }
  }, [step]);

  const renderStep = (s: PredictionStepProps) => {
    switch (s) {
      case "rules":
        return (
          <GameRulesStep
            setStep={setStep}
            config={config?.rules || ""}
            type="trivia"
          />
        );
      case "joker-check":
        return <GameJokerCheckStep setStep={setStep} setJoker={setJoker} />;
      case "joker-active":
        return <GameJokerActiveStep setStep={setStep} />;
      case "insufficient-joker":
        return <GameInsufficientJokerStep setStep={setStep} />;
      case "insufficient-coins":
        return <GameInsufficientCoinsStep />;
      case "game":
        return (
          <TriviaGameStep
            setStep={setStep}
            questions={questions}
            setData={setCompletedData}
            loading={loading}
          />
        );
      case "completed":
        return (
          <TriviaCompletedStep
            data={completedData}
            zee_coins={config?.zee_coins || 0}
            setStep={setStep}
          />
        );
    }
  };
  return (
    <div
      className={`bg-center bg-cover bg-no-repeat bg-[url('/images/gameplay/trivia/trivia-bg.png')] min-h-screen flex items-center justify-center w-full`}
    >
      <AnimatePresence>{renderStep(step)}</AnimatePresence>
    </div>
  );
}
