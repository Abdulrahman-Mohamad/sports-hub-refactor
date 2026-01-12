"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
  otpModal: boolean;
  posterModal: boolean;
  openOTP: () => void;
  closeOTP: () => void;
  openPoster: () => void;
  closePoster: () => void;
}

const defaultAppState = {
  otpModal: false,
  posterModal: false,
  openOTP: () => {},
  closeOTP: () => {},
  openPoster: () => {},
  closePoster: () => {},
};

const AppContext = createContext<AppState>(defaultAppState);

export function AppProvider({ children }: { children: ReactNode }) {
  const [otpModal, setOtpModal] = useState(false);
  const [posterModal, setPosterModal] = useState(false);

  const value: AppState = {
    otpModal,
    posterModal,
    openOTP: () => setOtpModal(true),
    closeOTP: () => setOtpModal(false),
    openPoster: () => setPosterModal(true),
    closePoster: () => setPosterModal(false),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
