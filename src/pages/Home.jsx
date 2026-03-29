import React from "react";
import BlobBackground from "../components/BlobBackground";
import SponsorRibbon from "../components/SponsorRibbon";
import About from "./About";

const Home = () => {
  return (
    <div className="h-1350 overflow-x-hidden">
      <BlobBackground />

      <div
        id="home"
        className="h-screen w-screen p-0 m-0 relative overflow-hidden"
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

        {/* Phoenix — pushed further right, bleeds off edge naturally */}
        <img
          src="logo.outline.svg"
          alt=""
          draggable="false"
          className="hidden lg:block absolute pointer-events-none z-[2]"
          style={{
            height: "clamp(340px, 70vh, 750px)",
            top: "50%",
            transform: "translateY(-50%)",
            right: "clamp(-2vw, 8vw, 12vw)", // shifted right vs previous 18–22vw
            filter:
              "brightness(1.4) sepia(1) saturate(4) hue-rotate(330deg) drop-shadow(0 0 40px rgba(255,140,20,0.9)) drop-shadow(0 0 80px rgba(255,80,0,0.6)) drop-shadow(0 0 120px rgba(200,40,0,0.4))",
            mixBlendMode: "screen",
            opacity: 0.95,
          }}
        />

        {/* Top-right label */}
        <div className="hidden lg:block absolute top-[4vh] right-[5vw] z-10 text-right">
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
        </div>

        {/* Main left content */}
        <div
          className="hidden lg:flex absolute z-10 flex-col"
          style={{
            left: "clamp(1.5rem, 8vw, 10vw)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-main text-[0.65rem] tracking-[0.45em] uppercase text-amber-400/60 font-bold">
              Est. 1884
            </span>
            <span
              className="w-5 h-px flex-shrink-0"
              style={{ background: "rgba(255,190,60,0.3)" }}
            />
            <span className="font-main text-[0.65rem] tracking-[0.3em] uppercase text-white/30 font-bold">
              Calcutta Boys' School
            </span>
          </div>

          {/* CONCORD — bigger & heavier */}
          <h1
            className="block font-main font-black uppercase"
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
          </h1>

          {/* Edition line */}
          <div className="flex items-center gap-4 mt-5">
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
          </div>

          {/* Ornament */}
          <div className="flex items-center gap-4 mt-10 mb-10">
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
          </div>

          {/* Event info — bigger labels */}
          <div className="flex items-start gap-10">
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
          </div>

          {/* Bottom rule */}
          <div className="flex items-center mt-10">
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
          </div>
        </div>

        {/* Bottom-right est. tag */}
        <div className="hidden lg:block absolute bottom-[4vh] right-[5vw] z-10 text-right">
          <p className="font-main text-[0.6rem] tracking-[0.32em] uppercase text-white/25 font-bold">
            Est. 1884
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
        </div>

        {/* ── MOBILE + TABLET (< lg) ── */}
        <div className="lg:hidden absolute inset-0 z-10 flex flex-col justify-between py-[3vh] px-6">
          {/* Top bar */}
          <div className="flex justify-between items-center">
            <span className="font-main text-[0.6rem] tracking-[0.38em] uppercase text-amber-500/60 font-bold">
              Annual Fest
            </span>
            <span className="font-main text-[0.6rem] tracking-[0.25em] uppercase text-white/30 font-bold">
              Issue XXVI
            </span>
          </div>

          {/* Phoenix */}
          <div
            className="flex items-center justify-center"
            style={{ height: "42vh" }}
          >
            <img
              src="logo.outline.svg"
              alt=""
              draggable="false"
              className="pointer-events-none"
              style={{
                height: "42vh",
                filter:
                  "brightness(1.4) sepia(1) saturate(4) hue-rotate(330deg) drop-shadow(0 0 30px rgba(255,140,20,0.9)) drop-shadow(0 0 60px rgba(255,80,0,0.6)) drop-shadow(0 0 90px rgba(200,40,0,0.4))",
                mixBlendMode: "screen",
                opacity: 0.95,
              }}
            />
          </div>

          {/* Ornament divider */}
          <div className="flex items-center gap-3">
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
          </div>

          {/* Text block */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-main text-[0.58rem] tracking-[0.4em] uppercase text-amber-400/55 font-bold">
                Est. 1884
              </span>
              <span
                className="w-4 h-px flex-shrink-0"
                style={{ background: "rgba(255,190,60,0.3)" }}
              />
              <span className="font-main text-[0.58rem] tracking-[0.25em] uppercase text-white/28 font-bold">
                Calcutta Boys' School
              </span>
            </div>

            <h1
              className="font-main font-black uppercase"
              style={{
                fontSize: "clamp(3.2rem, 18vw, 5.5rem)",
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
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <span className="font-main text-[0.65rem] tracking-[0.3em] uppercase text-amber-400/70 font-bold">
                2026 Edition
              </span>
              <span
                className="w-5 h-px flex-shrink-0"
                style={{ background: "rgba(255,190,60,0.35)" }}
              />
              <span className="font-main text-white/45 text-[0.78rem] tracking-[0.15em] uppercase font-bold">
                Rebirth of Aahans
              </span>
            </div>
          </div>

          {/* Event info */}
          <div className="flex items-start justify-center gap-6">
            <div className="text-center">
              <p className="font-main text-[0.52rem] tracking-[0.4em] uppercase text-amber-400/40 mb-1.5 font-bold">
                Date
              </p>
              <p className="font-main text-[0.78rem] tracking-[0.1em] uppercase text-white/60 font-bold">
                Apr 18–19, 2026
              </p>
            </div>
            <span
              className="w-px h-8 self-center"
              style={{ background: "rgba(255,190,60,0.15)" }}
            />
            <div className="text-center">
              <p className="font-main text-[0.52rem] tracking-[0.4em] uppercase text-amber-400/40 mb-1.5 font-bold">
                Venue
              </p>
              <p className="font-main text-[0.78rem] tracking-[0.1em] uppercase text-white/60 font-bold">
                CBS Campus
              </p>
            </div>
            <span
              className="w-px h-8 self-center"
              style={{ background: "rgba(255,190,60,0.15)" }}
            />
            <div className="text-center">
              <p className="font-main text-[0.52rem] tracking-[0.4em] uppercase text-amber-400/40 mb-1.5 font-bold">
                Issue
              </p>
              <p className="font-main text-[0.78rem] tracking-[0.1em] uppercase text-white/60 font-bold">
                XXVI
              </p>
            </div>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </div>
      <SponsorRibbon />
      <div id="about">
        <About />
      </div>
    </div>
  );
};

export default Home;
