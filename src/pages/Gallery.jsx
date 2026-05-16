import { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allItems = [
  {
    id: 1,
    label: "WESTERN BAND",
    sub: "2026 · KALAMANDIR",
    imgUrl: "/gallery/1.jpg",
    day: 1,
  },
  {
    id: 2,
    label: "FASHION SHOW",
    sub: "PERFORMANCES",
    imgUrl: "/gallery/2.jpg",
    day: 1,
  },
  {
    id: 3,
    label: "WESTERN DANCE",
    sub: "DAY 3",
    imgUrl: "/gallery/3.jpg",
    day: 1,
  },
  {
    id: 4,
    label: "DJ EVENT",
    sub: "DAY 3 KALAMANDIR",
    imgUrl: "/gallery/4.jpg",
    day: 1,
  },
  {
    id: 5,
    label: "FOOTBALL",
    sub: "SPORTS DAY 2",
    imgUrl: "/gallery/5.jpg",
    day: 1,
  },
  {
    id: 6,
    label: "IPL AUCTION",
    sub: "CALCUTTA BOYS' SCHOOL",
    imgUrl: "/gallery/6.jpg",
    day: 1,
  },
  {
    id: 7,
    label: "VISUAL POETRY SLAM",
    sub: "DAY ONE",
    imgUrl: "/gallery/7.jpg",
    day: 1,
  },
  {
    id: 8,
    label: "CROWD MOMENT",
    sub: "KALAMANDIR FINAL PERFORMANCE",
    imgUrl: "/gallery/8.jpg",
    day: 1,
  },
  {
    id: 9,
    label: "WAVES IN TOWN",
    sub: "DAY 3 KALAMANDIR",
    imgUrl: "/gallery/9.jpg",
    day: 2,
  },
  {
    id: 10,
    label: "DRAMA & THEATRE",
    sub: "MAIN AUDITORIUM",
    imgUrl: "/gallery/10.jpg",
    day: 2,
  },
  {
    id: 11,
    label: "FOOD STALLS",
    sub: "FEST FLAVOURS",
    imgUrl: "/gallery/11.jpg",
    day: 2,
  },
  {
    id: 12,
    label: "CROWD PORTRAITS",
    sub: "CLASS OF 2026",
    imgUrl: "/gallery/12.jpg",
    day: 2,
  },
  {
    id: 13,
    label: "PHOTOGRAPHY AWARD",
    sub: "BEST CAPTURE",
    imgUrl: "/gallery/13.jpg",
    day: 2,
  },
  {
    id: 14,
    label: "FACULTY FELICITATION",
    sub: "GRATITUDE SESSION",
    imgUrl: "/gallery/14.jpg",
    day: 2,
  },
  {
    id: 15,
    label: "FINAL MOMENTS",
    sub: "GOODBYES & BONDS",
    imgUrl: "/gallery/15.jpg",
    day: 2,
  },
  {
    id: 16,
    label: "REBIRTH OF AAHANS",
    sub: "THEME REVEAL",
    imgUrl: "/gallery/16.jpg",
    day: 2,
  },
];

const strip1 = allItems.filter((i) => i.day === 1);
const strip2 = allItems.filter((i) => i.day === 2);

const CARD_W = 340;
const CARD_GAP = 20;
const CARD_STRIDE = CARD_W + CARD_GAP;

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

// ── Shared transition configs (defined once, never recreated) ─────────────
const CARD_HOVER_TRANSITION = {
  duration: 0.18,
  ease: [0.25, 0.46, 0.45, 0.94],
};
const LIGHTBOX_TRANSITION = { duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] };
const IMG_TRANSITION = { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] };

