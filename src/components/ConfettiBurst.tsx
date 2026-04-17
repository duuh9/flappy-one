import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo } from "react";

/**
 * Confete leve em formato de coraçõezinhos e flores.
 * Usado em conquistas, streak novo, quiz acertado.
 */
const ITEMS = ["💗", "🌸", "✨", "💖", "🌷"];

export function ConfettiBurst({
  show,
  onDone,
  count = 18,
}: {
  show: boolean;
  onDone?: () => void;
  count?: number;
}) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: ITEMS[Math.floor(Math.random() * ITEMS.length)],
        x: (Math.random() - 0.5) * 360,
        y: -120 - Math.random() * 200,
        rotate: (Math.random() - 0.5) * 360,
        scale: 0.7 + Math.random() * 0.6,
        delay: Math.random() * 0.15,
      })),
    [count, show],
  );

  useEffect(() => {
    if (!show || !onDone) return;
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <div
          className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              className="absolute select-none"
              initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: p.scale * 0.6 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: p.x,
                y: p.y,
                rotate: p.rotate,
                scale: p.scale,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, delay: p.delay, ease: "easeOut" }}
              style={{ fontSize: "1.6rem" }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
