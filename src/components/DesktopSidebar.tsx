import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    { path: "/", label: "Dashboard", icon: "/dashboard-logo.png" },
    { path: "/users", label: "User Management", icon: "/user-logo.png" },
    { path: "/survey", label: "Survey", icon: "/survey-logo.png" },
  ];

  return (
    <aside className="h-screen w-64 bg-[#373737] text-white flex flex-col">
      {/* --- Top: Logo + Company Name --- */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <img src="/mylogo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-semibold">TeshCodes</span>
        </div>
      </div>

      {/* --- Middle: Navigation Links --- */}
      <nav className="flex-1 flex flex-col gap-2 px-4 mt-4">
        {navItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition-colors ${
                isActive
                  ? "bg-[#1F66B7] text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <img src={icon} alt={label} className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* --- Bottom: Profile --- */}
      <div className="p-6 flex items-center gap-3 border-t border-gray-600">
        <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
          <FaUserCircle className="text-2xl" />
        </div>
        <div>
          <p className="font-medium">Tesh Codes</p>
          <p className="text-sm text-gray-400">Admin</p>
        </div>
      </div>
    </aside>
  );
}
