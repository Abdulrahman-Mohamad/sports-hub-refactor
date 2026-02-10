"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import JoinGameModal from "./JoinModal";
import GamesInsufficientModal from "./InsufficientModal";

export default function GameModal({
  zee_coins,
  game_url,
  type,
  isOpen,
  onClose,
  predictionId,
  onSuccess,
}: {
  zee_coins: string | number;
  game_url?: string;
  type: "trivia" | "prediction" | "shot_on_net";
  isOpen: boolean;
  onClose: () => void;
  predictionId?: string | number | null;
  onSuccess?: () => void;
}) {
  const [step, setStep] = useState<"check" | "insufficient">("check");
  const handleClose = () => {
    setStep("check");
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="mx-4">
      <>
        {step === "check" ? (
          <JoinGameModal
            type={type}
            zee_coins={zee_coins}
            game_url={game_url}
            onClose={onClose}
            setStep={setStep}
            predictionId={predictionId}
            onSuccessProp={onSuccess}
          />
        ) : (
          <GamesInsufficientModal onClose={onClose} setStep={setStep} />
        )}
      </>
    </Modal>
  );
}
