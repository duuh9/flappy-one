import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type DailyLog = {
  id: string;
  user_id: string;
  log_date: string;
  mood: string | null;
  mood_intensity: number | null;
  symptoms: string[];
  notes: string | null;
};

export function useDailyLogs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("daily_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("log_date", { ascending: false });
    setLogs((data as DailyLog[]) ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) { setLogs([]); setLoading(false); return; }
    refresh();
  }, [user, refresh]);

  const upsert = async (log: { log_date: string; mood?: string; mood_intensity?: number; symptoms?: string[]; notes?: string }) => {
    if (!user) return;
    await supabase.from("daily_logs").upsert(
      { user_id: user.id, ...log },
      { onConflict: "user_id,log_date" },
    );
    await refresh();
  };

  return { logs, loading, upsert, refresh };
}
