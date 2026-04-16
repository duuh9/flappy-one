import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useDailyLogs } from "@/hooks/useDailyLogs";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MOODS = [
  { key: "feliz", emoji: "😊", label: "Feliz" },
  { key: "calma", emoji: "😌", label: "Calma" },
  { key: "ansiosa", emoji: "😰", label: "Ansiosa" },
  { key: "irritada", emoji: "😤", label: "Irritada" },
  { key: "triste", emoji: "🥺", label: "Triste" },
  { key: "cansada", emoji: "😴", label: "Cansada" },
];

const SYMPTOMS = [
  "Cólica", "Dor de cabeça", "Inchaço", "Acne", "Seios sensíveis",
  "Fluxo intenso", "Náusea", "Insônia", "Sem energia",
];

export function QuickLogDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [mood, setMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState([3]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const { upsert } = useDailyLogs();
  const { profile } = useProfile();
  const { user } = useAuth();
  const today = format(new Date(), "yyyy-MM-dd");

  const toggleSymptom = (s: string) =>
    setSymptoms((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const save = async () => {
    if (!mood) {
      toast.error("Escolha um humor 💗");
      return;
    }
    setSaving(true);
    await upsert({ log_date: today, mood, mood_intensity: intensity[0], symptoms });

    // Atualiza streak + pontos
    if (user && profile) {
      const last = profile.last_log_date;
      let newStreak = profile.streak;
      if (last !== today) {
        const yesterday = format(new Date(Date.now() - 86400000), "yyyy-MM-dd");
        newStreak = last === yesterday ? profile.streak + 1 : 1;
      }
      await supabase.from("profiles").update({
        last_log_date: today,
        streak: newStreak,
        points: profile.points + 10,
      }).eq("id", user.id);
    }

    setSaving(false);
    toast.success("Registro salvo! +10 pontos 🌸");
    onOpenChange(false);
    setMood(null);
    setSymptoms([]);
    setIntensity([3]);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-background">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="text-left">
            <DrawerTitle className="font-display text-2xl font-light">Como você está hoje?</DrawerTitle>
          </DrawerHeader>

          <div className="space-y-6 px-4 pb-4">
            <div>
              <p className="mb-3 text-sm text-muted-foreground">Humor</p>
              <div className="grid grid-cols-3 gap-2">
                {MOODS.map((m) => (
                  <motion.button
                    key={m.key}
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setMood(m.key)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-2xl border py-3 transition-all",
                      mood === m.key
                        ? "border-primary bg-secondary shadow-soft"
                        : "border-border/60 bg-card hover:bg-muted",
                    )}
                  >
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="text-[11px] text-muted-foreground">{m.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {mood && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="mb-3 text-sm text-muted-foreground">
                    Intensidade <span className="font-medium text-foreground">{intensity[0]}/5</span>
                  </p>
                  <Slider value={intensity} onValueChange={setIntensity} min={1} max={5} step={1} />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <p className="mb-3 text-sm text-muted-foreground">Sintomas</p>
              <div className="flex flex-wrap gap-2">
                {SYMPTOMS.map((s) => {
                  const active = symptoms.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSymptom(s)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={save} disabled={saving} className="h-12 rounded-2xl bg-gradient-warm text-primary-foreground shadow-soft hover:opacity-90">
              {saving ? "Salvando..." : "Salvar registro"}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
