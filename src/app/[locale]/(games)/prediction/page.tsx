"use client";
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css";
import usePredictionsConfig from '@/lib/tanstack/Predictions/useConfig';
import { AnimatePresence } from 'framer-motion';
import GameRulesStep from '../_Steps/Rules';
import GameInsufficientJokerStep from '../_Steps/InsufficientJoker';
import GameJokerCheckStep from '../_Steps/JokerCheck';
import GameJokerActiveStep from '../_Steps/JokerActive';
import GameInsufficientCoinsStep from '../_Steps/InsufficientCoins';
import { TriviaStepProps } from '@/utils/types&schemas/Trivia/TriviaStep';
import ErrorBoundary from '@/hooks/ErrorBoundary';
import { useRouter, useSearchParams } from 'next/navigation';
import FixtureGameStep from './_Steps/Game';
import usePredictionsShow from '@/lib/tanstack/Predictions/useShow';
import { FixtureProps } from '@/utils/types&schemas/Predictions/Fixture';
import FixtureCompletedStep from './_Steps/Completed';



export default function PredictitionsGame() {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id') ?? undefined;
  const router = useRouter();

  const { data: config, ...configMethods } = usePredictionsConfig();
  const rules = config?.data?.data || {};
  const { data, ...methods } = usePredictionsShow(id);
  const response: FixtureProps = data?.data?.data || {};

  const [step, setStep] = useState<TriviaStepProps>("rules");
  const [joker, setJoker] = useState<boolean>(false);
  /* const [completedData,setCompletedData] = useState(null); */


  useEffect(() => {
    if (!!!id) router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const renderStep = (s: TriviaStepProps) => {
    switch (s) {
      case "rules":
        return <ErrorBoundary {...configMethods}>
          <GameRulesStep isPredicted={response?.check_prediction} setStep={setStep} config={rules?.rules} type='fixture' />
        </ErrorBoundary>
      case "joker-check":
        return <GameJokerCheckStep setStep={setStep} setJoker={setJoker} />
      case "joker-active":
        return <GameJokerActiveStep setStep={setStep} />
      case "insufficient-joker":
        return <GameInsufficientJokerStep setStep={setStep} />
      case "insufficient-coins":
        return <GameInsufficientCoinsStep />
      case "game":
        return <ErrorBoundary {...methods}>
          <FixtureGameStep joker={joker} setStep={setStep} id={id} data={response} />
        </ErrorBoundary>
      case "completed":
        return <ErrorBoundary {...methods}>
          <FixtureCompletedStep data={response} />
        </ErrorBoundary>
    }
  }
  return (
    <div className={`${styles.container}`}>
      <AnimatePresence>
        {renderStep(step)}
      </AnimatePresence>
    </div>
  )
}
