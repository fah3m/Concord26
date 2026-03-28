import React from "react";
import BlobBackground from "../components/BlobBackground";
import About from "./About";

const Home = () => {
  return (
    <div className="h-1350 overflow-x-hidden">
      <BlobBackground />

      <div
        id="home"
        className="h-screen w-screen p-0 m-0 relative overflow-hidden"
      >
        {/* Noise grain overlay — adds texture and depth */}
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

        {/* Bottom-left warmth behind text */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `
              radial-gradient(ellipse 50% 55% at 5% 90%, rgba(160,75,5,0.22) 0%, transparent 70%),
              radial-gradient(ellipse 35% 40% at 0% 60%, rgba(120,50,5,0.14) 0%, transparent 65%)
            `,
          }}
        />

        {/* Phoenix */}
        <img
          src="logo.outline.svg"
          alt=""
          draggable="false"
          className="h-[65vh] max-sm:h-[80vw] max-sm:right-[5vw] right-[18vw] absolute top-1/2 -translate-y-1/2 pointer-events-none z-[2]"
          style={{
            filter:
              "brightness(1.4) sepia(1) saturate(4) hue-rotate(330deg) drop-shadow(0 0 40px rgba(255,140,20,0.9)) drop-shadow(0 0 80px rgba(255,80,0,0.6)) drop-shadow(0 0 120px rgba(200,40,0,0.4))",
            mixBlendMode: "screen",
            opacity: 0.95,
          }}
        />

        {/* Top Left */}
        <div className="absolute top-[5vh] left-[10vh] max-sm:left-[5vw] max-sm:top-[3vh] z-10">
          <span className="block font-main text-[0.7rem] tracking-[0.4em] uppercase text-amber-400/70 mb-1.5 font-medium">
            Est. 1884
          </span>
          <span className="font-main text-[0.65rem] tracking-[0.25em] uppercase text-white/35 font-medium">
            Calcutta Boys' School
          </span>
        </div>

        {/* Top Right */}
        <div className="absolute top-[5vh] right-[10vh] max-sm:top-[10vh] max-sm:right-[5vw] z-10 text-right">
          <p className="font-main text-[0.65rem] tracking-[0.38em] uppercase text-amber-500/60 mb-2 font-medium">
            Annual Fest
          </p>
          <h2
            className="font-main text-white/85 leading-tight tracking-[0.15em] uppercase font-semibold"
            style={{
              fontSize: "clamp(1.1rem, 1.6vw, 1.75rem)",
              borderBottom: "1px solid rgba(255,190,60,0.22)",
              paddingBottom: "8px",
            }}
          >
            Calcutta Boys' School
          </h2>
        </div>

        {/* Bottom lockup */}
        <div className="absolute bottom-0 left-0 pb-[3vh] pl-[10vh] max-sm:pl-[5vw] max-sm:pb-[5vh] z-10 leading-none">
          <h1
            className="block font-main font-black uppercase max-sm:text-[20vw]"
            style={{
              fontSize: "clamp(4.5rem, 13vw, 12rem)",
              lineHeight: 0.88,
              letterSpacing: "0.03em",
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundImage:
                "linear-gradient(125deg, rgba(255,175,40,0.98) 0%, rgba(255,215,100,1) 22%, rgba(255,255,255,0.97) 50%, rgba(255,255,255,0.82) 100%)",
            }}
          >
            CONCORD
          </h1>
          <div className="flex items-center gap-5 mt-4 pl-1 max-sm:gap-3">
            <span className="font-main text-[0.75rem] tracking-[0.32em] uppercase text-amber-400/75 font-medium">
              2026 Edition
            </span>
            <span
              className="w-10 h-px flex-shrink-0"
              style={{ background: "rgba(255,190,60,0.35)" }}
            />
            <span className="font-main text-white/55 text-[0.95rem] max-sm:text-sm tracking-[0.15em] uppercase font-medium">
              Rebirth of Aahans
            </span>
          </div>
        </div>

        {/* Bottom right */}
        <div className="absolute bottom-[4vh] right-[10vh] max-sm:hidden z-10 text-right">
          <p className="font-main text-[0.65rem] tracking-[0.32em] uppercase text-white/30 font-medium">
            Issue XXVI
          </p>
          <div className="flex flex-col items-end mt-3">
            <span
              className="w-px h-8"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,190,60,0.45), transparent)",
              }}
            />
          </div>
        </div>
      </div>

      <div id="about">
        <About />
      </div>
    </div>
  );
};

export default Home;
