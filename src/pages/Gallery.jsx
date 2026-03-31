import { useState } from "react"; // used in GalleryCard
import { motion } from "framer-motion";

const strip1 = [
  {
    id: 1,
    label: "OPENING CEREMONY",
    sub: "2026 · MAIN STAGE",
    imgUrl: "/gallery/1.jpg",
  },
  {
    id: 2,
    label: "CULTURAL NIGHT",
    sub: "PERFORMANCES",
    imgUrl: "/gallery/2.jpg",
  },
  {
    id: 3,
    label: "SPORTS ARENA",
    sub: "TRACK & FIELD",
    imgUrl: "/gallery/3.jpg",
  },
  {
    id: 4,
    label: "ART EXHIBITION",
    sub: "PHOENIX GALLERY",
    imgUrl: "/gallery/4.jpg",
  },
  {
    id: 5,
    label: "MUSIC SHOWCASE",
    sub: "LIVE ACTS",
    imgUrl: "/gallery/5.jpg",
  },
  {
    id: 6,
    label: "BEST PERFORMER",
    sub: "AWARDS 2026",
    imgUrl: "/gallery/6.jpg",
  },
  { id: 7, label: "CROWD MOMENTS", sub: "DAY ONE", imgUrl: "/gallery/7.jpg" },
  {
    id: 8,
    label: "SEC-GEN ADDRESS",
    sub: "INAUGURAL SPEECH",
    imgUrl: "/gallery/8.jpg",
  },
];

const strip2 = [
  {
    id: 9,
    label: "BACKSTAGE LIFE",
    sub: "BEHIND THE SCENES",
    imgUrl: "/gallery/9.jpg",
  },
  {
    id: 10,
    label: "DRAMA & THEATRE",
    sub: "MAIN AUDITORIUM",
    imgUrl: "/gallery/10.jpg",
  },
  {
    id: 11,
    label: "FOOD STALLS",
    sub: "FEST FLAVOURS",
    imgUrl: "/gallery/11.jpg",
  },
  {
    id: 12,
    label: "CROWD PORTRAITS",
    sub: "CLASS OF 2026",
    imgUrl: "/gallery/12.jpg",
  },
  {
    id: 13,
    label: "PHOTOGRAPHY AWARD",
    sub: "BEST CAPTURE",
    imgUrl: "/gallery/13.jpg",
  },
  {
    id: 14,
    label: "FACULTY FELICITATION",
    sub: "GRATITUDE SESSION",
    imgUrl: "/gallery/14.jpg",
  },
  {
    id: 15,
    label: "FINAL MOMENTS",
    sub: "GOODBYES & BONDS",
    imgUrl: "/gallery/15.jpg",
  },
  {
    id: 16,
    label: "REBIRTH OF AAHANS",
    sub: "THEME REVEAL",
    imgUrl: "/gallery/16.jpg",
  },
];

const gradients = [
  "from-[#5a2d00] via-[#8b4513] to-[#3d1a00]",
  "from-[#1a0a00] via-[#7a3800] to-[#2d1500]",
  "from-[#6b3200] via-[#4a1800] to-[#8a4200]",
  "from-[#3d1800] via-[#9a5500] to-[#2a1000]",
  "from-[#4a2000] via-[#7a4000] to-[#1a0800]",
  "from-[#7a3500] via-[#3a1800] to-[#6a3000]",
  "from-[#2a1200] via-[#8a4500] to-[#4a2000]",
  "from-[#5a2800] via-[#1e0d00] to-[#9a5000]",
];

function GalleryCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 overflow-hidden cursor-pointer"
      style={{ width: 340, height: 240 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.04, zIndex: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ↓ Replace with <img src={item.imgUrl} className="absolute inset-0 w-full h-full object-cover" /> */}
      {/* Gradient fallback — hidden once image loads */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`}
      />

      {/* Real image */}
      {item.imgUrl && (
        <img
          src={item.imgUrl}
          alt={item.label}
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 50px rgba(0,0,0,0.65), inset 0 0 1px rgba(194,120,0,0.3)",
        }}
      />

      {/* Bottom scrim */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)",
        }}
        animate={{ opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      />

      {/* Top gold accent line on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #c27800, transparent)",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner brackets */}
      <svg
        className="absolute top-3 left-3 w-5 h-5"
        style={{ opacity: hovered ? 0.9 : 0.35, transition: "opacity 0.3s" }}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M1 9 L1 1 L9 1" stroke="#c27800" strokeWidth="1.5" />
      </svg>
      <svg
        className="absolute bottom-3 right-3 w-5 h-5"
        style={{ opacity: hovered ? 0.9 : 0.35, transition: "opacity 0.3s" }}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M19 11 L19 19 L11 19" stroke="#c27800" strokeWidth="1.5" />
      </svg>

      {/* Index number */}
      <span
        className="absolute top-4 right-5 font-mono text-[9px] tracking-widest"
        style={{ color: "rgba(194,120,0,0.4)" }}
      >
        {String((index % 8) + 1).padStart(2, "0")}
      </span>

      {/* Label */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 px-5 pb-5"
        animate={{ y: hovered ? 0 : 5, opacity: hovered ? 1 : 0.75 }}
        transition={{ duration: 0.3 }}
      >
        <p
          className="text-[8px] tracking-[0.3em] mb-1 font-mono"
          style={{ color: "#c27800" }}
        >
          {item.sub}
        </p>
        <p
          className="text-[13px] font-semibold tracking-[0.14em] text-white uppercase"
          style={{ fontFamily: "'Oswald', 'Arial Narrow', sans-serif" }}
        >
          {item.label}
        </p>
      </motion.div>
    </motion.div>
  );
}

function InfiniteRibbon({ items, direction = 1, speed = 38 }) {
  const tripled = [...items, ...items, ...items];
  const singleSetWidth = items.length * (340 + 20);

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #0d0700, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0d0700, transparent)" }}
      />

      <motion.div
        className="flex gap-5 w-max"
        animate={{
          x: direction > 0 ? [0, -singleSetWidth] : [-singleSetWidth, 0],
        }}
        transition={{
          duration: singleSetWidth / speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {tripled.map((item, i) => (
          <GalleryCard
            key={`${item.id}-${i}`}
            item={item}
            index={i % items.length}
          />
        ))}
      </motion.div>
    </div>
  );
}

function StripLabel({ label }) {
  return (
    <div className="flex items-center gap-4 px-20 pt-5 pb-3">
      <span
        className="font-mono text-[8px] tracking-[0.45em] uppercase whitespace-nowrap"
        style={{ color: "rgba(194,120,0,0.3)" }}
      >
        {label}
      </span>
      <div
        className="w-16 h-px"
        style={{ background: "rgba(194,120,0,0.18)" }}
      />
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="w-full" style={{ background: "transparent" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;600&family=Space+Mono:ital@0;1&display=swap');`}</style>

      {/* ── HEADER ── */}
      <div className="flex items-flex-end justify-between px-20 pt-16 pb-0 relative">
        {/* Vertical gold rule */}
        <div
          className="absolute left-20 top-16"
          style={{
            width: 2,
            height: 56,
            background: "linear-gradient(to bottom, transparent, #c27800)",
          }}
        />
        <div className="pl-5">
          <p
            className="font-mono text-[9px] tracking-[0.35em] mb-3"
            style={{ color: "#c27800" }}
          >
            CONCORD XXVI · REBIRTH OF AAHANS · CALCUTTA BOYS' SCHOOL
          </p>
          <h1
            className="text-[clamp(52px,7vw,96px)] font-semibold leading-none tracking-[0.08em] uppercase text-white"
            style={{ fontFamily: "'Oswald', 'Arial Narrow', sans-serif" }}
          >
            GAL<span style={{ color: "#c27800" }}>L</span>ERY
          </h1>
        </div>
        <div className="text-right pb-2">
          <p
            className="font-mono text-[9px] tracking-[0.3em] leading-loose"
            style={{ color: "rgba(194,120,0,0.5)" }}
          >
            APRIL 18 – 19, 2026
          </p>
          <p
            className="font-mono text-[9px] tracking-[0.3em] leading-loose"
            style={{ color: "rgba(194,120,0,0.5)" }}
          >
            EST. 1877
          </p>
          <p
            className="font-mono text-[9px] tracking-[0.3em] leading-loose"
            style={{ color: "rgba(194,120,0,0.5)" }}
          >
            ANNUAL FEST
          </p>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="flex items-center gap-4 px-20 py-6">
        <span className="text-[6px]" style={{ color: "#c27800" }}>
          ◆
        </span>
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to right, rgba(194,120,0,0.7), rgba(194,120,0,0.08))",
          }}
        />
        <span
          className="font-mono text-[8px] tracking-[0.4em]"
          style={{ color: "rgba(194,120,0,0.35)" }}
        >
          VISUAL ARCHIVE
        </span>
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to left, rgba(194,120,0,0.7), rgba(194,120,0,0.08))",
          }}
        />
        <span className="text-[6px]" style={{ color: "#c27800" }}>
          ◆
        </span>
      </div>

      {/* ── RIBBON 1 ── */}
      <StripLabel label="DAY ONE" />
      <div style={{ paddingBottom: 20 }}>
        <InfiniteRibbon items={strip1} direction={1} speed={38} />
      </div>

      {/* ── RIBBON 2 ── */}
      <StripLabel label="DAY TWO" />
      <InfiniteRibbon items={strip2} direction={-1} speed={44} />
    </div>
  );
}
