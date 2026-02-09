"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { AnimatePresence } from "framer-motion";
import GameRulesStep from "../_Steps/Rules";
import GameInsufficientJokerStep from "../_Steps/InsufficientJoker";
import GameJokerCheckStep from "../_Steps/JokerCheck";
import GameJokerActiveStep from "../_Steps/JokerActive";
import GameInsufficientCoinsStep from "../_Steps/InsufficientCoins";
import { useRouter, useSearchParams } from "next/navigation";
import { Prediction } from "@/utils/types/Fixtures/Fixture";
import { GamesConfigProps } from "@/utils/types/Games/GamesConfigProps";
import { predictionShowConfigFetch } from "@/lib/api/prediction/showConfig";
import { getPredictionMatchById } from "@/utils/helperFn/prediction/getPredictionMatchById";
import { PredictionStepProps } from "@/utils/types/Prediction";
import PredictionGameStep from "./_Steps/Game";
import PredictionCompletedStep from "./_Steps/Completed";

export default function PredictitionsGame() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const router = useRouter();

  const [step, setStep] = useState<PredictionStepProps>("rules");
  const [joker, setJoker] = useState<boolean>(false);
  const [match, setMatch] = useState<Prediction | null>(null);
  const [config, setConfig] = useState<GamesConfigProps | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      router.push("/fixtures");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [configRes, matchData] = await Promise.all([
          predictionShowConfigFetch(),
          getPredictionMatchById(id),
        ]);

        if (configRes?.status) {
          setConfig(configRes?.data);
        }

        if (matchData) {
          setMatch(matchData);
        } else {
          router.push("/fixtures");
        }
      } catch (error) {
        console.error("Fetch Data Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  const renderStep = (s: PredictionStepProps) => {
    if (!match || loading) return null;

    switch (s) {
      case "rules":
        return (
          <GameRulesStep
            isPredicted={match?.check_prediction}
            setStep={setStep}
            config={config?.rules || ""}
            type="prediction"
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
            <PredictionGameStep
              joker={joker}
              setStep={setStep}
              id={id!}
              data={match}
            />
        );
      case "completed":
        return (
            <PredictionCompletedStep data={match} />
        );
    }
  };
  return (
    <div className={`${styles.container}`}>
      <AnimatePresence>{renderStep(step)}</AnimatePresence>
    </div>
  );
}
