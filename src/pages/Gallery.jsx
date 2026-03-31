import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─── GLOBAL CSS ─── */
const GALLERY_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Cinzel:wght@700&display=swap');

  @keyframes scrollLeft {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scrollRight {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  .ribbon-left  { animation: scrollLeft  38s linear infinite; }
  .ribbon-right { animation: scrollRight 44s linear infinite; }
  .ribbon-left:hover,
  .ribbon-right:hover { animation-play-state: paused; }

  .gcard {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    flex-shrink: 0;
    cursor: pointer;
    border: 1px solid rgba(255,185,0,0.12);
  }
  .gcard::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(4,2,0,0.82) 0%, rgba(4,2,0,0.12) 45%, transparent 100%);
    transition: opacity 0.35s ease;
    pointer-events: none;
  }
  .gcard:hover::after { opacity: 0.55; }
  .gcard img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
  }
  .gcard:hover img { transform: scale(1.1); }
  .gcard-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 12px 14px 10px;
    z-index: 3;
    transform: translateY(6px);
    opacity: 0;
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
  }
  .gcard:hover .gcard-label { transform: translateY(0); opacity: 1; }

  .grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    opacity: 0.032;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 160px;
  }

  .shimmer-text {
    background: linear-gradient(115deg, rgba(255,140,10,1) 0%, rgba(255,195,60,1) 20%, rgba(255,225,130,1) 38%, rgba(255,255,255,0.96) 55%, rgba(255,230,160,0.85) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 28px rgba(255,120,0,0.5)) drop-shadow(0 0 8px rgba(255,160,30,0.35));
  }
