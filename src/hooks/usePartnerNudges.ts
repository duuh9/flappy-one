import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type Nudge = {
  id: string;
  sender_id: string;
  recipient_id: string;
  emoji: string;
  seen_at: string | null;
  created_at: string;
};

/**
 * "Lembrei de você": cutucada leve com emoji.
 * - send: envia ao par.
 * - latestReceived: a mais nova recebida (para mostrar como toast/animação).
 * - markSeen: marca como vista.
 */
export function usePartnerNudges(partnerId: string | null) {
  const { user } = useAuth();
  const [nudges, setNudges] = useState<Nudge[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user || !partnerId) {
      setNudges([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("partner_nudges")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    setNudges((data as Nudge[]) ?? []);
    setLoading(false);
  }, [user, partnerId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Realtime
  useEffect(() => {
    if (!user) return;
    const ch = supabase
      .channel(`nudges-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "partner_nudges" },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [user, refresh]);

  const send = async (emoji: string) => {
    if (!user || !partnerId) return { ok: false };
    const { error } = await supabase
      .from("partner_nudges")
      .insert({ sender_id: user.id, recipient_id: partnerId, emoji });
    return { ok: !error };
  };

  const markAllSeen = async () => {
    if (!user) return;
    const unseen = nudges.filter((n) => n.recipient_id === user.id && !n.seen_at);
    if (unseen.length === 0) return;
    await supabase
      .from("partner_nudges")
      .update({ seen_at: new Date().toISOString() })
      .in("id", unseen.map((n) => n.id));
  };

  const latestReceived = nudges.find((n) => n.recipient_id === user?.id) ?? null;
  const unseenCount = user
    ? nudges.filter((n) => n.recipient_id === user.id && !n.seen_at).length
    : 0;

  return { nudges, latestReceived, unseenCount, loading, send, markAllSeen, refresh };
}
