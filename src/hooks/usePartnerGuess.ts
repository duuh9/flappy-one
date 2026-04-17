import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

export type Guess = {
  id: string;
  guesser_id: string;
  about_id: string;
  guess_date: string;
  mood: string;
  mood_intensity: number | null;
  created_at: string;
};

/**
 * Palpite diário do parceiro sobre o humor dela.
 * Carrega o palpite de hoje (se houver) + últimos 14 dias para histórico.
 */
export function usePartnerGuess(partnerId: string | null) {
  const { user } = useAuth();
  const [todayGuess, setTodayGuess] = useState<Guess | null>(null);
  const [history, setHistory] = useState<Guess[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user || !partnerId) {
      setTodayGuess(null);
      setHistory([]);
      setLoading(false);
      return;
    }
    const today = format(new Date(), "yyyy-MM-dd");
    const { data } = await supabase
      .from("partner_guesses")
      .select("*")
      .eq("guesser_id", user.id)
      .order("guess_date", { ascending: false })
      .limit(14);
    const arr = (data as Guess[]) ?? [];
    setHistory(arr);
    setTodayGuess(arr.find((g) => g.guess_date === today) ?? null);
    setLoading(false);
  }, [user, partnerId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const submit = async (mood: string, intensity?: number) => {
    if (!user || !partnerId) return { ok: false };
    const today = format(new Date(), "yyyy-MM-dd");
    const { error } = await supabase
      .from("partner_guesses")
      .upsert(
        {
          guesser_id: user.id,
          about_id: partnerId,
          guess_date: today,
          mood,
          mood_intensity: intensity ?? null,
        },
        { onConflict: "guesser_id,guess_date" },
      );
    if (!error) await refresh();
    return { ok: !error };
  };

  return { todayGuess, history, loading, submit, refresh };
}
