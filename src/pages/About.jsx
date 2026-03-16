import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  const fullText = [
    `Calcutta Boys' School is a proud Christian Minority institution, founded in 1877 by Bishop James M. Thoburn under the vision of the Methodist Episcopal Church. Operated under the authority of the Calcutta Boys' School Educational Society, it functions as a registered, non-profit charitable organization affiliated with the Bengal Regional Conference of the Methodist Church in India.`,
    `What began humbly — with just six students on the veranda of a parsonage — has evolved over nearly a century and a half into one of Kolkata's most respected educational institutions. In response to a growing vision and the need to serve more communities, CBS has expanded its footprint with additional campuses in Sonarpur, Beleghata, and Asansol.`,
    `From humble beginnings to a legacy of leadership — Calcutta Boys' School continues to inspire, uplift, and empower generations.`,
  ];

  return (
    <>
      {/* ── Desktop layout (unchanged) ── */}
      <div className="h-screen w-screen items-center justify-end hidden md:flex">
        <p className="w-[60vw] text-4xl text-white font-abahaya pr-30 pt-10 text-justify relative">
          Calcutta Boys' School is a proud Christian Minority institution,
          founded in 1877 by Bishop James M. Thoburn under the vision of the
          Methodist Episcopal Church. Operated under the authority of the
          Calcutta Boys' School Educational Society... <br /> <br />
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ opacity: 1, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="border-white border-4 flex items-center justify-between py-3 px-5 absolute right-50 opacity-50 cursor-pointer"
          >
            <img src="/star.svg" alt="" className="h-8" />
            <p className="text-3xl pl-4">read more</p>
          </motion.button>
        </p>
      </div>

      {/* ── Mobile layout ── */}
      <div className="min-h-screen w-screen flex flex-col items-end justify-center md:hidden px-6 py-16">
        <p className="w-[80vw] text-2xl text-white font-abahaya text-justify">
          Calcutta Boys' School is a proud Christian Minority institution,
          founded in 1877 by Bishop James M. Thoburn under the vision of the
          Methodist Episcopal Church. Operated under the authority of the
          Calcutta Boys' School Educational Society...
        </p>
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ opacity: 1, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 mr-[10vw] border-white border-4 flex items-center gap-3 py-3 px-5 opacity-50 cursor-pointer"
        >
          <img src="/star.svg" alt="" className="h-6" />
          <span className="text-2xl text-white">read more</span>
        </motion.button>
      </div>

      {/* ── Popup ── */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{
              backdropFilter: "blur(8px)",
              background: "rgba(0,0,0,0.45)",
            }}
            onMouseDown={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl rounded-2xl text-white font-abahaya flex flex-col"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
                <h2 className="text-2xl sm:text-3xl tracking-wide opacity-90">
                  About the School
                </h2>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="text-white opacity-60 hover:opacity-100 text-xl sm:text-2xl leading-none cursor-pointer ml-4"
                >
                  ✕
                </motion.button>
              </div>

              <div
                className="mx-6 sm:mx-8"
                style={{ height: "1px", background: "rgba(255,255,255,0.15)" }}
              />

              {/* Content */}
              <div
                className="px-6 sm:px-8 py-4 sm:py-5 space-y-3 text-justify overflow-hidden"
                style={{
                  fontSize: "clamp(0.72rem, 1.4vw, 1rem)",
                  lineHeight: "1.65",
                }}
              >
                {fullText.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                    className="opacity-80"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              <div className="h-4 shrink-0" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;
