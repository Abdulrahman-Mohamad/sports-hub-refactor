"use client";
import React from "react";
import Spinner from "@/components/ui/Spinner";
import { useTranslations } from "next-intl";

type ApiStateProps = {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  error?: any;
  isEmpty?: boolean;
  emptyFallback?: React.ReactNode;
};

const ApiStateProvider = ({
  children,
  isLoading,
  isError,
  error,
  isEmpty,
  emptyFallback,
}: ApiStateProps) => {
  const t = useTranslations("common");

  if (isLoading) {
    return <Spinner className="my-10" />;
  }

  if (isError) {
    let errorMessage = t("error_occurred");
    try {
      if (error?.message) {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.error?.message || errorMessage;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      errorMessage = error?.message || errorMessage;
    }

    return (
      <div className="text-center my-10 font-bold text-statusError capitalize">
        {errorMessage}
      </div>
    );
  }

  if (isEmpty) {
    return (
      emptyFallback || (
        <div className="text-center my-10 text-gray-500 font-medium">
          {t("no_data")}
        </div>
      )
    );
  }

  return <>{children}</>;
};

ApiStateProvider.displayName = "ApiStateProvider";

export default React.memo(ApiStateProvider);
