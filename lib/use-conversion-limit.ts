"use client";

import { useState, useCallback } from "react";
import { hasReachedLimit, incrementConversion } from "@/lib/conversion-limit";

export function useConversionLimit() {
  const [showPricingModal, setShowPricingModal] = useState(false);

  const checkLimit = useCallback((): boolean => {
    if (hasReachedLimit()) {
      setShowPricingModal(true);
      return false;
    }
    return true;
  }, []);

  const onConversionSuccess = useCallback(() => {
    incrementConversion();
  }, []);

  return {
    showPricingModal,
    setShowPricingModal,
    checkLimit,
    onConversionSuccess,
  };
}