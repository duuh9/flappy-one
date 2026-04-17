import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2 } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { usePartnerMessages } from "@/hooks/usePartnerMessages";
import { toast } from "sonner";

const QUICK_EMOJIS = ["💗", "🌸", "✨", "☕", "🤗", "😘"];

function formatStamp(iso: string) {
  const d = new Date(iso);
  if (isToday(d)) return format(d, "HH:mm");
  if (isYesterday(d)) return "ontem · " + format(d, "HH:mm");
  return format(d, "d 'de' MMM · HH:mm", { locale: ptBR });
}

/**
 * Painel de recadinhos do casal — texto livre + emojis rápidos.
 * Marca como lidas ao montar e em cada nova entrada.
 */
export function MessagesPanel({ partnerId }: { partnerId: string }) {
  const { user } = useAuth();
  const { messages, send, markAllRead, remove, loading } = usePartnerMessages(partnerId);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Marca como lidas e rola pro fim
  useEffect(() => {
    markAllRead();
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, [messages.length, markAllRead]);

  const submit = async (emoji?: string) => {
    const body = emoji ? (text.trim() || emoji) : text.trim();
    if (!body) return;
    setSending(true);
    const result = await send(body, emoji);
    setSending(false);
    if (result.ok) {
      setText("");
    } else {
      toast.error("Não foi possível enviar.");
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-soft">
      {/* Lista */}
      <div ref={scrollRef} className="max-h-[420px] min-h-[220px] space-y-3 overflow-y-auto p-4">
        {loading ? (
          <p className="py-8 text-center text-xs text-muted-foreground">Carregando…</p>
        ) : messages.length === 0 ? (
          <div className="py-10 text-center">
            <p className="font-display text-lg font-light">Nenhum recadinho ainda 💗</p>
            <p className="mt-1 text-xs text-muted-foreground">Manda um carinho pra começar.</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((m) => {
              const mine = m.sender_id === user?.id;
              return (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={cn("group flex", mine ? "justify-end" : "justify-start")}
                >
                  <div className={cn("max-w-[80%] space-y-1", mine && "flex flex-col items-end")}>
                    <div
                      className={cn(
                        "relative rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-soft",
                        mine
                          ? "rounded-br-md bg-gradient-warm text-primary-foreground"
                          : "rounded-bl-md bg-secondary text-secondary-foreground",
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">
                        {m.emoji && m.body === m.emoji ? (
                          <span className="text-3xl">{m.emoji}</span>
                        ) : (
                          m.body
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-1 text-[10px] text-muted-foreground">
                      <span>{formatStamp(m.created_at)}</span>
                      {mine && (
                        <button
                          onClick={() => remove(m.id)}
                          className="opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                          aria-label="Apagar"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-border/60 bg-background/40 p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {QUICK_EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => submit(e)}
              disabled={sending}
              className="h-9 w-9 rounded-full bg-secondary/60 text-lg transition-transform hover:scale-110 hover:bg-secondary disabled:opacity-50"
            >
              {e}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 500))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Manda um carinho…"
            className="h-10 rounded-full bg-card"
            maxLength={500}
          />
          <Button
            onClick={() => submit()}
            disabled={!text.trim() || sending}
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
