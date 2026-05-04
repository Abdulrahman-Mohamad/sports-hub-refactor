"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ItCompleteGameStep from "./_Steps/Game";
import ItCompleteCompletedStep from "./_Steps/Completed";
import GameRulesStep from "../_Steps/Rules";
import GameInsufficientCoinsStep from "../_Steps/InsufficientCoins";
import GameInsufficientJokerStep from "../_Steps/InsufficientJoker";
import GameJokerActiveStep from "../_Steps/JokerActive";
import GameJokerCheckStep from "../_Steps/JokerCheck";
import { PredictionStepProps } from "@/utils/types/Prediction";
import {
  ItCompleteConfig,
  ItCompleteResult,
  ItCompleteStartData,
} from "@/utils/types/ItComplete";
import { itCompleteShowFetch } from "@/lib/api/itComplete/show";
import { itCompleteStartGameFetch } from "@/lib/api/itComplete/startGame";

export default function ItCompletePage() {
  const [step, setStep] = useState<PredictionStepProps>("rules");
  const [joker, setJoker] = useState<boolean>(false);
  const [config, setConfig] = useState<ItCompleteConfig | null>(null);
  const [startData, setStartData] = useState<ItCompleteStartData | null>(null);
  const [completedData, setCompletedData] = useState<ItCompleteResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch it-complete show
  useEffect(() => {
    const fetchConfig = async () => {
      setLoading(true);
      const res = await itCompleteShowFetch();
      if (res?.status) {
        setConfig(res?.data);
      }
      setLoading(false);
    };
    fetchConfig();
  }, []);

  // Get Questions when user start game
  useEffect(() => {
    if (step === "game" && !startData) {
      const fetchStartData = async () => {
        setLoading(true);
        const res = await itCompleteStartGameFetch(joker);
        if (res?.status) {
          setStartData(res?.data);
        }
        setLoading(false);
      };
      fetchStartData();
    }
  }, [step, joker, startData]);

  // Reset data when back to rules to allow re-play
  useEffect(() => {
    if (step === "rules") {
      setStartData(null);
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
            type="it_complete"
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
          <ItCompleteGameStep
            setStep={setStep}
            startData={startData}
            setData={setCompletedData}
            loading={loading}
          />
        );
      case "completed":
        return (
          <ItCompleteCompletedStep
            data={completedData}
            zee_coins={config?.zee_coins || 0}
            setStep={setStep}
          />
        );
    }
  };
  return (
    <div
      className={`bg-center bg-cover bg-no-repeat bg-[url('/images/games/it_complete-bg.png')] min-h-screen flex items-center justify-center w-full`}
    >
      <AnimatePresence>{renderStep(step)}</AnimatePresence>
    </div>
  );
}
