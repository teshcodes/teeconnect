import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

type UserData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  phone?: string;
  department?: string;
  permission?: string;
  status?: boolean;
};

export default function EditUserDesktop() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get user data passed via navigate("/users/edit", { state: user })
  const userData = location.state as UserData | null;

  // ✅ Fallback sample data if no user was passed
  const fallbackUser: UserData = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    username: "johndoe",
    phone: "+2348012345678",
    department: "engineering",
    permission: "user",
    status: true,
  };

  // ✅ Merge actual data or fallback
  const existingUser = userData || fallbackUser;

  const [formData, setFormData] = useState<UserData>(existingUser);
  const [isDirty, setIsDirty] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Update dirty state when form changes ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      setIsDirty(JSON.stringify(updated) !== JSON.stringify(existingUser));
      return updated;
    });
  };

  // --- Toggle Active/Inactive status ---
  const toggleStatus = () => {
    setFormData((prev) => {
      const updated = { ...prev, status: !prev.status };
      setIsDirty(true);
      return updated;
    });
  };

  // --- Save handler (simulate success modal) ---
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setIsDirty(false);
  };

  useEffect(() => {
    if (!userData) {
      console.warn("No user data passed — using fallback data");
    }
  }, [userData]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* === Edit Drawer === */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex justify-end z-30">
        <div className="hidden md:flex flex-col w-[450px] h-screen bg-white shadow-2xl relative">
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Edit User</h2>
            <button onClick={() => navigate("/users")}>
              <FaTimes className="text-gray-600 hover:text-gray-800" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSave}
            className="p-6 space-y-5 overflow-y-auto h-[calc(100vh-70px)]"
          >
            {/* First Name */}
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#1F66B7] outline-none"
              />
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#1F66B7] outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#1F66B7] outline-none"
              />
            </div>

            {/* Username */}
            <div>
              <input
                type="text"
                name="username"
                value={formData.username || ""}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#1F66B7] outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#1F66B7] outline-none"
              />
            </div>

            {/* Department */}
            <div>
              <select
                name="department"
                value={formData.department || ""}
                onChange={handleChange}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#1F66B7] outline-none text-gray-700"
              >
                <option value="" disabled>
                  Select Department *
                </option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
                <option value="sales">Sales</option>
                <option value="operations">Operations</option>
                <option value="it">IT Support</option>
              </select>
            </div>

            {/* Permission */}
            <div>
              <select
                name="permission"
                value={formData.permission || ""}
                onChange={handleChange}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#1F66B7] outline-none text-gray-700"
              >
                <option value="" disabled>
                  Permission *
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>

            {/* Status Toggle */}
            <div className="items-center mt-4">
              <span className="text-gray-700 font-medium">Status* </span>
              <div className="flex gap-2 mt-2">
                <div
                  onClick={toggleStatus}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
                    formData.status ? "bg-green-400" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      formData.status ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
                <p>
                  <span
                    className={`${
                      formData.status ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {formData.status ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={!isDirty}
              className={`w-full py-2 rounded-md mt-5 transition ${
                isDirty
                  ? "bg-[#1F66B7] text-white hover:bg-blue-500"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* === Success Modal === */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-end items-start z-50">
          <div className="hidden md:flex flex-col w-[450px] min-h-screen bg-white shadow-2xl relative animate-slide-in">
            <div className="flex flex-col items-center justify-center p-8 space-y-6">
              <div className="w-14 h-14 rounded-full bg-green-100 flex justify-center items-center">
                <FaCheck className="text-green-600 text-xl" />
              </div>

              <h2 className="text-xl font-semibold text-gray-800 text-center">
                User updated successfully!
              </h2>

              <button
                onClick={() => {
                  setShowSuccess(false);
                  navigate("/users");
                }}
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-500 transition"
              >
                Back to Users
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
