import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type Profile = {
  id: string;
  display_name: string | null;
  last_period_start: string | null;
  cycle_length: number;
  period_length: number;
  points: number;
  streak: number;
  last_log_date: string | null;
  last_insight_read_date: string | null;
};

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (!cancelled) {
        setProfile(data as Profile | null);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user]);

  const update = async (patch: Partial<Profile>) => {
    if (!user) return;
    const { data } = await supabase.from("profiles").update(patch).eq("id", user.id).select().single();
    if (data) setProfile(data as Profile);
  };

  return { profile, loading, update };
}