`;

if (
  typeof document !== "undefined" &&
  !document.getElementById("gallery-css")
) {
  const tag = document.createElement("style");
  tag.id = "gallery-css";
  tag.textContent = GALLERY_CSS;
  document.head.appendChild(tag);
}

const ease = [0.16, 1, 0.3, 1];

/* ─── DATA ─── */
const ROW1 = [
  { src: "gall/mayukh.webp", caption: "Opening Ceremony", tag: "AON '25" },
  { src: "gall/israel.webp", caption: "Delegate Sessions", tag: "AON '25" },
  { src: "gall/megacity.webp", caption: "Committee Debate", tag: "AON '25" },
  { src: "gall/aksh.webp", caption: "Best Delegate", tag: "AON '25" },
  { src: "gall/maam.webp", caption: "Faculty Address", tag: "AON '25" },
  { src: "gall/gundaboy.webp", caption: "Cultural Night", tag: "AON '25" },
];

const ROW2 = [
  { src: "gall/flower.webp", caption: "Closing Gala", tag: "AON '24" },
  { src: "gall/mogger.webp", caption: "Press Corps", tag: "AON '24" },
  { src: "gall/mogger2.webp", caption: "Security Council", tag: "AON '24" },
  { src: "gall/desiboy.webp", caption: "Awardees", tag: "AON '24" },
  { src: "gall/head.webp", caption: "Secretariat", tag: "AON '24" },
  { src: "gall/mayukh.webp", caption: "Keynote Address", tag: "AON '24" },
];

/* ─── SCROLL REVEAL ─── */
function Reveal({ children, delay = 0, y = 22 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ─── ORBS ─── */
function Orbs() {
  const orbs = [
    {
      w: "clamp(300px,42vw,600px)",
      top: "-5%",
      left: "30%",
      dur: 20,
      c: "rgba(200,90,0,0.13)",
    },
    {
      w: "clamp(220px,30vw,440px)",
      top: "60%",
      left: "-6%",
      dur: 26,
      c: "rgba(180,70,0,0.10)",
    },
    {
      w: "clamp(180px,22vw,340px)",
      top: "35%",
      right: "-2%",
      dur: 18,
      c: "rgba(220,130,0,0.09)",
    },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: o.w,
            height: o.w,
            top: o.top,
            left: o.left,
            right: o.right,
            background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 20, -14, 0],
            y: [0, -22, 15, 0],
            scale: [1, 1.05, 0.97, 1],
          }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── CARD ─── */
function GCard({ img, w = 300, h = 210, onClick }) {
  return (
    <div
      className="gcard"
      style={{ width: w, height: h }}
      onClick={() => onClick(img)}
    >
      <img
        src={img.src}
        alt={img.caption}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.parentElement.style.background =
            "linear-gradient(135deg, rgba(40,20,0,0.9), rgba(10,5,0,0.95))";
        }}
      />
      <div className="gcard-label">
        <p
          style={{
            fontFamily: "'Oswald',sans-serif",
            fontWeight: 600,
            fontSize: "0.52rem",
            letterSpacing: "0.2em",
            color: "rgba(255,190,60,0.55)",
            textTransform: "uppercase",
          }}
        >
          {img.tag}
        </p>
        <p
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "1.05rem",
            color: "#fff",
            letterSpacing: "0.05em",
          }}
        >
          {img.caption}
        </p>
      </div>
    </div>
  );
}

/* ─── RIBBON ─── */
function Ribbon({ images, dir = "left", cardW = 300, cardH = 210 }) {
  const doubled = [...images, ...images];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        className={dir === "left" ? "ribbon-left" : "ribbon-right"}
        style={{ display: "flex", gap: 16, width: "max-content" }}
      >
        {doubled.map((img, i) => (
          <GCard key={i} img={img} w={cardW} h={cardH} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}

/* ─── RIBBON WITH LIGHTBOX ─── */
function RibbonInteractive({
  images,
  dir = "left",
  cardW = 300,
  cardH = 210,
  onOpen,
}) {
  const doubled = [...images, ...images];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        className={dir === "left" ? "ribbon-left" : "ribbon-right"}
        style={{ display: "flex", gap: 16, width: "max-content" }}
      >
        {doubled.map((img, i) => (
          <GCard key={i} img={img} w={cardW} h={cardH} onClick={onOpen} />
        ))}
      </div>
    </div>
  );
}

/* ─── LIGHTBOX ─── */
function Lightbox({ img, onClose }) {
  return (
    <AnimatePresence>
      {img && (
        <motion.div
          onClick={(e) => e.target === e.currentTarget && onClose()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(3,2,0,0.93)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 290, damping: 26 }}
            style={{
              position: "relative",
              maxWidth: "min(940px, 90vw)",
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid rgba(255,185,0,0.22)",
              boxShadow:
                "0 0 90px rgba(200,110,0,0.2), 0 0 30px rgba(0,0,0,0.7)",
            }}
          >
            <img
              src={img.src}
              alt={img.caption}
              style={{
                width: "100%",
                maxHeight: "72vh",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.style.minWidth = "480px";
                e.target.parentElement.style.minHeight = "300px";
                e.target.parentElement.style.background = "rgba(20,10,0,0.95)";
              }}
            />
            {/* caption */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background:
                  "linear-gradient(to top, rgba(4,2,0,0.96) 0%, transparent 100%)",
                padding: "32px 22px 18px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Oswald',sans-serif",
                  fontWeight: 600,
                  fontSize: "0.55rem",
                  letterSpacing: "0.26em",
                  color: "rgba(255,190,60,0.5)",
                  textTransform: "uppercase",
                }}
              >
                {img.tag}
              </p>
              <p
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(1.6rem,4vw,2.2rem)",
                  color: "#fff",
                  letterSpacing: "0.04em",
                }}
              >
                {img.caption}
              </p>
            </div>
            {/* close */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.12, background: "rgba(255,185,0,0.18)" }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "rgba(10,6,0,0.75)",
                border: "1px solid rgba(255,185,0,0.22)",
                color: "rgba(255,200,60,0.7)",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              ✕
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── ORNAMENT ─── */
function Ornament() {
  return (
    <div className="flex items-center gap-4 justify-center">
      <div
        style={{
          width: "clamp(50px,10vw,140px)",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(255,190,60,0.45))",
        }}
      />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <rect
          x="5"
          y="0.5"
          width="6.5"
          height="6.5"
          transform="rotate(45 5 5)"
          fill="none"
          stroke="rgba(255,190,60,0.6)"
          strokeWidth="0.8"
        />
        <rect
          x="5"
          y="3"
          width="3"
          height="3"
          transform="rotate(45 5 5)"
          fill="rgba(255,190,60,0.5)"
        />
      </svg>
      <div
        style={{
          width: "clamp(50px,10vw,140px)",
          height: "1px",
          background:
            "linear-gradient(to left, transparent, rgba(255,190,60,0.45))",
        }}
      />
    </div>
  );
}

/* ─── MAIN GALLERY PAGE ─── */
export default function Gallery() {
  const [light, setLight] = useState(null);

  return (
    <div
      id="gallery"
      style={{
        background: "transparent",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="grain" />
      <Orbs />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* ══ HEADER ══ */}
        <div
          style={{
            paddingTop: "clamp(64px,10vh,110px)",
            paddingBottom: "clamp(32px,5vh,60px)",
            textAlign: "center",
          }}
        >
          {/* eyebrow */}
          <Reveal delay={0.05}>
            <div className="flex items-center gap-3 justify-center mb-4">
              <span
                style={{
                  fontFamily: "'Oswald',sans-serif",
                  fontWeight: 600,
                  fontSize: "0.62rem",
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                  color: "rgba(255,190,60,0.55)",
                }}
              >
                Est. 1877
              </span>
              <span
                style={{
                  width: 18,
                  height: 1,
                  background: "rgba(255,190,60,0.3)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Oswald',sans-serif",
                  fontWeight: 600,
                  fontSize: "0.62rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                Calcutta Boys' School
              </span>
            </div>
          </Reveal>

          {/* main title */}
          <Reveal delay={0.12}>
            <h1
              className="shimmer-text"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(4.5rem,16vw,11rem)",
                lineHeight: 0.88,
                letterSpacing: "0.04em",
                display: "block",
              }}
            >
              GALLERY
            </h1>
          </Reveal>

          {/* sub */}
          <Reveal delay={0.2}>
            <div className="flex items-center gap-3 justify-center mt-3 flex-wrap">
              <span
                style={{
                  fontFamily: "'Oswald',sans-serif",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,185,60,0.65)",
                }}
              >
                Moments
              </span>
              <span
                style={{
                  width: 24,
                  height: 1,
                  background: "rgba(255,190,60,0.3)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.6rem,1.5vw,0.78rem)",
                  letterSpacing: "0.12em",
                  color: "rgba(220,175,80,0.55)",
                }}
              >
                Concord XXVI · 2026
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-6">
              <Ornament />
            </div>
          </Reveal>
        </div>

        {/* ══ RIBBON 1 — scroll LEFT ══ */}
        <Reveal delay={0.3} y={32}>
          <div style={{ marginBottom: 16 }}>
            {/* label */}
            <div
              style={{ paddingLeft: "clamp(16px,5vw,60px)", marginBottom: 10 }}
            >
              <span
                style={{
                  fontFamily: "'Oswald',sans-serif",
                  fontWeight: 600,
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(255,190,60,0.35)",
                }}
              >
                Concord 2025
              </span>
            </div>

            <RibbonInteractive
              images={ROW1}
              dir="left"
              cardW={320}
              cardH={220}
              onOpen={setLight}
            />
          </div>
        </Reveal>

        {/* ══ RIBBON 2 — scroll RIGHT ══ */}
        <Reveal delay={0.4} y={32}>
          <div style={{ marginTop: 16, marginBottom: 0 }}>
            <div
              style={{ paddingLeft: "clamp(16px,5vw,60px)", marginBottom: 10 }}
            >
              <span
                style={{
                  fontFamily: "'Oswald',sans-serif",
                  fontWeight: 600,
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(255,190,60,0.35)",
                }}
              >
                Concord 2024
              </span>
            </div>

            <RibbonInteractive
              images={ROW2}
              dir="right"
              cardW={360}
              cardH={240}
              onOpen={setLight}
            />
          </div>
        </Reveal>

        {/* ══ DIVIDER ══ */}
        <Reveal delay={0.1}>
          <div style={{ padding: "clamp(40px,7vh,80px) 0 0" }}>
            <Ornament />
          </div>
        </Reveal>

        {/* ══ STATS ROW ══ */}
        <Reveal delay={0.15}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "clamp(24px,4vw,64px)",
              padding: "clamp(32px,5vh,60px) clamp(16px,6vw,60px)",
            }}
          >
            {[
              { num: "6TH", sub: "Edition" },
              { num: "2", sub: "Days" },
              { num: "3", sub: "Committees" },
              { num: "500+", sub: "Delegates" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: "20px 32px",
                  borderRadius: 14,
                  background: "rgba(255,185,0,0.03)",
                  border: "1px solid rgba(255,185,0,0.13)",
                  minWidth: 100,
                }}
              >
                <span
                  className="shimmer-text"
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "clamp(2rem,5vw,3.2rem)",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    fontFamily: "'Oswald',sans-serif",
                    fontWeight: 500,
                    fontSize: "0.5rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,190,60,0.45)",
                  }}
                >
                  {s.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* ══ BOTTOM TAG ══ */}
        <Reveal delay={0.1}>
          <div
            style={{ textAlign: "center", padding: "0 0 clamp(40px,7vh,80px)" }}
          >
            <p
              style={{
                fontFamily: "'Oswald',sans-serif",
                fontWeight: 600,
                fontSize: "0.58rem",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.18)",
              }}
            >
              Calcutta Boys' School · Concord XXVI
            </p>
            <div className="flex justify-center mt-3">
              <div
                style={{
                  width: 1,
                  height: 28,
                  background:
                    "linear-gradient(to bottom, rgba(255,190,60,0.35), transparent)",
                }}
              />
            </div>
          </div>
        </Reveal>
      </div>

      <Lightbox img={light} onClose={() => setLight(null)} />
    </div>
  );
}
