import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", path: "/", scrollTo: "home" },
  { name: "About", path: "/", scrollTo: "about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

function scrollToId(id) {
  let attempts = 0;
  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (attempts < 20) {
      attempts++;
      setTimeout(tryScroll, 50);
    }
  };
  tryScroll();
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
      scrollToId(target);
    }
    const sections = ["home", "about"];
    const observers = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [location.pathname]);

  const getActiveLinkIndex = () => {
    if (location.pathname === "/") {
      return activeSection === "about" ? 1 : 0;
    }
    return links.findIndex((l) => !l.scrollTo && l.path === location.pathname);
  };

  useEffect(() => {
    const idx = getActiveLinkIndex();
    const el = linkRefs.current[idx];
    const nav = navRef.current;
    if (!el || !nav) return;

    // Measure relative to the nav container, not the page
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPillStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
  }, [location.pathname, activeSection]);

  const handleNav = (link) => {
    setMenuOpen(false);
    if (!link.scrollTo) return;
    if (location.pathname !== "/") {
      pendingScroll.current = link.scrollTo;
      navigate("/");
    } else {
      scrollToId(link.scrollTo);
    }
  };

  const isActive = (link, routerIsActive) => {
    if (link.scrollTo) {
      if (location.pathname !== "/") return false;
      return activeSection === link.scrollTo;
    }
    return routerIsActive;
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <nav
          ref={navRef}
          className="relative flex items-center gap-1 bg-black/70 rounded-full px-3 py-2 shadow-xl shadow-black/20"
        >
          {/* Floating pill */}
          <motion.span
            className="absolute top-2 bottom-2 bg-white rounded-full pointer-events-none"
            animate={{ left: pillStyle.left, width: pillStyle.width }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          />

          {/* Logo */}
          <div
            className="relative w-12 h-12 mr-4 shrink-0 cursor-pointer overflow-hidden rounded-full"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
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
          </div>

          {/* Links */}
          {links.map((link, i) => {
            if (link.scrollTo) {
              const active =
                location.pathname === "/" && activeSection === link.scrollTo;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.2 }}
                >
                  <button
                    ref={(el) => (linkRefs.current[i] = el)}
                    onClick={() => handleNav(link)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors font-main ${
                      active ? "text-black" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                  </button>
                </motion.div>
              );
            }
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.2 }}
              >
                <NavLink
                  ref={(el) => (linkRefs.current[i] = el)}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive: ra }) => {
                    const active = isActive(link, ra);
                    return `relative px-4 py-2 rounded-full text-sm font-medium transition-colors font-main ${
                      active ? "text-black" : "text-gray-400 hover:text-white"
                    }`;
                  }}
                >
                  <span className="relative z-10">{link.name}</span>
                </NavLink>
              </motion.div>
            );
          })}

          {/* Events */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="ml-1"
          >
            <NavLink
              to="/events"
              className="block px-5 py-2.5 bg-green-700 hover:bg-green-600 text-white text-sm font-medium rounded-full transition-colors font-main"
            >
              Events
            </NavLink>
          </motion.div>
        </nav>
      </motion.div>

      {/* Mobile Navbar */}
      <motion.div
        className="fixed top-4 left-4 right-4 z-50 md:hidden"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <nav className="bg-black rounded-2xl px-4 py-3 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">
            <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full">
              <img
                src="logo.svg"
                alt="logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            >
              <motion.span
                className="block h-0.5 w-6 bg-white rounded-full origin-center"
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white rounded-full"
                animate={
                  menuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white rounded-full origin-center"
                animate={
                  menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-1 pt-4 pb-2">
                  {links.map((link, i) => {
                    if (link.scrollTo) {
                      const active =
                        location.pathname === "/" &&
                        activeSection === link.scrollTo;
                      return (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                        >
                          <button
                            onClick={() => handleNav(link)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors font-main ${
                              active
                                ? "bg-white text-black"
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {link.name}
                          </button>
                        </motion.div>
                      );
                    }
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <NavLink
                          to={link.path}
                          end={link.path === "/"}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive: ra }) => {
                            const active = isActive(link, ra);
                            return `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors font-main ${
                              active
                                ? "bg-white text-black"
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                            }`;
                          }}
                        >
                          {link.name}
                        </NavLink>
                      </motion.div>
                    );
                  })}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: links.length * 0.06 }}
                    className="mt-1"
                  >
                    <NavLink
                      to="/events"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2.5 bg-green-700 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-colors text-center font-main"
                    >
                      Events
                    </NavLink>
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
