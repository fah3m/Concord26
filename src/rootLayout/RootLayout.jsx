import { Outlet, NavLink } from "react-router-dom";
import Navbar from "./Navbar";

export default function RootLayout() {
  return (
    <div>
        <Navbar />

      <main>
        {/* Outlet = where child routes render */}
        <Outlet />
      </main>
    </div>
  );
}
