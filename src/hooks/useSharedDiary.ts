import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

export type DiaryEntry = {
  id: string;
  user_id: string;
  entry_date: string;
  body: string;
  mood: string | null;
  created_at: string;
  updated_at: string;
};

/**
 * Diário compartilhado: a pessoa lê/escreve as próprias entradas.
 * Para ler as entradas do par, passar `targetUserId` = id do parceiro.
 */
export function useSharedDiary(targetUserId: string | null) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!targetUserId) {
      setEntries([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("shared_diary")
      .select("*")
      .eq("user_id", targetUserId)
      .order("entry_date", { ascending: false })
      .limit(30);
    setEntries((data as DiaryEntry[]) ?? []);
    setLoading(false);
  }, [targetUserId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Realtime: atualiza quando o par escreve
  useEffect(() => {
    if (!targetUserId) return;
    const ch = supabase
      .channel(`diary-${targetUserId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "shared_diary", filter: `user_id=eq.${targetUserId}` },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [targetUserId, refresh]);

  const upsertToday = async (body: string, mood?: string) => {
    if (!user) return { ok: false };
    const today = format(new Date(), "yyyy-MM-dd");
    const { error } = await supabase
      .from("shared_diary")
      .upsert(
        { user_id: user.id, entry_date: today, body: body.trim().slice(0, 1000), mood: mood ?? null },
        { onConflict: "user_id,entry_date" },
      );
    if (!error) await refresh();
    return { ok: !error };
  };

  const todayEntry = entries.find(
    (e) => e.entry_date === format(new Date(), "yyyy-MM-dd"),
  );

  return { entries, todayEntry, loading, upsertToday, refresh };
}
