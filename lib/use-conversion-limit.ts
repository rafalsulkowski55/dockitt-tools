"use client";

import { useState, useCallback } from "react";
import { hasReachedLimit, incrementConversion, setPendingDownload as setPending, getPendingDownload as getPending, clearPendingDownload as clearPending } from "@/lib/conversion-limit";
import { createClient } from "@/lib/supabase";

export function useConversionLimit() {
  const [showPricingModal, setShowPricingModal] = useState(false);

  async function hasActivePlan(): Promise<boolean> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: profile } = await supabase
      .from("profiles")
      .select("tier, pay_per_use_expires_at")
      .eq("id", user.id)
      .single();

    if (!profile) return false;
    if (profile.tier === "premium") return true;
    if (profile.tier === "pay_per_use" && profile.pay_per_use_expires_at) {
      return new Date(profile.pay_per_use_expires_at) > new Date();
    }
    return false;
  }

  // Stara nazwa — używana przed przetwarzaniem (zostawiamy dla kompatybilności ale zawsze zwraca true)
  const checkLimit = useCallback((): boolean => {
    return true;
  }, []);

  // Nowa nazwa — używana przy Download
  const checkDownloadLimit = useCallback(async (): Promise<boolean> => {
    const activePlan = await hasActivePlan();
    if (activePlan) return true;

    if (hasReachedLimit()) {
      setShowPricingModal(true);
      return false;
    }
    return true;
  }, []);

  const onConversionSuccess = useCallback(() => {
    incrementConversion();
  }, []);

  const setPendingDownload = useCallback(setPending, []);
  const getPendingDownload = useCallback(getPending, []);
  const clearPendingDownload = useCallback(clearPending, []);

  return {
    showPricingModal,
    setShowPricingModal,
    checkLimit,
    checkDownloadLimit,
    onConversionSuccess,
    setPendingDownload,
    getPendingDownload,
    clearPendingDownload,
  };
}