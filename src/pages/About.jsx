import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const fullText = [
  `Calcutta Boys' School is a proud Christian Minority institution, founded in 1877 by Bishop James M. Thoburn under the vision of the Methodist Episcopal Church. Operated under the authority of the Calcutta Boys' School Educational Society, it functions as a registered, non-profit charitable organization affiliated with the Bengal Regional Conference of the Methodist Church in India.`,
  `What began humbly — with just six students on the veranda of a parsonage — has evolved over nearly a century and a half into one of Kolkata's most respected educational institutions. In response to a growing vision and the need to serve more communities, CBS has expanded its footprint with additional campuses in Sonarpur, Beleghata, and Asansol.`,
  `From humble beginnings to a legacy of leadership — Calcutta Boys' School continues to inspire, uplift, and empower generations.`,
];

const stats = [
  { value: "1877", label: "Founded" },
  { value: "147+", label: "Years of Legacy" },
  { value: "4", label: "Campuses" },
];

const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  // Add this effect inside the About component, after your existing useState/useRef
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup in case component unmounts while modal is open
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Desktop ── */}
      <div
        ref={ref}
        className="hidden md:flex relative w-screen overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255,190,60,0.1)",
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        {/* Ambient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
            radial-gradient(ellipse 55% 45% at 85% 55%, rgba(140,60,5,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 10% 60%, rgba(100,40,5,0.08) 0%, transparent 65%)
          `,
          }}
        />
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />

        <div className="relative z-10 w-full px-[10vh] py-[10vh]">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-16"
          >
            <span
              className="w-8 h-px"
              style={{ background: "rgba(255,190,60,0.4)" }}
            />
            <span
              className="font-main text-[0.62rem] tracking-[0.42em] uppercase font-medium"
              style={{ color: "rgba(255,175,40,0.55)" }}
            >
              About the School
            </span>
          </motion.div>

          {/* Two-column layout */}
          <div className="flex items-start gap-24">
            {/* Left — text */}
            <div className="flex-1 flex flex-col gap-10">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.85,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-abahaya text-justify leading-relaxed"
                style={{
                  fontSize: "clamp(1.45rem, 2.2vw, 2.1rem)",
                  // Warm-tinted white — blends with the amber fire bg
                  color: "rgba(255,235,195,0.82)",
                }}
              >
                Calcutta Boys' School is a proud Christian Minority institution,
                founded in{" "}
                <span
                  style={{
                    WebkitTextFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    backgroundImage:
                      "linear-gradient(125deg, rgba(255,175,40,1), rgba(255,210,90,1))",
                  }}
                >
                  1877
                </span>{" "}
                by Bishop James M. Thoburn — grown from six students on a
                veranda into one of Kolkata's most enduring institutions.
              </motion.p>

              {/* Second paragraph — smaller, dimmer */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.75,
                  delay: 0.22,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-abahaya text-justify leading-relaxed"
                style={{
                  fontSize: "clamp(1rem, 1.4vw, 1.3rem)",
                  color: "rgba(255,210,160,0.45)",
                  maxWidth: "42vw",
                }}
              >
                Operated under the Calcutta Boys' School Educational Society,
                with campuses in Sonarpur, Beleghata, and Asansol — a legacy
                built on faith, academic rigour, and service to community.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.36,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.button
                  onClick={() => setIsOpen(true)}
                  whileHover={{
                    scale: 1.02,
                    background: "rgba(255,185,55,0.08)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-6 py-3 cursor-pointer font-main text-[0.68rem] tracking-[0.28em] uppercase font-medium transition-all duration-200"
                  style={{
                    border: "1px solid rgba(255,190,60,0.28)",
                    color: "rgba(255,185,55,0.7)",
                    background: "transparent",
                  }}
                >
                  <img src="/star.svg" alt="" className="h-3.5 opacity-60" />
                  Read Full History
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>
            </div>

            {/* Right — stats, quieter sizing */}
            <div className="flex flex-col gap-12 shrink-0 pt-1">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.18 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-right"
                  style={{
                    borderRight: "1px solid rgba(255,190,60,0.14)",
                    paddingRight: "1.75rem",
                  }}
                >
                  <div
                    className="font-main font-black leading-none"
                    style={{
                      fontSize: "clamp(2.2rem, 3.8vw, 4.2rem)",
                      color: "rgba(255,185,55,0.75)",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="font-main text-[0.58rem] tracking-[0.36em] uppercase font-medium mt-1.5"
                    style={{ color: "rgba(255,190,60,0.28)" }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div
        className="md:hidden relative min-h-screen w-screen flex flex-col justify-center px-6 py-16 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,190,60,0.1)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 70%, rgba(140,60,5,0.1) 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span
              className="w-6 h-px"
              style={{ background: "rgba(255,190,60,0.4)" }}
            />
            <span
              className="font-main text-[0.58rem] tracking-[0.4em] uppercase font-medium"
              style={{ color: "rgba(255,175,40,0.5)" }}
            >
              About the School
            </span>
          </div>

          <p
            className="font-abahaya text-justify leading-relaxed"
            style={{
              fontSize: "clamp(1.25rem, 4.5vw, 1.5rem)",
              color: "rgba(255,235,195,0.8)",
            }}
          >
            Calcutta Boys' School is a proud Christian Minority institution,
            founded in{" "}
            <span
              style={{
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage:
                  "linear-gradient(125deg, rgba(255,175,40,1), rgba(255,210,90,1))",
              }}
            >
              1877
            </span>{" "}
            by Bishop James M. Thoburn — grown from six students on a veranda
            into one of Kolkata's most enduring institutions.
          </p>

          <p
            className="font-abahaya text-justify leading-relaxed"
            style={{
              fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
              color: "rgba(255,210,160,0.4)",
            }}
          >
            With campuses in Sonarpur, Beleghata, and Asansol — a legacy built
            on faith, rigour, and service.
          </p>

          <div className="flex gap-8">
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  borderRight: "1px solid rgba(255,190,60,0.12)",
                  paddingRight: "1rem",
                }}
              >
                <div
                  className="font-main font-black leading-none text-2xl"
                  style={{ color: "rgba(255,185,55,0.75)" }}
                >
                  {s.value}
                </div>
                <div
                  className="font-main text-[0.52rem] tracking-[0.3em] uppercase font-medium mt-1"
                  style={{ color: "rgba(255,190,60,0.28)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-5 py-3 cursor-pointer font-main text-[0.65rem] tracking-[0.26em] uppercase font-medium w-fit"
            style={{
              border: "1px solid rgba(255,190,60,0.26)",
              color: "rgba(255,185,55,0.65)",
              background: "transparent",
            }}
          >
            <img src="/star.svg" alt="" className="h-3.5 opacity-60" />
            Read Full History →
          </motion.button>
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(4,2,1,0.75)",
            }}
            onMouseDown={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl flex flex-col"
              style={{
                background: "rgba(12,8,4,0.96)",
                border: "1px solid rgba(255,190,60,0.16)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-px"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,190,60,0.55), rgba(255,190,60,0.08), transparent)",
                }}
              />

              <div className="flex items-center justify-between px-8 pt-7 pb-5">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="w-4 h-px"
                      style={{ background: "rgba(255,190,60,0.45)" }}
                    />
                    <span
                      className="font-main text-[0.56rem] tracking-[0.4em] uppercase font-medium"
                      style={{ color: "rgba(255,175,40,0.5)" }}
                    >
                      Our Story
                    </span>
                  </div>
                  <h2
                    className="font-main font-semibold tracking-[0.08em] uppercase"
                    style={{
                      fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
                      color: "rgba(255,235,195,0.8)",
                    }}
                  >
                    Calcutta Boys' School
                  </h2>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl leading-none cursor-pointer transition-colors"
                  style={{ color: "rgba(255,190,60,0.3)" }}
                >
                  ✕
                </motion.button>
              </div>

              <div
                className="mx-8"
                style={{ height: "1px", background: "rgba(255,190,60,0.08)" }}
              />

              <div
                className="px-8 py-6 space-y-4"
                style={{ overflowY: "auto", maxHeight: "60vh" }}
              >
                {fullText.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-abahaya text-justify leading-relaxed"
                    style={{
                      fontSize: "clamp(0.95rem, 1.5vw, 1.18rem)",
                      lineHeight: 1.75,
                      color: "rgba(255,220,175,0.62)",
                    }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              <div
                className="px-8 py-4 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(255,190,60,0.07)" }}
              >
                <span
                  className="font-main text-[0.52rem] tracking-[0.35em] uppercase"
                  style={{ color: "rgba(255,190,60,0.2)" }}
                >
                  Est. 1877 · Kolkata
                </span>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="font-main text-[0.58rem] tracking-[0.28em] uppercase transition-colors cursor-pointer"
                  style={{ color: "rgba(255,185,55,0.45)" }}
                >
                  Close →
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;
