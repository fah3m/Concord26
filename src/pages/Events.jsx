import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// ── Event Data ──────────────────────────────────────────────
const STAGE_EVENTS = [
  { n: "Western Band", code: "Converge" },
  { n: "Western Dance", code: "Conflagration" },
  { n: "Fashion Show", code: "Conjure" },
  { n: "Devotional Choir", code: "Concentus" },
  { n: "Fan Fiction Drama", code: "Conduce" },
  { n: "Acoustic Event", code: "Consonance" },
  { n: "Eastern Music", code: "Concerto" },
  { n: "Instrumental", code: "Composia" },
];

const OFFSTAGE_EVENTS = [
  { n: "Turncoat", code: "Controversy" },
  { n: "Visual Poetry Slam", code: "Consider" },
  { n: "Terribly Tiny Tales", code: "Concoct" },
  { n: "Quiz", code: "Conjecture" },
  { n: "Blogging Contest", code: "Context" },
  { n: "Coding Jam", code: "Configure" },
  { n: "Comic Strip", code: "Connect" },
  { n: "Poster Making", code: "Contrast" },
  { n: "Shark Tank", code: "Convince" },
  { n: "Hindi Monologue", code: "Conviction" },
  { n: "Graphics Designing", code: "Convoke" },
  { n: "Chess", code: "Contemplate" },
  { n: "Console Gaming", code: "Console" },
  { n: "Moot Court", code: "Confer" },
  { n: "Non-Fire Cooking", code: "Continental" },
  { n: "Photography", code: "Convex" },
  { n: "Reel Making", code: "Convey" },
  { n: "Pretentious Movie Review", code: "Contrique" },
  { n: "Dance Face Off", code: "Convene" },
  { n: "Antakshari", code: "Confab" },
  { n: "Robotics", code: "Confect" },
  { n: "Multimedia Videography", code: "Construct" },
  { n: "IPL Auction", code: "Contract" },
  { n: "Mobile Gaming (BGMI)", code: "Conquer" },
];

const FIELD_EVENTS = [
  { n: "Tug Of War (Boys & Girls)", code: "Contest" },
  { n: "Basketball (Boys & Girls)", code: "Contrive" },
  { n: "Football", code: "Consolidate" },
];

const FILTERS = [
  { key: "all", label: "All Events" },
  { key: "stage", label: "On Stage" },
  { key: "offstage", label: "Off Stage" },
  { key: "field", label: "Field" },
];

// ── Sub-components ───────────────────────────────────────────

const DiamondOrnament = () => (
  <motion.div className="flex items-center gap-3 my-12" {...fadeIn(0.1)}>
    <div
      className="flex-1 h-px"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(255,190,60,0.4))",
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
      className="flex-1 h-px"
      style={{
        background:
          "linear-gradient(to left, transparent, rgba(255,190,60,0.4))",
      }}
    />
  </motion.div>
);

const SectionLabel = ({ label, count }) => (
  <motion.div className="flex items-center gap-3 mb-6 mt-10" {...fadeIn(0.15)}>
    <span className="font-main text-[0.58rem] tracking-[0.45em] uppercase text-amber-400/50 font-bold whitespace-nowrap">
      {label}
    </span>
    <span
      className="font-main text-[0.5rem] tracking-[0.35em] uppercase font-bold px-2.5 py-1"
      style={{
        border: "1px solid rgba(255,190,60,0.2)",
        color: "rgba(255,190,60,0.45)",
      }}
    >
      {String(count).padStart(2, "0")}
    </span>
    <div
      className="flex-1 h-px"
      style={{
        background:
          "linear-gradient(to right, rgba(255,190,60,0.25), transparent)",
      }}
    />
  </motion.div>
);

const EventCard = ({ event, index, category, animDelay }) => {
  const num = String(index + 1).padStart(2, "0");
  const catLabel =
    category === "stage"
      ? "Stage"
      : category === "field"
        ? "Field"
        : "Off Stage";

  return (
    <motion.div
      className="relative p-5 group"
      style={{
        border: "1px solid rgba(255,190,60,0.06)",
        background: "rgba(255,255,255,0.015)",
        transition: "background 0.25s, border-color 0.25s",
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: animDelay, ease }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,190,60,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,190,60,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.015)";
        e.currentTarget.style.borderColor = "rgba(255,190,60,0.06)";
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,140,10,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Number row */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: "rgba(255,190,60,0.4)" }}
        />
        <span className="font-main text-[0.52rem] tracking-[0.4em] uppercase text-amber-400/35 font-bold">
          {num}
        </span>
        <span className="font-main text-[0.48rem] tracking-[0.38em] uppercase text-amber-400/30 font-bold ml-auto">
          {catLabel}
        </span>
      </div>

      {/* Event name */}
      <p
        className="font-main text-[0.92rem] tracking-[0.12em] uppercase font-bold leading-tight mb-1.5"
        style={{ color: "rgba(255,255,255,0.72)" }}
      >
        {event.n}
      </p>

      {/* Codename */}
      <p
        className="font-main text-[0.62rem] tracking-[0.3em] uppercase font-bold"
        style={{ color: "rgba(255,190,60,0.6)", fontStyle: "italic" }}
      >
        {event.code}
      </p>

      {/* Corner bracket */}
      <svg
        className="absolute bottom-2.5 right-3 opacity-20 group-hover:opacity-50 transition-opacity duration-300"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M12 0 L12 12 L0 12"
          stroke="rgba(255,190,60,0.9)"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
};

