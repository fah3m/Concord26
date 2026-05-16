import { motion } from "framer-motion";

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

const DiamondOrnament = () => (
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
);

const INCHARGES = [
  {
    name: "Arnab Dash",
    role: "USO President",
    phone: "+91 98300 00001",
  },
  {
    name: "Ahaan Moholanobis",
    role: "Head of Tech",
    phone: "+91 98300 00002",
  },
];

export default function Contact() {
  return (
    <div
      className="overflow-x-hidden"
      style={{
        padding: "clamp(4rem, 10vh, 7rem) clamp(1.5rem, 6vw, 8vw) 6rem",
      }}
    >
      {/* ── Header ── */}
      <motion.div
        className="flex items-end justify-between flex-wrap gap-8 border-b pb-10"
        style={{ borderColor: "rgba(255,190,60,0.15)" }}
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
            C
            <span style={{ WebkitTextFillColor: "rgba(255,190,60,0.75)" }}>
              O
            </span>
            NTACT
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

      {/* ── Main grid: info left, map right ── */}
      <div
        className="mt-12 grid gap-8"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
        }}
      >
        {/* ── Left column ── */}
        <div className="flex flex-col gap-8">
          {/* School email */}
          <motion.div {...fadeUp(0.2, 14)}>
            <p className="font-main text-[0.52rem] tracking-[0.45em] uppercase text-amber-400/40 font-bold mb-4 flex items-center gap-2">
              <span
                className="w-4 h-px flex-shrink-0"
                style={{ background: "rgba(255,190,60,0.3)" }}
              />
              General Enquiry
            </p>
            <div
              className="p-5"
              style={{
                border: "1px solid rgba(255,190,60,0.1)",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <p className="font-main text-[0.52rem] tracking-[0.4em] uppercase text-amber-400/35 font-bold mb-2">
                Email
              </p>
              <a
                href="mailto:cbs.main@calcuttaboysschool.edu.in"
                className="font-main font-bold tracking-wide transition-colors duration-200"
                style={{
                  fontSize: "clamp(0.75rem, 1.8vw, 0.95rem)",
                  color: "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                  wordBreak: "break-all",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "rgba(255,190,60,0.85)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.65)")
                }
              >
                cbs.main@calcuttaboysschool.edu.in
              </a>

              {/* thin rule */}
              <div
                className="my-4"
                style={{ height: "1px", background: "rgba(255,190,60,0.08)" }}
              />

              <p className="font-main text-[0.52rem] tracking-[0.4em] uppercase text-amber-400/35 font-bold mb-2">
                Address
              </p>
              <p
                className="font-main font-bold leading-relaxed"
                style={{
                  fontSize: "0.82rem",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                72, SN Banerjee Road Kolkata,
                <br />
                Maula Ali, Taltala,
                <br />
                West Bengal - Kolkata 700014
              </p>
            </div>
          </motion.div>

          {/* Ornament */}
          <motion.div className="flex items-center gap-3" {...fadeIn(0.28)}>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,190,60,0.3))",
              }}
            />
            <DiamondOrnament />
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(255,190,60,0.3))",
              }}
            />
          </motion.div>

          {/* In-charges */}
          <motion.div {...fadeUp(0.32, 14)}>
            <p className="font-main text-[0.52rem] tracking-[0.45em] uppercase text-amber-400/40 font-bold mb-4 flex items-center gap-2">
              <span
                className="w-4 h-px flex-shrink-0"
                style={{ background: "rgba(255,190,60,0.3)" }}
              />
              In-charges
            </p>
            <div className="flex flex-col gap-3">
              {INCHARGES.map((person, i) => (
                <motion.div
                  key={person.name}
                  className="flex items-center justify-between gap-4 p-5"
                  style={{
                    border: "1px solid rgba(255,190,60,0.1)",
                    background: "rgba(255,255,255,0.015)",
                  }}
                  {...fadeUp(0.36 + i * 0.08, 12)}
                >
                  <div>
                    {/* Number tag */}
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: "rgba(255,190,60,0.5)" }}
                      />
                      <span className="font-main text-[0.5rem] tracking-[0.4em] uppercase text-amber-400/35 font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p
                      className="font-main font-bold uppercase tracking-widest"
                      style={{
                        fontSize: "0.88rem",
                        color: "rgba(255,255,255,0.72)",
                      }}
                    >
                      {person.name}
                    </p>
                    <p
                      className="font-main font-bold uppercase tracking-widest mt-0.5"
                      style={{
                        fontSize: "0.52rem",
                        color: "rgba(255,190,60,0.4)",
                        letterSpacing: "0.35em",
                      }}
                    >
                      {person.role}
                    </p>
                  </div>

                  <a
                    href={`tel:${person.phone.replace(/\s/g, "")}`}
                    className="font-main font-bold tracking-wide text-right transition-colors duration-200 flex-shrink-0"
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                      letterSpacing: "0.1em",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = "rgba(255,190,60,0.85)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = "rgba(255,255,255,0.5)")
                    }
                  >
                    {person.phone}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom ornament line */}
          <motion.div className="flex items-center" {...fadeIn(0.55)}>
            <div
              style={{
                width: "clamp(80px, 12vw, 160px)",
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(255,190,60,0.4), rgba(255,190,60,0.08))",
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
          </motion.div>
        </div>

        {/* ── Right column: Map ── */}
        <motion.div className="flex flex-col gap-3" {...fadeUp(0.25, 14)}>
          <p className="font-main text-[0.52rem] tracking-[0.45em] uppercase text-amber-400/40 font-bold flex items-center gap-2">
            <span
              className="w-4 h-px flex-shrink-0"
              style={{ background: "rgba(255,190,60,0.3)" }}
            />
            Find Us
          </p>

          {/* Map wrapper */}
          <div
            className="relative overflow-hidden flex-1"
            style={{
              border: "1px solid rgba(255,190,60,0.12)",
              minHeight: "clamp(300px, 50vh, 520px)",
            }}
          >
            {/* Amber tint overlay to match site palette */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "rgba(20,8,0,0.18)",
                mixBlendMode: "multiply",
              }}
            />

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.4943645797343!2d88.36275767577595!3d22.560606333408884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276ff02a9814b%3A0xcd2ed99703fb97fa!2sCalcutta%20Boys&#39;%20School!5e0!3m2!1sen!2sin!4v1778915262000!5m2!1sen!2sin"
              title="Calcutta Boys' School location"
              width="100%"
              height="100%"
              style={{
                border: 0,
                display: "block",
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                filter: "grayscale(0.3) sepia(0.25) brightness(0.85)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Map caption */}
          <div className="flex items-center justify-between">
            <p
              className="font-main font-bold uppercase"
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.3em",
                color: "rgba(255,190,60,0.4)",
              }}
            >
              Calcutta Boys' School · SN Banerjee
            </p>
            <a
              href="https://maps.google.com/?q=Calcutta+Boys+School"
              target="_blank"
              rel="noreferrer"
              className="font-main font-bold uppercase transition-colors duration-200"
              style={{
                fontSize: "0.52rem",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "rgba(255,190,60,0.7)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(255,255,255,0.3)")
              }
            >
              Open in Maps ↗
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Footer line ── */}
      <motion.div className="flex items-center gap-4 mt-16" {...fadeIn(0.6)}>
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to right, rgba(255,190,60,0.2), transparent)",
          }}
        />
        <p
          className="font-main font-bold uppercase"
          style={{
            fontSize: "0.52rem",
            letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          Est. 1877
        </p>
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to left, rgba(255,190,60,0.2), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
