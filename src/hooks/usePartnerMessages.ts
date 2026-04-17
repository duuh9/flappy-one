import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type PartnerMessage = {
  id: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  emoji: string | null;
  read_at: string | null;
  created_at: string;
};

/**
 * Hook de mensagens do casal (recadinhos).
 * - Lista cronológica (mais antigos -> mais novos).
 * - Realtime: novas mensagens aparecem na hora.
 * - Contador de não lidas (recebidas).
 */
export function usePartnerMessages(partnerId: string | null) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<PartnerMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user || !partnerId) {
      setMessages([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("partner_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(200);
    setMessages((data as PartnerMessage[]) ?? []);
    setLoading(false);
  }, [user, partnerId]);

  useEffect(() => {
    load();
  }, [load]);

  // Realtime
  useEffect(() => {
    if (!user || !partnerId) return;
    const channel = supabase
      .channel(`partner-messages-${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "partner_messages" },
        (payload) => {
          const msg = payload.new as PartnerMessage;
          setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "partner_messages" },
        (payload) => {
          const msg = payload.new as PartnerMessage;
          setMessages((prev) => prev.map((m) => (m.id === msg.id ? msg : m)));
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "partner_messages" },
        (payload) => {
          const old = payload.old as { id: string };
          setMessages((prev) => prev.filter((m) => m.id !== old.id));
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, partnerId]);

  const send = async (body: string, emoji?: string) => {
    if (!user || !partnerId) return { ok: false };
    const trimmed = body.trim();
    if (!trimmed) return { ok: false };
    const { error } = await supabase.from("partner_messages").insert({
      sender_id: user.id,
      recipient_id: partnerId,
      body: trimmed.slice(0, 500),
      emoji: emoji ?? null,
    });
    return { ok: !error, error };
  };

  const markAllRead = useCallback(async () => {
    if (!user) return;
    const unread = messages.filter((m) => m.recipient_id === user.id && !m.read_at);
    if (unread.length === 0) return;
    await supabase
      .from("partner_messages")
      .update({ read_at: new Date().toISOString() })
      .in(
        "id",
        unread.map((m) => m.id),
      );
  }, [messages, user]);

  const remove = async (id: string) => {
    await supabase.from("partner_messages").delete().eq("id", id);
  };

  const unreadCount = user ? messages.filter((m) => m.recipient_id === user.id && !m.read_at).length : 0;

  return { messages, loading, send, markAllRead, remove, unreadCount };
}

/**
 * Hook leve só para o badge de não lidas (usado no AppShell).
 */
export function useUnreadBadge() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    if (!user) {
      setCount(0);
      return;
    }
    const { count: c } = await supabase
      .from("partner_messages")
      .select("*", { count: "exact", head: true })
      .eq("recipient_id", user.id)
      .is("read_at", null);
    setCount(c ?? 0);
  }, [user]);

  useEffect(() => {
    refresh();
    if (!user) return;
    const channel = supabase
      .channel(`unread-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "partner_messages", filter: `recipient_id=eq.${user.id}` },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, refresh]);

  return count;
}
