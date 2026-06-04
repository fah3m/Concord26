import { useState, useEffect, useCallback, useRef, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allItems = [
  {
    id: 1,
    label: "WESTERN BAND",
    sub: "2026 · KALAMANDIR",
    imgUrl: "/gallery/1.webp",
    day: 1,
  },
  {
    id: 2,
    label: "FASHION SHOW",
    sub: "PERFORMANCES",
    imgUrl: "/gallery/2.webp",
    day: 1,
  },
  {
    id: 3,
    label: "WESTERN DANCE",
    sub: "DAY 3",
    imgUrl: "/gallery/3.webp",
    day: 1,
  },
  {
    id: 4,
    label: "DJ EVENT",
    sub: "DAY 3 KALAMANDIR",
    imgUrl: "/gallery/4.webp",
    day: 1,
  },
  {
    id: 5,
    label: "FOOTBALL",
    sub: "SPORTS DAY 2",
    imgUrl: "/gallery/5.webp",
    day: 1,
  },
  {
    id: 6,
    label: "IPL AUCTION",
    sub: "CALCUTTA BOYS' SCHOOL",
    imgUrl: "/gallery/6.webp",
    day: 1,
  },
  {
    id: 7,
    label: "VISUAL POETRY SLAM",
    sub: "DAY ONE",
    imgUrl: "/gallery/7.webp",
    day: 1,
  },
  {
    id: 8,
    label: "CROWD MOMENT",
    sub: "KALAMANDIR FINAL PERFORMANCE",
    imgUrl: "/gallery/8.webp",
    day: 1,
  },
  {
    id: 9,
    label: "WAVES IN TOWN",
    sub: "DAY 3 KALAMANDIR",
    imgUrl: "/gallery/9.webp",
    day: 2,
  },
  {
    id: 10,
    label: "ACOUSTIC EVENT",
    sub: "PRELIMS DAY 2",
    imgUrl: "/gallery/10.webp",
    day: 2,
  },
  {
    id: 11,
    label: "WAVES IN TOWN",
    sub: "KALAMANDIR DAY 3",
    imgUrl: "/gallery/11.webp",
    day: 2,
  },
  {
    id: 12,
    label: "MULTIMEDIA VIDEOGRAPHY",
    sub: "MAIN DAY 1",
    imgUrl: "/gallery/12.webp",
    day: 2,
  },
  {
    id: 13,
    label: "SQUID GAME",
    sub: "MAIN DAY 1",
    imgUrl: "/gallery/13.webp",
    day: 2,
  },
  {
    id: 14,
    label: "PRETENTIOUS MOVIE REVIEW",
    sub: "MAIN DAY 1",
    imgUrl: "/gallery/14.webp",
    day: 2,
  },
  {
    id: 15,
    label: "VISUAL POETRY SLAM",
    sub: "MAIN DAY 2",
    imgUrl: "/gallery/15.webp",
    day: 2,
  },
  {
    id: 16,
    label: "FOOTBALL",
    sub: "CBS FIELD",
    imgUrl: "/gallery/16.webp",
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

const LIGHTBOX_TRANSITION = { duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] };
const IMG_TRANSITION = { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] };

// ── LIGHTBOX ──────────────────────────────────────────────────────────────
function Lightbox({ items, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const item = items[idx];

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

      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em]"
        style={{ color: "rgba(194,120,0,0.45)" }}
      >
        {String(idx + 1).padStart(2, "0")} /{" "}
        {String(items.length).padStart(2, "0")}
      </div>

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
const GalleryCard = memo(function GalleryCard({ item, index, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        width: CARD_W,
        height: 240,
        // CSS-driven on compositor thread
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.18s cubic-bezier(0.25,0.46,0.45,0.94)",
        zIndex: hovered ? 20 : 1,
        willChange: "transform",
        // Isolate paint/layout so off-screen cards don't affect main thread
        contain: "layout style",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
// RAF-based scroll with drag-to-scroll + momentum fling.
// Zero CSS @keyframes → no compositor/JS animation conflict.
function InfiniteRibbon({ items, direction = 1, speed = 38, onCardClick }) {
  const repeated = useMemo(() => [...items, ...items, ...items], [items]);
  const singleSetW = useMemo(() => items.length * CARD_STRIDE, [items.length]);
  // Base velocity: negative = moving left (forward for direction 1)
  const baseV = direction > 0 ? -speed : speed;

  const containerRef = useRef(null);
  const stripRef = useRef(null);
  const rafRef = useRef(null);

  // All mutable state lives in a single ref — no re-renders during animation
  const s = useRef({
    offset: 0,
    velocity: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartOffset: 0,
    lastPointerX: 0,
    lastPointerTime: 0,
    pointerVelocity: 0,
    isPaused: false,
    hasDragged: false,
  });

  // Wrap offset into (-singleSetW, 0] for seamless looping with 3 copies
  const wrap = useCallback(
    (offset) => {
      let o = offset % singleSetW;
      if (o > 0) o -= singleSetW;
      return o;
    },
    [singleSetW],
  );

  // Stable per-card open handlers — check hasDragged to suppress click after drag
  const handlerMap = useMemo(() => {
    const map = {};
    items.forEach((item) => {
      map[item.id] = () => {
        if (!s.current.hasDragged) onCardClick(item.id);
      };
    });
    return map;
  }, [items, onCardClick]);

  // Main animation loop — runs on RAF, only touches transform
  useEffect(() => {
    const st = s.current;
    st.velocity = baseV;
    st.offset = 0;
    const DECAY = 5; // how fast velocity recovers toward baseV after a fling
    const FRICTION = 0.88; // per-second friction when hovered (fling decays to 0)
    let lastTime = 0;

    const tick = (timestamp) => {
      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0;
      lastTime = timestamp;

      if (!st.isDragging) {
        if (!st.isPaused) {
          // Decay toward auto-scroll speed (handles post-fling recovery too)
          st.velocity += (baseV - st.velocity) * Math.min(DECAY * dt, 1);
        } else {
          // Hover: let fling momentum decay to a stop (don't auto-scroll)
          st.velocity *= Math.pow(FRICTION, dt * 60);
          if (Math.abs(st.velocity) < 0.3) st.velocity = 0;
        }
        st.offset = wrap(st.offset + st.velocity * dt);
      }
      // During drag: position is set directly in onPointerMove — nothing to do here

      if (stripRef.current) {
        stripRef.current.style.transform = `translate3d(${st.offset}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [baseV, wrap]);

  // ── Pointer handlers ──────────────────────────────────────────────────
  const onPointerDown = useCallback((e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const st = s.current;
    st.isDragging = true;
    st.hasDragged = false;
    st.dragStartX = e.clientX;
    st.dragStartOffset = st.offset;
    st.lastPointerX = e.clientX;
    st.lastPointerTime = performance.now();
    st.pointerVelocity = 0;
    containerRef.current?.setPointerCapture(e.pointerId);
    if (containerRef.current) containerRef.current.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      const st = s.current;
      if (!st.isDragging) return;
      const now = performance.now();
      const dt = (now - st.lastPointerTime) / 1000;
      const dxFromStart = e.clientX - st.dragStartX;

      if (Math.abs(dxFromStart) > 5) st.hasDragged = true;

      // Track instantaneous velocity for fling (px/s, negative = moving left)
      if (dt > 0.004) {
        st.pointerVelocity = (e.clientX - st.lastPointerX) / dt;
      }
      st.lastPointerX = e.clientX;
      st.lastPointerTime = now;
      st.offset = wrap(st.dragStartOffset + dxFromStart);
    },
    [wrap],
  );

  const onPointerUp = useCallback(() => {
    const st = s.current;
    if (!st.isDragging) return;
    st.isDragging = false;
    // Hand off pointer velocity to the animation as a fling
    const maxV = speed * 10;
    st.velocity = Math.max(-maxV, Math.min(maxV, st.pointerVelocity));
    if (containerRef.current) containerRef.current.style.cursor = "grab";
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full select-none"
      style={{ cursor: "grab", touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={() => {
        s.current.isPaused = true;
      }}
      onMouseLeave={() => {
        s.current.isPaused = false;
      }}
    >
      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #0d0700, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0d0700, transparent)" }}
      />

      {/* Scrolling strip — transform set by RAF, compositor-friendly */}
      <div
        ref={stripRef}
        className="flex w-max"
        style={{ gap: CARD_GAP, willChange: "transform" }}
      >
        {repeated.map((item, i) => (
          <GalleryCard
            key={`${item.id}-${i}`}
            item={item}
            index={i % items.length}
            onOpen={handlerMap[item.id]}
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
            CONCORD XXVI · RESURGE RECLAIM REIGN
            <span className="hidden md:inline"> · CALCUTTA BOYS' SCHOOL</span>
          </p>
          <h1
            className="text-[clamp(36px,10vw,72px)] font-semibold leading-none tracking-[0.08em] uppercase text-white"
            style={{ fontFamily: "'Oswald','Arial Narrow',sans-serif" }}
          >
            GAL<span style={{ color: "#c27800" }}>L</span>ERY
          </h1>

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
      <StripLabel label="Concord 2025" />
      <div style={{ paddingBottom: 20 }}>
        <InfiniteRibbon
          items={strip1}
          direction={1}
          speed={38}
          onCardClick={openLightbox}
        />
      </div>
      <StripLabel label="Concord 2025" />
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