const EventsGrid = ({ events, category, baseDelay = 0 }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "1px",
      border: "1px solid rgba(255,190,60,0.07)",
    }}
  >
    {events.map((ev, i) => (
      <EventCard
        key={ev.code}
        event={ev}
        index={i}
        category={category}
        animDelay={baseDelay + i * 0.04}
      />
    ))}
  </div>
);

// ── Main Page ────────────────────────────────────────────────

const Events = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const show = (cat) => activeFilter === "all" || activeFilter === cat;

  return (
    <div className="overflow-x-hidden">
      {/* Page content */}
      <div
        className="relative pb-24"
        style={{
          padding: "clamp(4rem, 10vh, 7rem) clamp(1.5rem, 6vw, 8vw) 6rem",
        }}
      >
        {/* ── Header ── */}
        <motion.div
          className="flex items-end justify-between flex-wrap gap-8 border-b pb-10"
          style={{
            paddingTop: "clamp(3rem, 8vh, 5rem)",
            borderColor: "rgba(255,190,60,0.15)",
          }}
          {...fadeUp(0.1, 16)}
        >
          <div>
            <p className="font-main text-[0.58rem] tracking-[0.4em] uppercase text-amber-400/50 font-bold mb-3">
              Concord XXVI &nbsp;·&nbsp; Calcutta Boys' School
            </p>
            <h1
              className="font-main font-black uppercase"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 7rem)",
                lineHeight: 0.88,
                letterSpacing: "0.04em",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage:
                  "linear-gradient(115deg, rgba(255,140,10,1) 0%, rgba(255,195,60,1) 18%, rgba(255,225,130,1) 38%, rgba(255,255,255,0.95) 58%, rgba(255,240,200,0.8) 100%)",
                filter: "drop-shadow(0 0 28px rgba(255,120,0,0.5))",
              }}
            >
              EV
              <span style={{ WebkitTextFillColor: "rgba(255,190,60,0.75)" }}>
                E
              </span>
              NTS
            </h1>
          </div>

          <div className="text-right">
            <p className="font-main text-[0.6rem] tracking-[0.3em] uppercase text-white/28 font-bold leading-loose">
              Annual Fest
            </p>
            <p className="font-main text-[0.6rem] tracking-[0.3em] uppercase text-white/28 font-bold leading-loose">
              July 1 – 3, 2026
            </p>
            <p className="font-main text-[0.6rem] tracking-[0.3em] uppercase font-bold leading-loose text-amber-400/45">
              Resurge · Reclaim · Reign
            </p>
          </div>
        </motion.div>

        {/* ── Filter Bar ── */}
        <motion.div
          className="flex gap-2 flex-wrap pt-7 pb-6"
          {...fadeUp(0.2, 12)}
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className="font-main text-[0.6rem] tracking-[0.35em] uppercase font-bold px-4 py-2 transition-all duration-200"
              style={{
                border: `1px solid ${activeFilter === f.key ? "rgba(255,190,60,0.7)" : "rgba(255,190,60,0.2)"}`,
                background:
                  activeFilter === f.key
                    ? "linear-gradient(135deg, rgba(255,160,20,0.95), rgba(255,200,60,0.9))"
                    : "transparent",
                color:
                  activeFilter === f.key ? "#0d0804" : "rgba(255,190,60,0.45)",
                cursor: "pointer",
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* ── On Stage ── */}
        <AnimatePresence>
          {show("stage") && (
            <motion.div
              key="stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SectionLabel label="On Stage" count={STAGE_EVENTS.length} />
              <EventsGrid
                events={STAGE_EVENTS}
                category="stage"
                baseDelay={0.05}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ornament between sections */}
        {show("stage") && show("offstage") && <DiamondOrnament />}

        {/* ── Off Stage ── */}
        <AnimatePresence>
          {show("offstage") && (
            <motion.div
              key="offstage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SectionLabel label="Off Stage" count={OFFSTAGE_EVENTS.length} />
              <EventsGrid
                events={OFFSTAGE_EVENTS}
                category="offstage"
                baseDelay={0.05}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ornament between sections */}
        {show("offstage") && show("field") && <DiamondOrnament />}

        {/* ── Field ── */}
        <AnimatePresence>
          {show("field") && (
            <motion.div
              key="field"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SectionLabel label="Field Events" count={FIELD_EVENTS.length} />
              <EventsGrid
                events={FIELD_EVENTS}
                category="field"
                baseDelay={0.05}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Events;
