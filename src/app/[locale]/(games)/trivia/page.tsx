"use client";
import { useState } from 'react'
import styles from "./styles.module.css";
import useTriviaShow from '@/lib/tanstack/Trivia/useShow';
import ErrorBoundary from '@/hooks/ErrorBoundary';
import { TriviaStepProps } from '@/utils/types&schemas/Trivia/TriviaStep';
import { AnimatePresence } from 'framer-motion';
import TriviaGameStep from './_Steps/Game';
import TriviaCompletedStep from './_Steps/Completed';
import GameRulesStep from '../_Steps/Rules';
import GameInsufficientCoinsStep from '../_Steps/InsufficientCoins';
import GameInsufficientJokerStep from '../_Steps/InsufficientJoker';
import GameJokerActiveStep from '../_Steps/JokerActive';
import GameJokerCheckStep from '../_Steps/JokerCheck';

export default function TriviaPage() {
    const [joker, setJoker] = useState<boolean>(false);
    const [completedData, setCompletedData] = useState(null);

    const { data, ...methods } = useTriviaShow();
    const rules = data?.data?.data;
    const [step, setStep] = useState<TriviaStepProps>("rules");
    const renderStep = (s: TriviaStepProps) => {
        switch (s) {
            case "rules":
                return <GameRulesStep setStep={setStep} config={rules?.rules} type='trivia' />
            case "joker-check":
                return <GameJokerCheckStep setStep={setStep} setJoker={setJoker} />
            case "joker-active":
                return <GameJokerActiveStep setStep={setStep} />
            case "insufficient-joker":
                return <GameInsufficientJokerStep setStep={setStep} />
            case "insufficient-coins":
                return <GameInsufficientCoinsStep />
            case "game":
                return <TriviaGameStep setStep={setStep} joker={joker} setData={setCompletedData} />
            case "completed":
                return <TriviaCompletedStep data={completedData} zee_coins={rules?.zee_coins} />
        }
    }
    return (
        <div className={`${styles.container}`}>
            <ErrorBoundary {...methods}>
                <AnimatePresence>
                    {renderStep(step)}
                </AnimatePresence>
            </ErrorBoundary>
        </div>
    )
}


