import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Events", path: "/gallery" },
];

export default function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1 bg-black rounded-full px-3 py-2 shadow-lg">

        <img
          src='logo.png'
          alt="logo"
          className="w-12 h-12 rounded-full object-cover mr-2 shrink-0 pt-3"
        />

        {links.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {name}
          </NavLink>
        ))}

        <NavLink
          to="/contact"
          className="ml-1 px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-full transition-colors"
        >
          Contact
        </NavLink>

      </nav>
    </div>
  );
}