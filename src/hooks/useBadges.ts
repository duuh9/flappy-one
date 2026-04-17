import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useDailyLogs } from "@/hooks/useDailyLogs";
import { useQuizzes } from "@/hooks/useQuizzes";
import { usePartner } from "@/hooks/usePartner";
import { BADGES, type Badge, type BadgeStats } from "@/lib/badges";

export type UnlockedBadgeRow = {
  badge_id: string;
  unlocked_at: string;
};

/**
 * Detecta novas conquistas comparando estado atual vs badges já no banco,
 * persiste o desbloqueio e expõe a lista de "recém-desbloqueados" para o
 * UI mostrar uma animação/toast.
 */
export function useBadges() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { logs } = useDailyLogs();
  const { attempts } = useQuizzes();
  const { partnerId } = usePartner();
  const [unlockedRows, setUnlockedRows] = useState<UnlockedBadgeRow[]>([]);
  const [justUnlocked, setJustUnlocked] = useState<Badge[]>([]);
  const [hasMessages, setHasMessages] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setUnlockedRows([]);
      return;
    }
    const { data } = await supabase
      .from("user_badges")
      .select("badge_id, unlocked_at");
    setUnlockedRows((data as UnlockedBadgeRow[]) ?? []);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  // Verifica se já enviou mensagem (para o badge "sweet-words")
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { count } = await supabase
        .from("partner_messages")
        .select("*", { count: "exact", head: true })
        .eq("sender_id", user.id);
      setHasMessages((count ?? 0) > 0);
    })();
  }, [user, partnerId]);

  const stats: BadgeStats = {
    streak: profile?.streak ?? 0,
    points: profile?.points ?? 0,
    totalLogs: logs.length,
    totalQuizzes: attempts.length,
    hasPartner: !!partnerId,
    hasMessages,
  };

  // Detecta novos desbloqueios e persiste
  useEffect(() => {
    if (!user) return;
    const knownIds = new Set(unlockedRows.map((r) => r.badge_id));
    const newOnes = BADGES.filter((b) => b.check(stats) && !knownIds.has(b.id));
    if (newOnes.length === 0) return;

    (async () => {
      const { data } = await supabase
        .from("user_badges")
        .insert(newOnes.map((b) => ({ user_id: user.id, badge_id: b.id })))
        .select("badge_id, unlocked_at");
      if (data) {
        setUnlockedRows((prev) => [...prev, ...(data as UnlockedBadgeRow[])]);
        setJustUnlocked(newOnes);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.streak, stats.points, stats.totalLogs, stats.totalQuizzes, stats.hasPartner, stats.hasMessages]);

  const clearJustUnlocked = useCallback(() => setJustUnlocked([]), []);

  const isUnlocked = (id: string) => unlockedRows.some((r) => r.badge_id === id);

  return {
    badges: BADGES,
    unlockedRows,
    isUnlocked,
    justUnlocked,
    clearJustUnlocked,
    stats,
  };
}
