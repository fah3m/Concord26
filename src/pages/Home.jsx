import React from "react";
import { motion } from "framer-motion";
import BlobBackground from "../components/BlobBackground";
import SponsorRibbon from "../components/SponsorRibbon";
import About from "./About";
import Gallery from "./Gallery";
import Events from "./Events";
import Contact from "./Contact";
import Footer from "../rootLayout/Footer";
import Articles from "./Articles";
import Sponsors from "./Sponsors";

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

const cbs = { fontFamily: "'Canterbury', serif" };

const Home = () => {
  return (
    <div className="min-h-1350 overflow-x-hidden">
      <BlobBackground />

      <div id="home" className="h-svh w-screen p-0 m-0 relative overflow-hidden">

        {/* Noise grain overlay */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }} />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          background: `radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(4,2,1,0.65) 100%)`,
        }} />

        {/* Warmth glow */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 55% 50%, rgba(200,90,0,0.28) 0%, transparent 65%),
            radial-gradient(ellipse 45% 50% at 20% 52%, rgba(180,70,0,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 35% 40% at 0% 65%, rgba(120,50,5,0.14) 0%, transparent 65%)
          `,
        }} />

        {/* ── DESKTOP ── */}

        {/* Phoenix — right side */}
        <motion.div
          className="hidden lg:block absolute pointer-events-none z-[2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.25, ease }}
          style={{
            height: "clamp(340px, 68vh, 720px)",
            top: "50%",
            transform: "translateY(-50%)",
            right: "clamp(2vw, 9vw, 13vw)",
          }}
        >
          <img src="logo.outline.svg" alt="" draggable="false" style={{
            height: "100%",
            display: "block",
            filter: "brightness(1.4) sepia(1) saturate(4) hue-rotate(330deg) drop-shadow(0 0 40px rgba(255,140,20,0.9)) drop-shadow(0 0 80px rgba(255,80,0,0.6)) drop-shadow(0 0 120px rgba(200,40,0,0.4))",
            mixBlendMode: "screen",
            opacity: 0.95,
          }} />
        </motion.div>

        {/* Left content — desktop */}
        <div
          className="hidden lg:flex absolute z-10 flex-col"
          style={{ left: "clamp(1.5rem, 8vw, 10vw)", top: "50%", transform: "translateY(-52%)" }}
        >
          {/* School name */}
          <motion.p
            className="font-bold mb-8"
            style={{ ...cbs, fontSize: "clamp(1.3rem, 3vw, 1.8rem)", color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em" }}
            {...fadeUp(0.05, 10)}
          >
            Calcutta Boys' School
          </motion.p>

          {/* CONCORD */}
          <motion.h1
            className="block font-black"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease }}
            style={{
              ...cbs,
              fontSize: "clamp(4.8rem, 11.5vw, 10.5rem)",
              lineHeight: 0.88,
              letterSpacing: "0.02em",
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundImage: "linear-gradient(115deg, rgba(255,140,10,1) 0%, rgba(255,195,60,1) 18%, rgba(255,225,130,1) 35%, rgba(255,255,255,0.97) 55%, rgba(255,240,200,0.85) 100%)",
              filter: "drop-shadow(0 0 32px rgba(255,120,0,0.6)) drop-shadow(0 0 10px rgba(255,160,30,0.45))",
            }}
          > 
            Concord 2026
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-bold mt-4"
            style={{ ...cbs, fontSize: "clamp(1.3rem, 2vw, 1.9rem)", color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em" }}
            {...fadeUp(0.32, 10)}
          >
            Resurge. Reclaim. Reign.
          </motion.p>

          {/* Presented By block */}
          <motion.div className="mt-5 flex flex-col items-start gap-1.5" {...fadeUp(0.4, 10)}>
            <p className="font-main" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>
              Presented By
            </p>
            <img
              src="/sponsors/idbiii.png"
              alt="IDBI Bank"
              draggable="false"
              style={{
                width: "clamp(14rem, 18vw, 20rem)",
                height: "auto",
                display: "block",
              }}
            />

            <p
              className="font-main"
              style={{
                width: "clamp(14rem, 18vw, 20rem)",
                textAlign: "center",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.12em",
              }}
            >
              Park Street Branch
            </p>
          </motion.div>

          {/* Thin divider */}
          <motion.div className="flex items-center gap-3 mt-8 mb-8" {...fadeIn(0.42)}>
            <div style={{ width: "clamp(50px, 7vw, 110px)", height: "1px", background: "linear-gradient(to right, transparent, rgba(255,190,60,0.5))" }} />
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <rect x="5" y="0.5" width="6.5" height="6.5" transform="rotate(45 5 5)" fill="none" stroke="rgba(255,190,60,0.55)" strokeWidth="0.8" />
              <rect x="5" y="3" width="3" height="3" transform="rotate(45 5 5)" fill="rgba(255,190,60,0.45)" />
            </svg>
            <div style={{ width: "clamp(50px, 7vw, 110px)", height: "1px", background: "linear-gradient(to left, transparent, rgba(255,190,60,0.5))" }} />
          </motion.div>

          {/* Date / Venue / Issue — minimal */}
          <motion.div className="flex items-center gap-8" {...fadeUp(0.5, 10)}>
            <div>
              <p className="font-main text-[0.52rem] tracking-[0.4em] uppercase mb-1.5 font-bold" style={{ color: "rgba(255,190,60,0.4)" }}>Date</p>
              <p className="font-main text-[0.82rem] tracking-[0.1em] font-bold" style={{ color: "rgba(255,255,255,0.55)" }}>July 1 – 3, 2026</p>
            </div>
            <span className="w-px h-6 self-center" style={{ background: "rgba(255,190,60,0.12)" }} />
            <div>
              <p className="font-main text-[0.52rem] tracking-[0.4em] uppercase mb-1.5 font-bold" style={{ color: "rgba(255,190,60,0.4)" }}>Venue</p>
              <p className="font-bold text-[0.82rem]" style={{ ...cbs, color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em" }}>Calcutta Boys' School</p>
            </div>
            <span className="w-px h-6 self-center" style={{ background: "rgba(255,190,60,0.12)" }} />
            <div>
              <p className="font-main text-[0.52rem] tracking-[0.4em] uppercase mb-1.5 font-bold" style={{ color: "rgba(255,190,60,0.4)" }}>Issue</p>
              <p className="font-main text-[0.82rem] tracking-[0.1em] uppercase font-bold" style={{ color: "rgba(255,255,255,0.55)" }}>XXVI</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom-left est tag */}
        <motion.div
          className="hidden lg:block absolute bottom-[6vh] left-[clamp(1.5rem,8vw,10vw)] z-10"
          {...fadeIn(0.6)}
        >
          <p className="font-main text-[0.55rem] tracking-[0.4em] uppercase font-bold" style={{ color: "rgba(255,255,255,0.15)" }}>
            Est. 1877
          </p>
        </motion.div>

        {/* ── MOBILE ── */}
        <div className="lg:hidden absolute inset-x-0 top-0 bottom-0 z-10 flex flex-col justify-between py-[2svh] px-5">

          {/* Top bar */}
          <motion.div className="flex justify-between items-center" {...fadeUp(0.05, 10)}>
            <span className="font-main text-[0.55rem] tracking-[0.35em] uppercase text-amber-500/55 font-bold">Annual Fest</span>
            <span className="font-main text-[0.55rem] tracking-[0.25em] uppercase text-white/25 font-bold">Issue XXVI</span>
          </motion.div>

          {/* Phoenix */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease }}
          >
            <img src="logo.outline.svg" alt="" draggable="false" className="pointer-events-none" style={{
              height: "clamp(120px, 32svh, 260px)",
              filter: "brightness(1.4) sepia(1) saturate(4) hue-rotate(330deg) drop-shadow(0 0 30px rgba(255,140,20,0.9)) drop-shadow(0 0 60px rgba(255,80,0,0.6)) drop-shadow(0 0 90px rgba(200,40,0,0.4))",
              mixBlendMode: "screen",
              opacity: 0.95,
            }} />
          </motion.div>

          {/* Divider */}
          <motion.div className="flex items-center gap-3" {...fadeIn(0.35)}>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,190,60,0.35))" }} />
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <rect x="5" y="0.5" width="6.5" height="6.5" transform="rotate(45 5 5)" fill="none" stroke="rgba(255,190,60,0.55)" strokeWidth="0.8" />
              <rect x="5" y="3" width="3" height="3" transform="rotate(45 5 5)" fill="rgba(255,190,60,0.45)" />
            </svg>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,190,60,0.35))" }} />
          </motion.div>

          {/* Text block */}
          <div className="flex flex-col items-center text-center">
            <motion.p
               className="font-bold mb-2"
                style={{ ...cbs, fontSize: "clamp(1.6rem, 5.5vw, 1.9rem)", color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em" }}
                {...fadeUp(0.2, 10)}
                    >
                     Calcutta Boys' School
          </motion.p>

            <motion.h1
              className="font-black"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.3, ease }}
              style={{
                ...cbs,
                fontSize: "clamp(3.5rem, 18vw, 6rem)",
                lineHeight: 0.88,
                letterSpacing: "0.02em",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage: "linear-gradient(115deg, rgba(255,140,10,1) 0%, rgba(255,195,60,1) 18%, rgba(255,225,130,1) 35%, rgba(255,255,255,0.97) 55%, rgba(255,240,200,0.85) 100%)",
                filter: "drop-shadow(0 0 20px rgba(255,120,0,0.5)) drop-shadow(0 0 6px rgba(255,160,30,0.35))",
              }}
            >
              Concord 2026
            </motion.h1>

            <motion.p
              className="font-bold mt-3"
              style={{ ...cbs, fontSize: "1.15rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em" }}
              {...fadeUp(0.4, 10)}
            >
              Resurge. Reclaim. Reign.
            </motion.p>

            {/* Presented By block */}
            <motion.div className="mt-3 flex flex-col items-center gap-1.5" {...fadeUp(0.45, 10)}>
              <p className="font-main" style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>
                Presented By
              </p>
              <img
                src="/sponsors/idbiii.png"
                alt="IDBI Bank"
                draggable="false"
                style={{
                  width: "clamp(16rem, 65vw, 22rem)",
                  height: "auto",
                  display: "block",
                }}
              />
              <p
                className="font-main"
                style={{
                  width: "clamp(16rem, 65vw, 22rem)",
                  textAlign: "center",
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.1em",
                }}
              >
                Park Street Branch
              </p>
            </motion.div>
          </div>

          {/* Event info */}
          <motion.div className="flex items-center justify-center gap-5" {...fadeUp(0.5, 10)}>
            <div className="text-center">
              <p className="font-main text-[0.48rem] tracking-[0.38em] uppercase text-amber-400/38 mb-1 font-bold">Date</p>
              <p className="font-main text-[0.72rem] tracking-[0.06em] uppercase text-white/55 font-bold">July 1-3, 2026</p>
            </div>
            <span className="w-px h-6 self-center" style={{ background: "rgba(255,190,60,0.12)" }} />
            <div className="text-center">
              <p className="font-main text-[0.48rem] tracking-[0.38em] uppercase text-amber-400/38 mb-1 font-bold">Venue</p>
              <p className="font-bold text-[0.72rem] text-white/55" style={{ ...cbs, letterSpacing: "0.04em" }}>CBS Campus</p>
            </div>
            <span className="w-px h-6 self-center" style={{ background: "rgba(255,190,60,0.12)" }} />
            <div className="text-center">
              <p className="font-main text-[0.48rem] tracking-[0.38em] uppercase text-amber-400/38 mb-1 font-bold">Issue</p>
              <p className="font-main text-[0.72rem] tracking-[0.06em] uppercase text-white/55 font-bold">XXVI</p>
            </div>
          </motion.div>

          {/* Bottom ornament */}
          <motion.div className="flex items-center gap-3" {...fadeIn(0.6)}>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,190,60,0.2))" }} />
            <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,190,60,0.3)", flexShrink: 0 }} />
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,190,60,0.2))" }} />
          </motion.div>
        </div>

        <SponsorRibbon />
      </div>

      <div id="about"><About /></div>
      <div id="articles"><Articles /></div>
      <div id="gallery"><Gallery /></div>
      <div id="sponsors"><Sponsors /></div>
      <div id="events"><Events /></div>
      <div id="contact"><Contact /></div>
      <div className="overflow-x-hidden"><Footer /></div>
    </div>
  );
};

export default Home;