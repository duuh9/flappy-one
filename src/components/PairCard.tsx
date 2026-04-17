import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Heart, Link2Off, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { usePartner } from "@/hooks/usePartner";

/**
 * Card de pareamento: mostra o código próprio + input para inserir o do outro.
 * Quando já pareado, mostra status + opção de desconectar.
 */
export function PairCard() {
  const { inviteCode, partnerId, partner, pair, unpair, loading } = usePartner();
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <div className="h-40 animate-pulse rounded-3xl bg-card/60" />;
  }

  if (partnerId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-soft p-6 shadow-soft"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/40 blur-3xl" />
        <div className="relative">
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Conectados</p>
          </div>
          <p className="font-display text-2xl font-light leading-snug">
            Você e <span className="text-primary">{partner?.display_name ?? "seu parceiro"}</span> 💗
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Vocês compartilham fase do ciclo, humor do dia e podem trocar recadinhos.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await unpair();
              toast.success("Vocês foram desconectados.");
            }}
            className="mt-4 h-8 rounded-full px-3 text-xs text-muted-foreground hover:text-destructive"
          >
            <Link2Off className="mr-1.5 h-3 w-3" />
            Desconectar
          </Button>
        </div>
      </motion.div>
    );
  }

  const copy = async () => {
    if (!inviteCode) return;
    await navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    toast.success("Código copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const submit = async () => {
    setSubmitting(true);
    const result = await pair(code);
    setSubmitting(false);
    if (result.ok) {
      toast.success("Parear deu certo! 💗");
      setCode("");
    } else {
      toast.error(result.error ?? "Erro ao parear");
    }
  };

  return (
    <div className="space-y-4">
      {/* Seu código */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-soft"
      >
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Seu código de convite</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="font-display text-4xl font-light tracking-[0.3em] tabular-nums">
            {inviteCode ?? "------"}
          </p>
          <Button onClick={copy} size="icon" variant="ghost" className="rounded-full">
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Compartilhe este código com seu par para vocês se conectarem.
        </p>
      </motion.div>

      {/* Inserir código do parceiro */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-soft"
      >
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Tem o código do seu par?</p>
        <div className="mt-3 flex gap-2">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            placeholder="000000"
            className="h-11 text-center font-display text-xl tracking-[0.3em] tabular-nums"
          />
          <Button
            onClick={submit}
            disabled={code.length !== 6 || submitting}
            className="h-11 rounded-md px-5"
          >
            <Heart className="mr-1.5 h-3.5 w-3.5" fill="currentColor" />
            Conectar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
