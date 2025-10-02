import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaBell } from "react-icons/fa";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-purple-600 text-white flex items-center justify-between p-4">
      {/* Left: Hamburger */}
      <button onClick={() => setOpen(!open)}>
        {open ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Center: Title */}
      <h1 className="font-bold">User Management</h1>

      {/* Right: Placeholder (bell/profile/etc) */}
      <div> <FaBell /> </div>

      {/* Slide-out Drawer */}
      {open && (
        <div className="absolute top-14 left-0 w-64 h-screen bg-purple-300 text-black shadow-lg p-4">
          <nav className="space-y-4">
            <NavLink
              to="/dashboard"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "text-[#1F66B7]" : "text-gray-600"
                } hover:text-[#1F66B7] hover:bg-[#1F66B7]`
              }
            >
              <img src="/dashboard-logo.png" /> Dashboard
            </NavLink>

            <NavLink
              to="/users"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "text-[#1F66B7]" : "text-gray-600"
                } hover:text-[#1F66B7]`
              }
            >
              <img src="/user-logo.png" /> User Management
            </NavLink>

            <NavLink
              to="/ai"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "text-[#1F66B7]" : "text-gray-600"
                } hover:text-[#1F66B7]`
              }
            >
              <img src="/survey-logo.png" /> Survey
            </NavLink>
          </nav>

          <button className="mt-6 flex items-center gap-3 text-gray-600 hover:text-red-600">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
