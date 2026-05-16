import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", path: "/", scrollTo: "home" },
  { name: "About", path: "/", scrollTo: "about" },
  { name: "Gallery", path: "/", scrollTo: "gallery" },
  { name: "Contact", path: "/", scrollTo: "contact" },
];

// Events is a separate CTA but scrolls to #events on home, same pattern
const eventsLink = { name: "Events", path: "/", scrollTo: "events" };

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  // Subtract navbar height so content isn't hidden behind it.
  // 80px covers the desktop pill (top-6 + nav height ~56px) and
  // mobile bar (top-4 + nav height ~60px) with a little breathing room.
  const NAVBAR_OFFSET = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export default function Navbar() {
  const [logoHovered, setLogoHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const linkRefs = useRef([]);
  const navRef = useRef(null);
  const pendingScroll = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(null);
      return;
    }
    setActiveSection("home");
    if (pendingScroll.current) {
      const target = pendingScroll.current;
      pendingScroll.current = null;
      setTimeout(() => scrollToId(target), 100);
    }
    // Scroll-based detection: whichever section's top is closest above
    // the middle of the viewport wins. Works for sections of any height.
    const sections = ["home", "about", "gallery", "events", "contact"];
    const onScroll = () => {
      // getBoundingClientRect gives position relative to viewport — always accurate
      // regardless of nesting. A section is "active" once its top has passed
      // 40% down the viewport.
      const trigger = window.innerHeight * 0.4;
      let current = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= trigger) current = id;
      });
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    requestAnimationFrame(() => {
      // Inline so we always read the latest activeSection & location
      let idx;
      if (location.pathname === "/") {
        if (activeSection === "about") idx = 1;
        else if (activeSection === "gallery") idx = 2;
        else if (activeSection === "contact") idx = 3;
        else if (activeSection === "events") idx = -1;
        else idx = 0;
      } else {
        idx = links.findIndex(
          (l) => !l.scrollTo && l.path === location.pathname,
        );
      }

      if (idx === -1) {
        setPillStyle((prev) => ({ ...prev, width: 0 }));
        return;
      }
      const el = linkRefs.current[idx];
      const nav = navRef.current;
      if (!el || !nav) return;
      let left = 0;
      let node = el;
      while (node && node !== nav) {
        left += node.offsetLeft;
        node = node.offsetParent;
      }
      setPillStyle({ left, width: el.offsetWidth });
    });
  }, [location.pathname, activeSection]);

  const handleNav = (link) => {
    if (!link.scrollTo) return;
    setMenuOpen(false);
    if (location.pathname !== "/") {
      pendingScroll.current = link.scrollTo;
      navigate("/");
    } else {
      setTimeout(() => scrollToId(link.scrollTo), 300);
    }
  };

  const isActive = (link, routerIsActive) => {
    if (link.scrollTo) {
      if (location.pathname !== "/") return false;
      return activeSection === link.scrollTo;
    }
    return routerIsActive;
  };

  const eventsIsActive =
    location.pathname === "/" && activeSection === "events";

  const linkClass = (active) =>
    `relative px-4 py-2 rounded-full text-sm font-main tracking-wide transition-all duration-200 z-10 ${
      active
        ? "text-amber-400 font-medium"
        : "text-white/35 hover:text-white/70 font-normal"
    }`;

  return (
    <>
      {/* ── DESKTOP ── */}
      <motion.div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <nav
          ref={navRef}
          className="relative flex items-center gap-0.5 rounded-full px-2.5 py-1.5"
          style={{
            background: "rgba(10,8,5,0.90)",
            border: "1px solid rgba(255,190,60,0.13)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,190,60,0.06)",
          }}
        >
          {/* Sliding amber pill */}
          <motion.span
            className="absolute top-1.5 bottom-1.5 rounded-full pointer-events-none"
            style={{
              background: "rgba(255,185,55,0.11)",
              border: "1px solid rgba(255,185,55,0.28)",
              boxShadow: "0 0 12px rgba(255,185,55,0.08)",
            }}
            animate={{ left: pillStyle.left, width: pillStyle.width }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          />

          {/* Logo */}
          <motion.div
            className="relative w-10 h-10 mr-3 shrink-0 cursor-pointer overflow-hidden rounded-full"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.img
              src="logo.svg"
              alt="logo"
              className="absolute inset-0 w-full h-full rounded-full object-cover"
              animate={{ y: logoHovered ? "100%" : "0%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              draggable="false"
            />
            <motion.img
              src="26.png"
              alt="logo hover"
              className="absolute inset-0 w-full h-full rounded-full object-cover"
              animate={{ y: logoHovered ? "0%" : "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              draggable="false"
            />
          </motion.div>

          {/* Nav links */}
          {links.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.06 + 0.15,
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
            >
              {link.scrollTo ? (
                <button
                  ref={(el) => (linkRefs.current[i] = el)}
                  onClick={() => handleNav(link)}
                  className={linkClass(
                    location.pathname === "/" &&
                      activeSection === link.scrollTo,
                  )}
                >
                  {link.name}
                </button>
              ) : (
                <NavLink
                  ref={(el) => (linkRefs.current[i] = el)}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive: ra }) =>
                    linkClass(isActive(link, ra))
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </motion.div>
          ))}

          {/* Divider */}
          <span
            className="w-px h-4 mx-1 shrink-0"
            style={{ background: "rgba(255,190,60,0.12)" }}
          />

          {/* Events CTA — scrolls to #events instead of navigating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.45,
              type: "spring",
              stiffness: 220,
              damping: 18,
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <button
              onClick={() => handleNav(eventsLink)}
              className="block px-5 py-2 rounded-full text-sm font-medium font-main tracking-wide transition-all duration-200"
              style={{
                background: eventsIsActive
                  ? "rgba(255,185,55,1)"
                  : "rgba(255,185,55,0.92)",
                color: "#0c0a06",
                boxShadow: eventsIsActive
                  ? "0 2px 18px rgba(255,185,55,0.45)"
                  : "0 2px 12px rgba(255,185,55,0.25)",
              }}
            >
              Events
            </button>
          </motion.div>
        </nav>
      </motion.div>

      {/* ── MOBILE ── */}
      <motion.div
        className="fixed top-4 left-4 right-4 z-50 md:hidden"
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <nav
          className="rounded-2xl px-4 py-3"
          style={{
            background: "rgba(10,8,5,0.92)",
            border: "1px solid rgba(255,190,60,0.12)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,190,60,0.05)",
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="relative w-9 h-9 shrink-0 overflow-hidden rounded-full">
              <img
                src="logo.svg"
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hamburger */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              whileTap={{ scale: 0.9 }}
            >
              {[
                menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 },
                menuOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 },
                menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 },
              ].map((anim, i) => (
                <motion.span
                  key={i}
                  className="block rounded-full"
                  style={{
                    height: "1px",
                    width: i === 1 ? "14px" : "20px",
                    background: "rgba(255,185,55,0.65)",
                    alignSelf: i === 1 ? "flex-end" : "center",
                  }}
                  animate={anim}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              ))}
            </motion.button>
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="overflow-hidden"
              >
                <div
                  className="flex flex-col gap-0.5 pt-3 mt-3"
                  style={{ borderTop: "1px solid rgba(255,190,60,0.08)" }}
                >
                  {links.map((link, i) => {
                    const active = link.scrollTo
                      ? location.pathname === "/" &&
                        activeSection === link.scrollTo
                      : location.pathname === link.path;

                    const mobClass = `w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-main tracking-wide transition-all duration-150 flex items-center justify-between`;

                    const activeStyle = {
                      color: "rgba(255,185,55,0.95)",
                      background: "rgba(255,185,55,0.08)",
                      border: "1px solid rgba(255,185,55,0.16)",
                    };
                    const inactiveStyle = {
                      color: "rgba(255,255,255,0.35)",
                    };

                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.05,
                          type: "spring",
                          stiffness: 280,
                          damping: 24,
                        }}
                      >
                        {link.scrollTo ? (
                          <button
                            onClick={() => handleNav(link)}
                            className={mobClass}
                            style={active ? activeStyle : inactiveStyle}
                          >
                            <span>{link.name}</span>
                            <motion.span
                              style={{ fontSize: "10px", opacity: 0.45 }}
                              animate={{ x: active ? 2 : 0 }}
                            >
                              →
                            </motion.span>
                          </button>
                        ) : (
                          <NavLink
                            to={link.path}
                            end={link.path === "/"}
                            onClick={() => setMenuOpen(false)}
                            className={mobClass}
                            style={({ isActive: ra }) =>
                              isActive(link, ra) ? activeStyle : inactiveStyle
                            }
                          >
                            <span>{link.name}</span>
                            <span style={{ fontSize: "10px", opacity: 0.45 }}>
                              →
                            </span>
                          </NavLink>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Mobile Events CTA — scrolls to #events */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: links.length * 0.05,
                      type: "spring",
                      stiffness: 280,
                      damping: 24,
                    }}
                    className="mt-1"
                  >
                    <button
                      onClick={() => handleNav(eventsLink)}
                      className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium font-main tracking-wide"
                      style={{
                        background: "rgba(255,185,55,0.9)",
                        color: "#0c0a06",
                        boxShadow: "0 2px 10px rgba(255,185,55,0.2)",
                      }}
                    >
                      Events
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.div>
    </>
  );
}
