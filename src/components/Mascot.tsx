import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Gatinha mascote — inspirada no LovBirdz, mas felina.
 * SVG inline + Framer Motion. Sem dependências externas, leve.
 *
 * Estados de humor:
 *  - idle: piscando suavemente
 *  - happy: sorrindo + balançando (registro/quiz acertado)
 *  - celebrate: olhos brilhando + pulando (streak/badge)
 *  - sleepy: olhos meio fechados (sem streak)
 */
export type MascotMood = "idle" | "happy" | "celebrate" | "sleepy";

type Size = "xs" | "sm" | "md" | "lg";
const SIZE_MAP: Record<Size, number> = { xs: 36, sm: 56, md: 96, lg: 140 };

export function Mascot({
  mood = "idle",
  size = "md",
  className,
}: {
  mood?: MascotMood;
  size?: Size;
  className?: string;
}) {
  const px = SIZE_MAP[size];
  const [blink, setBlink] = useState(false);

  // Pisca de tempos em tempos no idle/happy/sleepy
  useEffect(() => {
    if (mood === "celebrate") return;
    const id = setInterval(
      () => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
      },
      2800 + Math.random() * 1800,
    );
    return () => clearInterval(id);
  }, [mood]);

  const bodyAnim =
    mood === "celebrate"
      ? { y: [0, -8, 0, -4, 0], rotate: [0, -3, 3, -2, 0] }
      : mood === "happy"
        ? { y: [0, -3, 0], rotate: [0, -2, 2, 0] }
        : mood === "sleepy"
          ? { y: [0, 1.5, 0] }
          : { y: [0, -1.5, 0] };

  const bodyDuration =
    mood === "celebrate" ? 0.9 : mood === "happy" ? 1.6 : mood === "sleepy" ? 4 : 3;

  return (
    <motion.div
      className={className}
      style={{ width: px, height: px }}
      animate={bodyAnim}
      transition={{
        duration: bodyDuration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden>
        <defs>
          <radialGradient id="catBody" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.96 0.04 350)" />
            <stop offset="100%" stopColor="oklch(0.86 0.08 340)" />
          </radialGradient>
          <linearGradient id="catCheek" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.85 0.13 0)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.78 0.10 320)" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Sombra leve */}
        <ellipse cx="60" cy="108" rx="28" ry="3.5" fill="oklch(0.5 0.08 340 / 0.18)" />

        {/* Orelhas */}
        <g>
          <path
            d="M30 42 L24 18 L48 32 Z"
            fill="url(#catBody)"
            stroke="oklch(0.6 0.1 340 / 0.25)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M30 38 L28 24 L42 32 Z" fill="oklch(0.85 0.10 0 / 0.5)" />
          <path
            d="M90 42 L96 18 L72 32 Z"
            fill="url(#catBody)"
            stroke="oklch(0.6 0.1 340 / 0.25)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M90 38 L92 24 L78 32 Z" fill="oklch(0.85 0.10 0 / 0.5)" />
        </g>

        {/* Cabeça/corpo (uma forma só, fofo) */}
        <ellipse
          cx="60"
          cy="62"
          rx="34"
          ry="32"
          fill="url(#catBody)"
          stroke="oklch(0.6 0.1 340 / 0.25)"
          strokeWidth="1.2"
        />

        {/* Bochechas */}
        <circle cx="38" cy="70" r="6" fill="url(#catCheek)" />
        <circle cx="82" cy="70" r="6" fill="url(#catCheek)" />

        {/* Olhos */}
        <g>
          {mood === "sleepy" ? (
            <>
              <path
                d="M44 60 Q49 64 54 60"
                stroke="oklch(0.30 0.04 340)"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M66 60 Q71 64 76 60"
                stroke="oklch(0.30 0.04 340)"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
              />
            </>
          ) : blink ? (
            <>
              <path
                d="M44 61 Q49 58 54 61"
                stroke="oklch(0.30 0.04 340)"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M66 61 Q71 58 76 61"
                stroke="oklch(0.30 0.04 340)"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <ellipse cx="49" cy="60" rx="3.2" ry="4.2" fill="oklch(0.18 0.04 340)" />
              <ellipse cx="71" cy="60" rx="3.2" ry="4.2" fill="oklch(0.18 0.04 340)" />
              {/* brilhinho */}
              <circle cx="50.2" cy="58.6" r="1" fill="white" />
              <circle cx="72.2" cy="58.6" r="1" fill="white" />
              {mood === "celebrate" && (
                <>
                  <motion.circle
                    cx="49"
                    cy="56"
                    r="1.4"
                    fill="oklch(0.95 0.10 90)"
                    animate={{ scale: [0.8, 1.4, 0.8] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="71"
                    cy="56"
                    r="1.4"
                    fill="oklch(0.95 0.10 90)"
                    animate={{ scale: [0.8, 1.4, 0.8] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
                  />
                </>
              )}
            </>
          )}
        </g>

        {/* Nariz */}
        <path
          d="M58 70 Q60 73 62 70 Q60 72 58 70"
          fill="oklch(0.7 0.13 0)"
          stroke="oklch(0.45 0.12 0 / 0.6)"
          strokeWidth="0.6"
        />

        {/* Boca */}
        {mood === "sleepy" ? (
          <path
            d="M55 78 Q60 79 65 78"
            stroke="oklch(0.30 0.04 340)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        ) : (
          <>
            <path
              d="M60 73 Q57 78 53 76"
              stroke="oklch(0.30 0.04 340)"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M60 73 Q63 78 67 76"
              stroke="oklch(0.30 0.04 340)"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Bigodes */}
        <g
          stroke="oklch(0.55 0.06 340 / 0.55)"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M30 70 L42 70" />
          <path d="M30 75 L42 73" />
          <path d="M90 70 L78 70" />
          <path d="M90 75 L78 73" />
        </g>
      </svg>

      {/* Coraçõezinhos saindo no celebrate */}
      <AnimatePresence>
        {mood === "celebrate" && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="pointer-events-none absolute"
                style={{
                  left: `${20 + i * 30}%`,
                  top: "10%",
                  fontSize: px * 0.18,
                }}
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], y: -px * 0.6, scale: [0.5, 1, 0.7] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}
              >
                💗
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
