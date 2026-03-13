import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Events", path: "/events" },
];

export default function Navbar() {
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <motion.div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
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
            src="logo.png"
            alt="logo"
            className="absolute inset-0 w-full h-full rounded-full object-cover"
            animate={{ y: logoHovered ? "100%" : "0%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
          <motion.img
            src="cbslogo.png"
            alt="logo hover"
            className="absolute inset-0 w-full h-full rounded-full object-cover"
            animate={{ y: logoHovered ? "0%" : "-110%" }}
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
            to="/contact"
            className="block px-5 py-2.5 bg-green-700 hover:bg-green-600 text-white text-sm font-medium rounded-full transition-colors font-main"
          >
            Contact
          </NavLink>
        </motion.div>
      </nav>
    </motion.div>
  );
}
