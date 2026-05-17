import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ── Shared entrance variant ───────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

// ── Corner bracket positions ──────────────────────────────────────────────
const CORNERS = [
  { pos: "top-0 left-0",     d: "M1 28 L1 1 L28 1" },
  { pos: "top-0 right-0",    d: "M39 28 L39 1 L12 1" },
  { pos: "bottom-0 left-0",  d: "M1 12 L1 39 L28 39" },
  { pos: "bottom-0 right-0", d: "M39 12 L39 39 L12 39" },
];

// ── Tiny decorative tick marks along the edges ────────────────────────────
const TICKS = [20, 35, 50, 65, 80]; // % positions

export default function NotFound() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#080500",
        // Subtle gold crosshatch grid — extremely low opacity
        backgroundImage: [
          "linear-gradient(rgba(194,120,0,0.028) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(194,120,0,0.028) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "72px 72px",
      }}
    >
      {/* ── Fonts & keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;600&family=Space+Mono&display=swap');

        @keyframes goldFlicker {
          0%, 86%, 100% { opacity: 1; text-shadow: 0 0 80px rgba(194,120,0,0.25); }
          87%  { opacity: 0.25; text-shadow: none; }
          88%  { opacity: 1;    text-shadow: 0 0 80px rgba(194,120,0,0.25); }
          93%  { opacity: 0.7;  text-shadow: 0 0 120px rgba(194,120,0,0.4); }
          94%  { opacity: 1;    text-shadow: 0 0 80px rgba(194,120,0,0.25); }
        }

        @keyframes pulse404 {
          0%, 100% { opacity: 0.07; }
          50%       { opacity: 0.12; }
        }

        @keyframes scanDrift {
          0%   { transform: translateY(0); }
          100% { transform: translateY(72px); }
        }
      `}</style>

      {/* ── Scanline overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
          animation: "scanDrift 3s linear infinite",
        }}
      />

      {/* ── Radial glow behind 404 ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(194,120,0,0.07) 0%, transparent 68%)",
          animation: "pulse404 4s ease-in-out infinite",
        }}
      />

      {/* ── Corner brackets (full page) ── */}
      {CORNERS.map(({ pos, d }, i) => (
        <svg
          key={i}
          className={`absolute ${pos} w-12 h-12 m-5 pointer-events-none z-10`}
          viewBox="0 0 40 40"
          fill="none"
        >
          <path d={d} stroke="#c27800" strokeWidth="1.5" opacity="0.55" />
        </svg>
      ))}

      {/* ── Top edge ticks ── */}
      {TICKS.map((p) => (
        <div
          key={p}
          className="absolute top-0 pointer-events-none"
          style={{
            left: `${p}%`,
            width: 1,
            height: 8,
            background: "rgba(194,120,0,0.18)",
          }}
        />
      ))}
      {/* ── Bottom edge ticks ── */}
      {TICKS.map((p) => (
        <div
          key={p}
          className="absolute bottom-0 pointer-events-none"
          style={{
            left: `${p}%`,
            width: 1,
            height: 8,
            background: "rgba(194,120,0,0.18)",
          }}
        />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Top label */}
        <motion.p
          {...fadeUp(0)}
          className="font-mono tracking-[0.5em] mb-10"
          style={{
            color: "rgba(194,120,0,0.4)",
            fontSize: "clamp(7px, 1.2vw, 9px)",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.5em",
          }}
        >
          CONCORD XXVI&nbsp;&nbsp;·&nbsp;&nbsp;CALCUTTA BOYS' SCHOOL&nbsp;&nbsp;·&nbsp;&nbsp;EST. 1877
        </motion.p>

        {/* ── 404 hero ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="flex items-baseline select-none leading-none"
          style={{ fontFamily: "'Oswald', 'Arial Narrow', sans-serif" }}
          aria-label="404"
        >
          {/* 4 */}
          <span
            style={{
              fontSize: "clamp(96px, 20vw, 192px)",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            4
          </span>

          {/* 0 — gold flicker */}
          <span
            style={{
              fontSize: "clamp(96px, 20vw, 192px)",
              fontWeight: 600,
              color: "#c27800",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              animation: "goldFlicker 7s ease-in-out 1.2s infinite",
            }}
          >
            0
          </span>

          {/* 4 */}
          <span
            style={{
              fontSize: "clamp(96px, 20vw, 192px)",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            4
          </span>
        </motion.div>

        {/* Ornate divider */}
        <motion.div
          {...fadeUp(0.22)}
          className="flex items-center gap-3 my-8 w-full"
          style={{ maxWidth: 360 }}
        >
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(194,120,0,0.55))" }}
          />
          <span style={{ color: "#c27800", fontSize: 7 }}>◆</span>
          <span
            className="font-mono tracking-[0.45em]"
            style={{
              color: "rgba(194,120,0,0.6)",
              fontSize: 8,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            ERROR
          </span>
          <span style={{ color: "#c27800", fontSize: 7 }}>◆</span>
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to left, transparent, rgba(194,120,0,0.55))" }}
          />
        </motion.div>

        {/* PAGE NOT FOUND */}
        <motion.h1
          {...fadeUp(0.32)}
          className="uppercase text-white"
          style={{
            fontFamily: "'Oswald', 'Arial Narrow', sans-serif",
            fontSize: "clamp(20px, 3.5vw, 34px)",
            fontWeight: 400,
            letterSpacing: "0.28em",
            lineHeight: 1,
          }}
        >
          PAGE NOT FOUND
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeUp(0.42)}
          className="font-mono mt-5"
          style={{
            color: "rgba(194,120,0,0.42)",
            fontSize: "clamp(8px, 1.4vw, 10px)",
            lineHeight: 2,
            letterSpacing: "0.12em",
            fontFamily: "'Space Mono', monospace",
            maxWidth: 320,
          }}
        >
          THE PAGE YOU'RE LOOKING FOR HAS<br />
          DRIFTED BEYOND OUR VISUAL ARCHIVE
        </motion.p>

        {/* Return home button */}
        <motion.div {...fadeUp(0.54)} className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-3 font-mono uppercase"
            style={{
              color: "#c27800",
              border: "1px solid rgba(194,120,0,0.32)",
              padding: "14px 32px",
              fontSize: "clamp(9px, 1.4vw, 10px)",
              letterSpacing: "0.4em",
              fontFamily: "'Space Mono', monospace",
              transition: "background 0.2s, border-color 0.2s, letter-spacing 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background     = "rgba(194,120,0,0.08)";
              e.currentTarget.style.borderColor    = "rgba(194,120,0,0.65)";
              e.currentTarget.style.letterSpacing  = "0.48em";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background     = "transparent";
              e.currentTarget.style.borderColor    = "rgba(194,120,0,0.32)";
              e.currentTarget.style.letterSpacing  = "0.4em";
            }}
          >
            <span style={{ fontSize: 12, lineHeight: 1 }}>←</span>
            RETURN TO HOME
          </Link>
        </motion.div>

        {/* Bottom status line */}
        <motion.div
          {...fadeUp(0.64)}
          className="flex items-center gap-4 mt-14"
        >
          {["HTTP", "·", "404", "·", "NOT FOUND"].map((t, i) => (
            <span
              key={i}
              className="font-mono"
              style={{
                color: t === "·" ? "rgba(194,120,0,0.2)" : "rgba(194,120,0,0.18)",
                fontSize: 8,
                letterSpacing: "0.3em",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Left / Right edge rulers ── */}
      {[["left-5", "top-1/2 -translate-y-1/2"], ["right-5", "top-1/2 -translate-y-1/2"]].map(
        ([side, pos], i) => (
          <div
            key={i}
            className={`absolute ${side} ${pos} pointer-events-none hidden md:flex flex-col gap-[14px] items-center`}
          >
            {Array.from({ length: 7 }).map((_, j) => (
              <div
                key={j}
                style={{
                  width: j === 3 ? 10 : 5,
                  height: 1,
                  background: `rgba(194,120,0,${j === 3 ? 0.35 : 0.12})`,
                }}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
