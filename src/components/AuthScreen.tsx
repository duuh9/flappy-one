import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Heart, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validação de email
  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  // Validar formulário
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!isValidEmail(email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
    } else if (password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    if (mode === "signup") {
      if (!name.trim()) {
        newErrors.name = "Nome é obrigatório";
      } else if (name.trim().length < 2) {
        newErrors.name = "Nome deve ter pelo menos 2 caracteres";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Verifique os campos do formulário");
      return;
    }

    setLoading(true);
    const { error } =
      mode === "signin"
        ? await signIn(email, password)
        : await signUp(email, password, name.trim());
    setLoading(false);

    if (error) {
      toast.error(error.message);
      if (error.message.includes("email")) {
        setErrors({ email: error.message });
      }
    } else if (mode === "signup") {
      toast.success("Conta criada! Você já pode entrar.");
      setMode("signin");
      setEmail("");
      setPassword("");
      setName("");
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
          <h1 className="font-display text-3xl font-light tracking-tight">Fluppy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Ciclo, humor e relação — com leveza.</p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-soft backdrop-blur"
        >
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Como você se chama?</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                placeholder="Seu nome"
                className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
              />
              {errors.name && (
                <p className="flex items-center gap-1.5 text-xs text-red-500">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </p>
              )}
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              placeholder="voce@exemplo.com"
              className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.email && (
              <p className="flex items-center gap-1.5 text-xs text-red-500">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              placeholder="••••••••"
              className={cn(errors.password && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.password && (
              <p className="flex items-center gap-1.5 text-xs text-red-500">
                <AlertCircle className="h-3 w-3" />
                {errors.password}
              </p>
            )}
            {!errors.password && password && password.length < 6 && (
              <p className="text-xs text-muted-foreground">
                {password.length}/6 caracteres (mínimo necessário)
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={loading || !!Object.keys(errors).length}
            className="h-11 w-full rounded-2xl bg-gradient-warm text-primary-foreground shadow-soft hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Aguarde..." : mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setErrors({});
            setEmail("");
            setPassword("");
            setName("");
          }}
          className="mt-5 w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {mode === "signin" ? "Ainda não tem conta? " : "Já tem conta? "}
          <span className="font-medium text-primary">
            {mode === "signin" ? "Criar agora" : "Entrar"}
          </span>
        </button>
      </motion.div>
    </div>
  );
}
