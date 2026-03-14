import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [logoHovered, setLogoHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <nav className="flex items-center gap-1 bg-black rounded-full px-3 py-2 shadow-xl shadow-black/20">
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
            />
            <motion.img
              src="26.png"
              alt="logo hover"
              className="absolute inset-0 w-full h-full rounded-full object-cover"
              animate={{ y: logoHovered ? "0%" : "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </div>

          {links.map(({ name, path }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 + 0.2 }}
            >
              <NavLink
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full text-sm font-medium transition-colors font-main ${
                    isActive ? "text-black" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="pill"
                        className="absolute inset-0 bg-white rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 28,
                        }}
                      />
                    )}
                    <span className="relative z-10">{name}</span>
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}

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
            {/* Logo */}
            <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full">
              <img
                src="logo.png"
                alt="logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* Hamburger */}
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

          {/* Mobile Menu */}
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
                  {links.map(({ name, path }, i) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <NavLink
                        to={path}
                        end={path === "/"}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors font-main ${
                            isActive
                              ? "bg-white text-black"
                              : "text-gray-400 hover:text-white hover:bg-white/10"
                          }`
                        }
                      >
                        {name}
                      </NavLink>
                    </motion.div>
                  ))}

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
