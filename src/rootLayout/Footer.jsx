import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const QUICK_LINKS = [
  { label: "Home", scrollTo: "home" },
  { label: "About", scrollTo: "about" },
  { label: "Gallery", scrollTo: "gallery" },
  { label: "Events", scrollTo: "events" },
  { label: "Contact", scrollTo: "contact" },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const NAVBAR_OFFSET = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,190,60,0.12)",
      }}
    >
      {/* Top rule with diamond */}
      <div className="flex items-center gap-3 px-6" style={{ marginBottom: "-1px" }}>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,190,60,0.25))" }} />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
          <rect x="5" y="0.5" width="6.5" height="6.5" transform="rotate(45 5 5)" fill="none" stroke="rgba(255,190,60,0.5)" strokeWidth="0.8" />
          <rect x="5" y="3" width="3" height="3" transform="rotate(45 5 5)" fill="rgba(255,190,60,0.4)" />
        </svg>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,190,60,0.25))" }} />
      </div>

      <div
        className="grid gap-12 py-14"
        style={{
          padding: "3.5rem clamp(1.5rem, 6vw, 8vw)",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {/* ── Brand column ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <p
            className="font-main font-black uppercase"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              lineHeight: 0.9,
              letterSpacing: "0.05em",
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundImage:
                "linear-gradient(115deg, rgba(255,140,10,1) 0%, rgba(255,195,60,1) 30%, rgba(255,255,255,0.9) 70%)",
            }}
          >
            CONCORD
          </p>
          <p
            className="font-main font-bold uppercase mt-1"
            style={{ fontSize: "0.58rem", letterSpacing: "0.4em", color: "rgba(255,190,60,0.45)" }}
          >
            Issue XXVI · 2026
          </p>

          <div className="flex items-center gap-3 mt-5">
            <div className="h-px w-8" style={{ background: "rgba(255,190,60,0.25)" }} />
            <p className="font-main font-bold uppercase" style={{ fontSize: "0.52rem", letterSpacing: "0.35em", color: "rgba(255,255,255,0.25)" }}>
              Resurge · Reclaim · Reign
            </p>
          </div>

          <div className="mt-6" style={{ borderLeft: "1px solid rgba(255,190,60,0.15)", paddingLeft: "1rem" }}>
            <p className="font-main font-bold uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", lineHeight: 2 }}>
              Calcutta Boys' School
            </p>
            <p className="font-main font-bold uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", lineHeight: 2 }}>
              Est. 1877 · Taltala, Kolkata
            </p>
            <p className="font-main font-bold uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", lineHeight: 2 }}>
              July 1 – 3, 2026
            </p>
          </div>
        </motion.div>

        {/* ── Quick Links ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
        >
          <p
            className="font-main font-bold uppercase mb-5"
            style={{ fontSize: "0.52rem", letterSpacing: "0.45em", color: "rgba(255,190,60,0.4)" }}
          >
            Quick Links
          </p>
          <div className="flex flex-col gap-2">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToId(link.scrollTo)}
                className="font-main font-bold uppercase text-left group flex items-center gap-2 transition-colors duration-200"
                style={{ fontSize: "0.78rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,190,60,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                <span
                  className="w-3 h-px flex-shrink-0 transition-all duration-200"
                  style={{ background: "rgba(255,190,60,0.3)" }}
                />
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Contact Info ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.16, ease }}
        >
          <p
            className="font-main font-bold uppercase mb-5"
            style={{ fontSize: "0.52rem", letterSpacing: "0.45em", color: "rgba(255,190,60,0.4)" }}
          >
            Contact
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-main font-bold uppercase" style={{ fontSize: "0.48rem", letterSpacing: "0.4em", color: "rgba(255,190,60,0.3)", marginBottom: "0.3rem" }}>
                Email
              </p>
              <a
                href="mailto:cbs.main@calcuttaboysschool.edu.in"
                className="font-main font-bold transition-colors duration-200"
                style={{ fontSize: "0.72rem", letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)", textDecoration: "none", wordBreak: "break-all" }}
                onMouseEnter={(e) => (e.target.style.color = "rgba(255,190,60,0.8)")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.4)")}
              >
                cbs.main@calcuttaboysschool.edu.in
              </a>
            </div>
            <div>
              <p className="font-main font-bold uppercase" style={{ fontSize: "0.48rem", letterSpacing: "0.4em", color: "rgba(255,190,60,0.3)", marginBottom: "0.3rem" }}>
                Address
              </p>
              <p className="font-main font-bold" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", lineHeight: 1.8 }}>
                72, SN Banerjee Road<br />
                Maula Ali, Taltala<br />
                Kolkata – 700 014
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{ borderTop: "1px solid rgba(255,190,60,0.07)", padding: "1.25rem clamp(1.5rem, 6vw, 8vw)" }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <p
          className="font-main font-bold uppercase"
          style={{ fontSize: "0.5rem", letterSpacing: "0.35em", color: "rgba(255,255,255,0.18)" }}
        >
          © 2026 Calcutta Boys' School · Concord XXVI
        </p>

        {/* Made by */}
        <div className="flex items-center gap-2">
          <p
            className="font-main font-bold uppercase"
            style={{ fontSize: "0.5rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.18)" }}
          >
            Crafted by
          </p>
          <a
            href="https://github.com/f3him"
            target="_blank"
            rel="noreferrer"
            className="font-main font-bold uppercase transition-colors duration-200"
            style={{ fontSize: "0.5rem", letterSpacing: "0.3em", color: "rgba(255,190,60,0.45)", textDecoration: "none" }}
            onMouseEnter={(e) => (e.target.style.color = "rgba(255,190,60,0.9)")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255,190,60,0.45)")}
          >
            Fahim
          </a>
          <span style={{ fontSize: "0.5rem", color: "rgba(255,190,60,0.25)" }}>&</span>
          <a
            href="https://github.com/s6aunak"
            target="_blank"
            rel="noreferrer"
            className="font-main font-bold uppercase transition-colors duration-200"
            style={{ fontSize: "0.5rem", letterSpacing: "0.3em", color: "rgba(255,190,60,0.45)", textDecoration: "none" }}
            onMouseEnter={(e) => (e.target.style.color = "rgba(255,190,60,0.9)")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255,190,60,0.45)")}
          >
            Shaunak
          </a>
        </div>
      </div>
    </footer>
  );
}
