import { Link, useLocation } from "@tanstack/react-router";
import { Home, Calendar, Sparkles, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const TABS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/calendario", label: "Calendário", icon: Calendar },
  { to: "/insights", label: "Insights", icon: Sparkles },
  { to: "/nos-dois", label: "Nós Dois", icon: Heart },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar (desktop) */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-border/60 bg-card/40 backdrop-blur-sm md:flex">
        <div className="flex items-center gap-2 px-6 py-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-warm shadow-soft">
            <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="font-display text-xl font-medium tracking-tight">Nós Dois</span>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {TABS.map((tab) => {
            const active = tab.to === "/" ? path === "/" : path.startsWith(tab.to);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={cn(
                  "relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-2xl bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="md:pl-64 pb-24 md:pb-0">
        <div className="mx-auto w-full max-w-2xl px-5 pt-6 md:px-10 md:pt-12">{children}</div>
      </main>

      {/* Bottom bar (mobile) */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-card/90 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-4">
          {TABS.map((tab) => {
            const active = tab.to === "/" ? path === "/" : path.startsWith(tab.to);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className="relative flex flex-col items-center gap-1 py-3 text-[10px] font-medium"
              >
                <motion.div
                  animate={{ scale: active ? 1.1 : 1, y: active ? -2 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-2xl transition-colors",
                    active ? "bg-gradient-warm text-primary-foreground shadow-soft" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
                <span className={cn(active ? "text-foreground" : "text-muted-foreground")}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
