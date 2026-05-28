import React from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.9, delay, ease },
});

// ─── Add / remove sponsors here ───────────────────────────────────────────────
// To use a real logo, replace the `logo` value with the image path
// e.g. logo: "/sponsors/sunrise.png"
// and swap the monogram <div> inside SponsorCard for:
// <img src={logo} alt={name} style={{ height: "100%", width: "auto", objectFit: "contain",
//   filter: "opacity(0.85)" }} />
const SPONSORS = [
  { name: "Tasty Treats",        logo: "/sponsors/tastytreats.webp" },
  { name: "Bengal Heritage Fund", logo: null },
  { name: "Meridian Ventures",    logo: null },
  { name: "Nova Infra Ltd.",       logo: null },
  { name: "Calcutta Media House", logo: null },
  { name: "Eastgate Capital",     logo: null },
  { name: "Inkwell Press",        logo: null },
  { name: "Pinnacle Foods",       logo: null },
  { name: "Zephyr Tech",          logo: null },
  { name: "Goldleaf Studios",     logo: null },
];

const SponsorCard = ({ name, logo, delay = 0 }) => (
  <motion.div
    className="flex flex-col items-center justify-center gap-3 py-7 px-6 relative group"
    {...fadeUp(delay, 14)}
    style={{
      border: "0.5px solid rgba(255,190,60,0.18)",
      borderRadius: "2px",
      background: "linear-gradient(135deg, rgba(255,150,20,0.04) 0%, rgba(0,0,0,0) 60%)",
      transition: "border-color 0.4s ease, background 0.4s ease",
    }}
    whileHover={{
      borderColor: "rgba(255,190,60,0.42)",
      background: "linear-gradient(135deg, rgba(255,150,20,0.09) 0%, rgba(0,0,0,0) 60%)",
      transition: { duration: 0.3 },
    }}
  >
    {/* Corner accents on hover */}
    {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
      <span key={i} className={`absolute ${pos} w-2 h-2 opacity-0 group-hover:opacity-100`} style={{
        borderTop:    i < 2  ? "1px solid rgba(255,190,60,0.6)" : "none",
        borderBottom: i >= 2 ? "1px solid rgba(255,190,60,0.6)" : "none",
        borderLeft:   i % 2 === 0 ? "1px solid rgba(255,190,60,0.6)" : "none",
        borderRight:  i % 2 === 1 ? "1px solid rgba(255,190,60,0.6)" : "none",
        transition: "opacity 0.3s ease",
      }} />
    ))}

    {/* Logo / monogram */}
    <div className="h-10 flex items-center justify-center" style={{ minWidth: "60px" }}>
      {logo ? (
        <img src={logo} alt={name} style={{ height: "100%", width: "auto", objectFit: "contain", filter: "opacity(0.85)" }} />
      ) : (
        <div
          className="h-full aspect-square flex items-center justify-center font-main font-black text-base tracking-widest uppercase"
          style={{
            background: "linear-gradient(135deg, rgba(255,140,10,0.12), rgba(255,190,60,0.08))",
            border: "0.5px solid rgba(255,190,60,0.25)",
            borderRadius: "1px",
            color: "rgba(255,190,60,0.55)",
            minWidth: "44px",
            padding: "0 8px",
          }}
        >
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>

    <p
      className="font-main text-[0.72rem] tracking-[0.2em] uppercase font-bold text-center"
      style={{ color: "rgba(255,255,255,0.5)" }}
    >
      {name}
    </p>
  </motion.div>
);

const Sponsors = () => (
  <section className="relative w-full py-20 px-6 overflow-x-hidden">
    <div className="relative z-10 max-w-5xl mx-auto">

      {/* Header */}
      <div className="text-center mb-12">
        <motion.p
          className="font-main text-[0.6rem] tracking-[0.5em] uppercase font-bold mb-3"
          style={{ color: "rgba(255,190,60,0.5)" }}
          {...fadeUp(0, 10)}
        >
          Concord 2026 · XXVI Edition
        </motion.p>

        <motion.h1
          className="font-main font-black uppercase block"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease }}
          style={{
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            lineHeight: 0.88,
            letterSpacing: "0.06em",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            backgroundImage:
              "linear-gradient(115deg, rgba(255,140,10,1) 0%, rgba(255,195,60,1) 18%, rgba(255,225,130,1) 38%, rgba(255,255,255,0.95) 58%, rgba(255,240,200,0.8) 100%)",
            filter:
              "drop-shadow(0 0 28px rgba(255,120,0,0.55)) drop-shadow(0 0 8px rgba(255,160,30,0.4))",
          }}
        >
          Our Sponsors
        </motion.h1>

        <motion.p
          className="font-main text-[0.72rem] tracking-[0.28em] uppercase font-bold mt-4"
          style={{ color: "rgba(255,255,255,0.25)" }}
          {...fadeUp(0.28, 10)}
        >
          With gratitude, we acknowledge those who make this possible
        </motion.p>
      </div>

      {/* Divider */}
      <motion.div className="flex items-center gap-4 mb-12" {...fadeIn(0.35)}>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,190,60,0.35))" }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <rect x="5" y="0.5" width="6.5" height="6.5" transform="rotate(45 5 5)" fill="none" stroke="rgba(255,190,60,0.55)" strokeWidth="0.8" />
          <rect x="5" y="3" width="3" height="3" transform="rotate(45 5 5)" fill="rgba(255,190,60,0.45)" />
        </svg>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,190,60,0.35))" }} />
      </motion.div>

      {/* Sponsor grid — all flat, no tiers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {SPONSORS.map((s, i) => (
          <SponsorCard key={s.name} name={s.name} logo={s.logo} delay={0.38 + i * 0.04} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.div className="text-center mt-14" {...fadeIn(0.9)}>
        <div className="flex items-center gap-4 justify-center mb-5">
          <div style={{ width: "clamp(30px,6vw,80px)", height: "0.5px", background: "linear-gradient(to right, transparent, rgba(255,190,60,0.3))" }} />
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,190,60,0.35)", flexShrink: 0 }} />
          <div style={{ width: "clamp(30px,6vw,80px)", height: "0.5px", background: "linear-gradient(to left, transparent, rgba(255,190,60,0.3))" }} />
        </div>
        <p className="font-main text-[0.58rem] tracking-[0.35em] uppercase font-bold" style={{ color: "rgba(255,255,255,0.15)" }}>
          Interested in sponsoring? Contact us at concord@calcuttaboysschool.edu
        </p>
      </motion.div>

    </div>
  </section>
);

export default Sponsors;