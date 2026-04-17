import { useCallback } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { POINTS } from "@/lib/points";

/**
 * Concede 1 ponto/dia pela leitura do insight do dia.
 * Idempotente — só pontua uma vez por dia.
 */
export function useInsightReward() {
  const { user } = useAuth();
  const { profile, update } = useProfile();

  const claim = useCallback(async () => {
    if (!user || !profile) return false;
    const today = format(new Date(), "yyyy-MM-dd");
    if (profile.last_insight_read_date === today) return false;
    await supabase
      .from("profiles")
      .update({
        last_insight_read_date: today,
        points: (profile.points ?? 0) + POINTS.INSIGHT_READ,
      })
      .eq("id", user.id);
    await update({ points: (profile.points ?? 0) + POINTS.INSIGHT_READ });
    return true;
  }, [user, profile, update]);

  return { claim };
}
