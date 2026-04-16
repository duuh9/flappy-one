import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } =
      mode === "signin"
        ? await signIn(email, password)
        : await signUp(email, password, name || email.split("@")[0]);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else if (mode === "signup") {
      toast.success("Conta criada! Você já pode entrar.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5">
      {/* Bolhas de fundo */}
      <motion.div
        className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-gradient-warm opacity-50 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-gradient-soft opacity-60 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-sm"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-warm shadow-glow">
            <Heart className="h-6 w-6 text-primary-foreground" fill="currentColor" />
          </div>
          <h1 className="font-display text-3xl font-light tracking-tight">Nós Dois</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ciclo, humor e relação — com leveza.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-soft backdrop-blur">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Como você se chama?</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@exemplo.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <Button type="submit" disabled={loading} className="h-11 w-full rounded-2xl bg-gradient-warm text-primary-foreground shadow-soft hover:opacity-90">
            {loading ? "Aguarde..." : mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {mode === "signin" ? "Ainda não tem conta? " : "Já tem conta? "}
          <span className="font-medium text-primary">{mode === "signin" ? "Criar agora" : "Entrar"}</span>
        </button>
      </motion.div>
    </div>
  );
}
