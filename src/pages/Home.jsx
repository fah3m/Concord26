import React from "react";
import { motion } from "framer-motion";
import BlobBackground from "../components/BlobBackground";
import SponsorRibbon from "../components/SponsorRibbon";
import About from "./About";
import Gallery from "./Gallery";

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

const Home = () => {
  return (
    // h-1350 controls total scroll length for BlobBackground — keep as-is
    <div className="h-1350 overflow-x-hidden">
      <BlobBackground />

      {/*
        [FIX] h-svh = 100svh = smallest viewport height (browser chrome always
        visible). This is the safe ceiling on mobile — content will never be
        taller than this, so nothing overflows. Desktop keeps h-screen because
        svh == dvh == lvh on desktop anyway.
      */}
      <div
        id="home"
        className="h-svh w-screen p-0 m-0 relative overflow-hidden"
      >
        {/* Noise grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            opacity: 0.045,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(4,2,1,0.65) 100%)`,
          }}
        />

        {/* Warmth glow */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 55% 50%, rgba(200,90,0,0.28) 0%, transparent 65%),
              radial-gradient(ellipse 45% 50% at 20% 52%, rgba(180,70,0,0.18) 0%, transparent 60%),
              radial-gradient(ellipse 35% 40% at 0% 65%, rgba(120,50,5,0.14) 0%, transparent 65%)
            `,
          }}
        />

        {/* ── DESKTOP (lg+) ── */}

        <motion.div
          className="hidden lg:block absolute pointer-events-none z-[2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.25, ease }}
          style={{
            height: "clamp(340px, 70vh, 750px)",
            top: "50%",
            transform: "translateY(-50%)",
            right: "clamp(-2vw, 8vw, 12vw)",
          }}
        >
          <img
            src="logo.outline.svg"
            alt=""
            draggable="false"
            style={{
              height: "100%",
              display: "block",
              filter:
                "brightness(1.4) sepia(1) saturate(4) hue-rotate(330deg) drop-shadow(0 0 40px rgba(255,140,20,0.9)) drop-shadow(0 0 80px rgba(255,80,0,0.6)) drop-shadow(0 0 120px rgba(200,40,0,0.4))",
              mixBlendMode: "screen",
              opacity: 0.95,
            }}
          />
        </motion.div>

        {/* Top-right label */}
        <motion.div
          className="hidden lg:block absolute top-[4vh] right-[5vw] z-10 text-right"
          {...fadeUp(0.1, 12)}
        >
          <p className="font-main text-[0.65rem] tracking-[0.38em] uppercase text-amber-500/60 mb-1.5 font-bold">
            Annual Fest
          </p>
          <h2
            className="font-main text-white/80 leading-tight tracking-[0.12em] uppercase font-bold"
            style={{
              fontSize: "clamp(0.95rem, 1.3vw, 1.55rem)",
              borderBottom: "1px solid rgba(255,190,60,0.2)",
              paddingBottom: "6px",
            }}
          >
            Calcutta Boys' School
          </h2>
        </motion.div>

        {/* Main left content */}
        <div
          className="hidden lg:flex absolute z-10 flex-col"
          style={{
            left: "clamp(1.5rem, 8vw, 10vw)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <motion.div
            className="flex items-center gap-3 mb-6"
            {...fadeUp(0.05, 14)}
          >
            <span className="font-main text-[0.65rem] tracking-[0.45em] uppercase text-amber-400/60 font-bold">
              Est. 1877
            </span>
            <span
              className="w-5 h-px flex-shrink-0"
              style={{ background: "rgba(255,190,60,0.3)" }}
            />
            <span className="font-main text-[0.65rem] tracking-[0.3em] uppercase text-white/30 font-bold">
              Calcutta Boys' School
            </span>
          </motion.div>

          <motion.h1
            className="block font-main font-black uppercase"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease }}
            style={{
              fontSize: "clamp(4.8rem, 11.5vw, 10.5rem)",
              lineHeight: 0.88,
              letterSpacing: "0.04em",
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundImage:
                "linear-gradient(115deg, rgba(255,140,10,1) 0%, rgba(255,195,60,1) 18%, rgba(255,225,130,1) 35%, rgba(255,255,255,0.97) 55%, rgba(255,240,200,0.85) 100%)",
              filter:
                "drop-shadow(0 0 32px rgba(255,120,0,0.6)) drop-shadow(0 0 10px rgba(255,160,30,0.45))",
            }}
          >
            CONCORD
          </motion.h1>

          <motion.div
            className="flex items-center gap-4 mt-5"
            {...fadeUp(0.3, 12)}
          >
            <span className="font-main text-[0.72rem] tracking-[0.32em] uppercase text-amber-400/75 font-bold">
              2026 Edition
            </span>
            <span
              className="w-8 h-px flex-shrink-0"
              style={{ background: "rgba(255,190,60,0.35)" }}
            />
            <span className="font-main text-white/50 text-[0.88rem] tracking-[0.18em] uppercase font-bold">
              Rebirth of Aahans
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 mt-10 mb-10"
            {...fadeIn(0.42)}
          >
            <div
              style={{
                width: "clamp(60px, 8vw, 120px)",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(255,190,60,0.55))",
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
                width: "clamp(60px, 8vw, 120px)",
                height: "1px",
                background:
                  "linear-gradient(to left, transparent, rgba(255,190,60,0.55))",
              }}
            />
          </motion.div>

          <motion.div className="flex items-start gap-10" {...fadeUp(0.5, 10)}>
            <div>
              <p className="font-main text-[0.58rem] tracking-[0.45em] uppercase text-amber-400/45 mb-2 font-bold">
                Date
              </p>
              <p className="font-main text-[0.92rem] tracking-[0.15em] uppercase text-white/65 font-bold">
                April 18 – 19, 2026
              </p>
            </div>
            <span
              className="w-px self-stretch"
              style={{ background: "rgba(255,190,60,0.15)" }}
            />
            <div>
              <p className="font-main text-[0.58rem] tracking-[0.45em] uppercase text-amber-400/45 mb-2 font-bold">
                Venue
              </p>
              <p className="font-main text-[0.92rem] tracking-[0.15em] uppercase text-white/65 font-bold">
                Calcutta Boys' School
              </p>
            </div>
            <span
              className="w-px self-stretch"
              style={{ background: "rgba(255,190,60,0.15)" }}
            />
            <div>
              <p className="font-main text-[0.58rem] tracking-[0.45em] uppercase text-amber-400/45 mb-2 font-bold">
                Issue
              </p>
              <p className="font-main text-[0.92rem] tracking-[0.15em] uppercase text-white/65 font-bold">
                XXVI
              </p>
            </div>
          </motion.div>

          <motion.div className="flex items-center mt-10" {...fadeIn(0.6)}>
            <div
              style={{
                width: "clamp(80px, 12vw, 180px)",
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(255,190,60,0.5), rgba(255,190,60,0.08))",
              }}
            />
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(255,190,60,0.4)",
                flexShrink: 0,
              }}
            />
          </motion.div>
        </div>

        {/* Bottom-right est. tag */}
        <motion.div
          className="hidden lg:block absolute bottom-[7vh] right-[5vw] z-10 text-right"
          {...fadeUp(0.55, 10)}
        >
          <p className="font-main text-[0.6rem] tracking-[0.32em] uppercase text-white/25 font-bold">
            Est. 1877
          </p>
          <div className="flex flex-col items-end mt-3">
            <span
              className="w-px h-7"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,190,60,0.4), transparent)",
              }}
            />
          </div>
        </motion.div>

        {/* ── MOBILE + TABLET (< lg) ── */}
        {/*
          [FIX] Changed from absolute inset-0 to absolute inset-x-0 with
          explicit top/bottom bounds so it sits within the SVH container.
          flex + justify-between distributes content evenly across the
          available height — no item overflows regardless of navbar size,
          because the parent is already capped at 100svh and overflow:hidden.

          Spacing reduced across the board (py, gaps, phoenix height) so
          all 6 flex children fit comfortably on even small phones (~667px).
        */}
        <div className="lg:hidden absolute inset-x-0 top-0 bottom-0 z-10 flex flex-col justify-between py-[2svh] px-5">
          {/* Top bar */}
          <motion.div
            className="flex justify-between items-center"
            {...fadeUp(0.05, 10)}
          >
            <span className="font-main text-[0.58rem] tracking-[0.38em] uppercase text-amber-500/60 font-bold">
              Annual Fest
            </span>
            <span className="font-main text-[0.58rem] tracking-[0.25em] uppercase text-white/30 font-bold">
              Issue XXVI
            </span>
          </motion.div>

          {/* Phoenix — height capped with svh so it never pushes content */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease }}
          >
            <img
              src="logo.outline.svg"
              alt=""
              draggable="false"
              className="pointer-events-none"
              style={{
                height: "clamp(120px, 32svh, 260px)",
                filter:
                  "brightness(1.4) sepia(1) saturate(4) hue-rotate(330deg) drop-shadow(0 0 30px rgba(255,140,20,0.9)) drop-shadow(0 0 60px rgba(255,80,0,0.6)) drop-shadow(0 0 90px rgba(200,40,0,0.4))",
                mixBlendMode: "screen",
                opacity: 0.95,
              }}
            />
          </motion.div>

          {/* Ornament divider */}
          <motion.div className="flex items-center gap-3" {...fadeIn(0.35)}>
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

          {/* Text block */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="flex items-center gap-2 mb-2"
              {...fadeUp(0.22, 12)}
            >
              <span className="font-main text-[0.55rem] tracking-[0.4em] uppercase text-amber-400/55 font-bold">
                Est. 1877
              </span>
              <span
                className="w-4 h-px flex-shrink-0"
                style={{ background: "rgba(255,190,60,0.3)" }}
              />
              <span className="font-main text-[0.55rem] tracking-[0.25em] uppercase text-white/28 font-bold">
                Calcutta Boys' School
              </span>
            </motion.div>

            <motion.h1
              className="font-main font-black uppercase"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.3, ease }}
              style={{
                fontSize: "clamp(3rem, 17vw, 5rem)",
                lineHeight: 0.88,
                letterSpacing: "0.04em",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage:
                  "linear-gradient(115deg, rgba(255,140,10,1) 0%, rgba(255,195,60,1) 18%, rgba(255,225,130,1) 35%, rgba(255,255,255,0.97) 55%, rgba(255,240,200,0.85) 100%)",
                filter:
                  "drop-shadow(0 0 20px rgba(255,120,0,0.5)) drop-shadow(0 0 6px rgba(255,160,30,0.35))",
              }}
            >
              CONCORD
            </motion.h1>

            <motion.div
              className="flex items-center gap-3 mt-2"
              {...fadeUp(0.4, 10)}
            >
              <span className="font-main text-[0.62rem] tracking-[0.3em] uppercase text-amber-400/70 font-bold">
                2026 Edition
              </span>
              <span
                className="w-4 h-px flex-shrink-0"
                style={{ background: "rgba(255,190,60,0.35)" }}
              />
              <span className="font-main text-white/45 text-[0.74rem] tracking-[0.15em] uppercase font-bold">
                Rebirth of Aahans
              </span>
            </motion.div>
          </div>

          {/* Event info */}
          <motion.div
            className="flex items-start justify-center gap-5"
            {...fadeUp(0.5, 10)}
          >
            <div className="text-center">
              <p className="font-main text-[0.5rem] tracking-[0.4em] uppercase text-amber-400/40 mb-1 font-bold">
                Date
              </p>
              <p className="font-main text-[0.75rem] tracking-[0.08em] uppercase text-white/60 font-bold">
                Apr 18–19, 2026
              </p>
            </div>
            <span
              className="w-px h-7 self-center"
              style={{ background: "rgba(255,190,60,0.15)" }}
            />
            <div className="text-center">
              <p className="font-main text-[0.5rem] tracking-[0.4em] uppercase text-amber-400/40 mb-1 font-bold">
                Venue
              </p>
              <p className="font-main text-[0.75rem] tracking-[0.08em] uppercase text-white/60 font-bold">
                CBS Campus
              </p>
            </div>
            <span
              className="w-px h-7 self-center"
              style={{ background: "rgba(255,190,60,0.15)" }}
            />
            <div className="text-center">
              <p className="font-main text-[0.5rem] tracking-[0.4em] uppercase text-amber-400/40 mb-1 font-bold">
                Issue
              </p>
              <p className="font-main text-[0.75rem] tracking-[0.08em] uppercase text-white/60 font-bold">
                XXVI
              </p>
            </div>
          </motion.div>

          {/* Bottom ornament */}
          <motion.div className="flex items-center gap-3" {...fadeIn(0.6)}>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,190,60,0.25))",
              }}
            />
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(255,190,60,0.35)",
                flexShrink: 0,
              }}
            />
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(255,190,60,0.25))",
              }}
            />
          </motion.div>
        </div>

        <SponsorRibbon />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="gallery">
        <Gallery />
      </div>
    </div>
  );
};

export default Home;