// ── LIGHTBOX ─────────────────────────────────────────────────────────────
function Lightbox({ items, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const item = items[idx];

  // Touch-swipe support
  const touchStartX = useRef(null);
  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback(
    (e) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 40)
        dx < 0
          ? setIdx((i) => (i + 1) % items.length)
          : setIdx((i) => (i - 1 + items.length) % items.length);
      touchStartX.current = null;
    },
    [items.length],
  );

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % items.length),
    [items.length],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const CORNERS_SVG = [
    ["top-0 left-0", "M1 12 L1 1 L12 1"],
    ["top-0 right-0", "M23 12 L23 1 L12 1"],
    ["bottom-0 left-0", "M1 12 L1 23 L12 23"],
    ["bottom-0 right-0", "M23 12 L23 23 L12 23"],
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(5,3,0,0.96)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={LIGHTBOX_TRANSITION}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {CORNERS_SVG.map(([cls, d], i) => (
        <svg
          key={i}
          className={`absolute ${cls} w-8 h-8 m-4 pointer-events-none`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d={d} stroke="#c27800" strokeWidth="1" opacity="0.5" />
        </svg>
      ))}

      {/* Close */}
      <button
        className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full"
        style={{
          background: "rgba(194,120,0,0.12)",
          border: "1px solid rgba(194,120,0,0.25)",
        }}
        onClick={onClose}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M1 1L11 11M11 1L1 11"
            stroke="#c27800"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Counter */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em]"
        style={{ color: "rgba(194,120,0,0.45)" }}
      >
        {String(idx + 1).padStart(2, "0")} /{" "}
        {String(items.length).padStart(2, "0")}
      </div>

      {/* Image */}
      <motion.div
        key={idx}
        className="relative mx-16 md:mx-24"
        style={{ maxWidth: "min(860px, 90vw)", maxHeight: "75vh" }}
        initial={{ opacity: 0, scale: 0.97, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={IMG_TRANSITION}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % gradients.length]} rounded-sm`}
        />
        <img
          src={item.imgUrl}
          alt={item.label}
          className="relative block w-full h-full object-contain rounded-sm"
          style={{ maxHeight: "75vh" }}
          draggable="false"
          decoding="async"
        />
        <div
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(194,120,0,0.2), 0 0 60px rgba(0,0,0,0.8)",
          }}
        />
        <div className="absolute -bottom-12 left-0 right-0 flex items-end justify-between px-1">
          <div>
            <p
              className="font-mono text-[8px] tracking-[0.35em] mb-1"
              style={{ color: "#c27800" }}
            >
              {item.sub}
            </p>
            <p
              className="text-[14px] font-semibold tracking-[0.12em] text-white uppercase"
              style={{ fontFamily: "'Oswald','Arial Narrow',sans-serif" }}
            >
              {item.label}
            </p>
          </div>
          <p
            className="font-mono text-[8px] tracking-[0.3em]"
            style={{ color: "rgba(194,120,0,0.35)" }}
          >
            DAY {item.day}
          </p>
        </div>
      </motion.div>

      {/* Prev / Next */}
      {[
        { fn: prev, label: "←", side: "left-3 md:left-6" },
        { fn: next, label: "→", side: "right-3 md:right-6" },
      ].map(({ fn, label, side }) => (
        <button
          key={label}
          className={`absolute ${side} top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full z-10`}
          style={{
            background: "rgba(194,120,0,0.1)",
            border: "1px solid rgba(194,120,0,0.22)",
            transition: "background 0.15s",
          }}
          onClick={(e) => {
            e.stopPropagation();
            fn();
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(194,120,0,0.22)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(194,120,0,0.1)")
          }
        >
          <span className="font-mono text-sm" style={{ color: "#c27800" }}>
            {label}
          </span>
        </button>
      ))}

      {/* Thumbnail strip */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-4 overflow-x-auto max-w-[90vw]"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={(e) => {
              e.stopPropagation();
              setIdx(i);
            }}
            className="relative flex-shrink-0 rounded-[2px] overflow-hidden"
            style={{
              width: 36,
              height: 26,
              outline:
                i === idx
                  ? "1px solid rgba(194,120,0,0.8)"
                  : "1px solid transparent",
              opacity: i === idx ? 1 : 0.4,
              transition: "opacity 0.15s, outline 0.15s",
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]}`}
            />
            <img
              src={it.imgUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ── GALLERY CARD ──────────────────────────────────────────────────────────
// memo: prevents re-renders when ribbon tick doesn't change individual cards
const GalleryCard = memo(function GalleryCard({ item, index, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden cursor-pointer"
      style={{
        width: CARD_W,
        height: 240,
        // CSS-driven transform — composited on GPU, no JS per frame
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.18s cubic-bezier(0.25,0.46,0.45,0.94)",
        zIndex: hovered ? 20 : 1,
        willChange: "transform",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      onClick={onOpen}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`}
      />
      {item.imgUrl && (
        <img
          src={item.imgUrl}
          alt={item.label}
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
          loading="lazy"
          decoding="async"
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

      {/* Bottom gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)",
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 0.18s",
        }}
      />

      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #c27800, transparent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.18s",
        }}
      />

      {/* Expand icon */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: hovered ? 1 : 0,
          transform: `translate(-50%,-50%) scale(${hovered ? 1 : 0.7})`,
          transition: "opacity 0.15s, transform 0.15s",
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(194,120,0,0.18)",
            border: "1px solid rgba(194,120,0,0.4)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 4V1H4M8 1H11V4M11 8V11H8M4 11H1V8"
              stroke="#c27800"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Corner brackets */}
      <svg
        className="absolute top-3 left-3 w-5 h-5"
        style={{ opacity: hovered ? 0.9 : 0.35, transition: "opacity 0.18s" }}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M1 9 L1 1 L9 1" stroke="#c27800" strokeWidth="1.5" />
      </svg>
      <svg
        className="absolute bottom-3 right-3 w-5 h-5"
        style={{ opacity: hovered ? 0.9 : 0.35, transition: "opacity 0.18s" }}
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

      {/* Caption */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 pb-5"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(5px)",
          opacity: hovered ? 1 : 0.75,
          transition: "transform 0.18s, opacity 0.18s",
        }}
      >
        <p
          className="text-[8px] tracking-[0.3em] mb-1 font-mono"
          style={{ color: "#c27800" }}
        >
          {item.sub}
        </p>
        <p
          className="text-[13px] font-semibold tracking-[0.14em] text-white uppercase"
          style={{ fontFamily: "'Oswald','Arial Narrow',sans-serif" }}
        >
          {item.label}
        </p>
      </div>
    </div>
  );
});

// ── INFINITE RIBBON ───────────────────────────────────────────────────────
// Pure CSS @keyframes animation — runs entirely on the compositor thread,
// zero JS per frame, can't jank, pauses instantly via animationPlayState.
function InfiniteRibbon({ items, direction = 1, speed = 38, onCardClick }) {
  const tripled = [...items, ...items, ...items];
  const singleSetW = items.length * CARD_STRIDE;
  const duration = singleSetW / speed;
  const animName = direction > 0 ? "ribbonFwd" : "ribbonRev";
  const [paused, setPaused] = useState(false);

  // Stable per-card open handlers
  const handlers = useRef({});
  items.forEach((item) => {
    if (!handlers.current[item.id]) {
      handlers.current[item.id] = () => onCardClick(item.id);
    }
  });

  return (
    <div
      className="relative overflow-hidden w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Keyframes injected once per ribbon instance */}
      <style>{`
        @keyframes ribbonFwd {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-${singleSetW}px,0,0); }
        }
        @keyframes ribbonRev {
          from { transform: translate3d(-${singleSetW}px,0,0); }
          to   { transform: translate3d(0,0,0); }
        }
      `}</style>

      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #0d0700, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left,  #0d0700, transparent)",
        }}
      />

      {/* Scrolling strip — CSS animation, compositor-only */}
      <div
        className="flex w-max"
        style={{
          gap: CARD_GAP,
          animation: `${animName} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {tripled.map((item, i) => (
          <GalleryCard
            key={`${item.id}-${i}`}
            item={item}
            index={i % items.length}
            onOpen={handlers.current[item.id] ?? (() => onCardClick(item.id))}
          />
        ))}
      </div>
    </div>
  );
}

// ── STRIP LABEL ───────────────────────────────────────────────────────────
function StripLabel({ label }) {
  return (
    <div className="flex items-center gap-4 px-6 md:px-20 pt-5 pb-3">
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

// ── MAIN EXPORT ───────────────────────────────────────────────────────────
export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = useCallback((id, items = allItems) => {
    setLightbox({ items, index: items.findIndex((i) => i.id === id) });
  }, []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <div className="w-full" style={{ background: "transparent" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;600&family=Space+Mono:ital@0;1&display=swap');`}</style>

      {/* ── HEADER ── */}
      <div className="relative px-6 md:px-20 pt-36 md:pt-24 pb-0">
        <div
          className="absolute left-6 md:left-20 top-36 md:top-24"
          style={{
            width: 2,
            height: 48,
            background: "linear-gradient(to bottom, transparent, #c27800)",
          }}
        />
        <div className="pl-4 md:pl-5">
          <p
            className="font-mono text-[8px] tracking-[0.25em] md:tracking-[0.35em] mb-3 leading-relaxed"
            style={{ color: "#c27800" }}
          >
            CONCORD XXVI · REBIRTH OF AAHANS
            <span className="hidden md:inline"> · CALCUTTA BOYS' SCHOOL</span>
          </p>
          <h1
            className="text-[clamp(36px,10vw,72px)] font-semibold leading-none tracking-[0.08em] uppercase text-white"
            style={{ fontFamily: "'Oswald','Arial Narrow',sans-serif" }}
          >
            GAL<span style={{ color: "#c27800" }}>L</span>ERY
          </h1>
          <div className="flex gap-5 mt-3 md:hidden">
            {["APRIL 18–19, 2026", "EST. 1877", "ANNUAL FEST"].map((t) => (
              <p
                key={t}
                className="font-mono text-[7px] tracking-[0.22em]"
                style={{ color: "rgba(194,120,0,0.5)" }}
              >
                {t}
              </p>
            ))}
          </div>
        </div>
        <div className="hidden md:block absolute right-20 bottom-2 text-right">
          {["APRIL 18 – 19, 2026", "EST. 1877", "ANNUAL FEST"].map((t) => (
            <p
              key={t}
              className="font-mono text-[9px] tracking-[0.3em] leading-loose"
              style={{ color: "rgba(194,120,0,0.5)" }}
            >
              {t}
            </p>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="flex items-center gap-3 md:gap-4 px-6 md:px-20 py-5 md:py-6">
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
          className="font-mono text-[7px] md:text-[8px] tracking-[0.3em] md:tracking-[0.4em]"
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

      {/* ── RIBBONS ── */}
      <StripLabel label="DAY ONE" />
      <div style={{ paddingBottom: 20 }}>
        <InfiniteRibbon
          items={strip1}
          direction={1}
          speed={38}
          onCardClick={openLightbox}
        />
      </div>
      <StripLabel label="DAY TWO" />
      <InfiniteRibbon
        items={strip2}
        direction={-1}
        speed={44}
        onCardClick={openLightbox}
      />

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            items={lightbox.items}
            startIndex={lightbox.index}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
