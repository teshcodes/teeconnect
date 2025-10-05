import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaClipboardList,
  FaRobot,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 mt-[4pc]">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow hover:scale-[1.02] transition">
          <FaUser className="text-4xl mb-3" />
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-sm opacity-90">Manage all registered users</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow hover:scale-[1.02] transition">
          <FaChartLine className="text-4xl mb-3" />
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p className="text-sm opacity-90">Track system performance</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow hover:scale-[1.02] transition">
          <FaCog className="text-4xl mb-3" />
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="text-sm opacity-90">Update configurations</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow hover:scale-[1.02] transition">
          <FaClipboardList className="text-4xl mb-3" />
          <h2 className="text-xl font-semibold">Surveys</h2>
          <p className="text-sm opacity-90">View and manage surveys</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-xl shadow hover:scale-[1.02] transition">
          <FaRobot className="text-4xl mb-3" />
          <h2 className="text-xl font-semibold">AI Tools</h2>
          <p className="text-sm opacity-90">Explore smart assistants</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Welcome Back! 🎉</h2>
        <p className="text-gray-700 leading-relaxed">
          This is your central dashboard. From here, you can manage users,
          monitor performance, customize settings, and explore surveys or AI
          tools. Everything you need is one click away 🚀.
        </p>
      </div>
    </div>
  );
}
