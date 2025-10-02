import { useNavigate } from "react-router-dom";
import { FaUser, FaChartLine, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
          <FaUser className="text-blue-500 text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-gray-600">Manage all registered users</p>
        </div>

        <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
          <FaChartLine className="text-green-500 text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Analytics</h2>
          <p className="text-gray-600">Track your system performance</p>
        </div>

        <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
          <FaCog className="text-yellow-500 text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Settings</h2>
          <p className="text-gray-600">Update configurations and options</p>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Welcome Back!</h2>
        <p className="text-gray-700">
          This is your dashboard. From here, you can access analytics, user
          management, and settings. 🚀
        </p>
      </div>
    </div>
  );
}
