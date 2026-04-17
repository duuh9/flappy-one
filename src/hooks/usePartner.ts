import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type PartnerProfile = {
  id: string;
  display_name: string | null;
  last_period_start: string | null;
  cycle_length: number;
  period_length: number;
};

export type PartnerLastLog = {
  log_date: string;
  mood: string | null;
  mood_intensity: number | null;
  symptoms: string[] | null;
} | null;

/**
 * Hook que retorna info de pareamento + dados do parceiro (se houver).
 * O parceiro só vê: fase do ciclo, último log (humor + sintomas) — via RLS.
 */
export function usePartner() {
  const { user } = useAuth();
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [partner, setPartner] = useState<PartnerProfile | null>(null);
  const [partnerLastLog, setPartnerLastLog] = useState<PartnerLastLog>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    const { data: me } = await supabase
      .from("profiles")
      .select("invite_code, partner_id")
      .eq("id", user.id)
      .maybeSingle();

    setInviteCode((me?.invite_code as string) ?? null);
    const pid = (me?.partner_id as string) ?? null;
    setPartnerId(pid);

    if (pid) {
      const [{ data: p }, { data: log }] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, display_name, last_period_start, cycle_length, period_length")
          .eq("id", pid)
          .maybeSingle(),
        supabase
          .from("daily_logs")
          .select("log_date, mood, mood_intensity, symptoms")
          .eq("user_id", pid)
          .order("log_date", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);
      setPartner(p as PartnerProfile | null);
      setPartnerLastLog(log as PartnerLastLog);
    } else {
      setPartner(null);
      setPartnerLastLog(null);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const pair = async (code: string): Promise<{ ok: boolean; error?: string }> => {
    const cleaned = code.replace(/\D/g, "").slice(0, 6);
    if (cleaned.length !== 6) return { ok: false, error: "Código deve ter 6 dígitos" };
    const { data, error } = await supabase.rpc("pair_with_code", { _code: cleaned });
    if (error) return { ok: false, error: error.message };
    const result = data as { ok: boolean; error?: string };
    if (!result.ok) {
      const map: Record<string, string> = {
        invalid_code: "Código inválido",
        self_code: "Esse é o seu próprio código 😅",
        already_paired: "Você já está pareado com alguém",
        not_authenticated: "Faça login primeiro",
      };
      return { ok: false, error: map[result.error ?? ""] ?? "Erro ao parear" };
    }
    await refresh();
    return { ok: true };
  };

  const unpair = async () => {
    await supabase.rpc("unpair");
    await refresh();
  };

  return { inviteCode, partnerId, partner, partnerLastLog, loading, pair, unpair, refresh };
}
