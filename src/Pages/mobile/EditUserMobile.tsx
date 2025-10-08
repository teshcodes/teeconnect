// src/pages/Mobile/EditUserMobile.tsx
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MobileSidebar from "../../components/MobileSidebar";

export default function EditUserMobile() {
  const navigate = useNavigate();

  // Simulated fetched user data
  const existingUser = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    username: "johndoe",
    phone: "+2348012345678",
    department: "engineering",
    permission: "admin",
    status: true,
  };

  const [formData, setFormData] = useState(existingUser);
  const [isDirty, setIsDirty] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Toggle Active/Inactive status
    const toggleStatus = () => {
        setFormData((prev) => {
            const updated = { ...prev, status: !prev.status };
            setIsDirty(true);
            return updated;
        });
    };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setIsDirty(false);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Sidebar */}
      <MobileSidebar />

      {/* Content */}
      <div className="flex-1 mt-[60px] overflow-y-auto px-4 pb-10">
        {showSuccess ? (
          // ✅ Success Message
          <div className="flex flex-col px-2 py-8">
            <div className="text-center mt-5">
              <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center mb-5 mx-auto">
                <FaCheckCircle className="text-green-600 text-3xl" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Changes Saved Successfully!
              </h3>
              <p className="text-gray-500 text-sm">
                The user information has been updated.
              </p>
            </div>

            <button
              onClick={() => navigate("/users")}
              className="mt-8 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Done
            </button>
          </div>
        ) : (
          // 📝 Edit Form
          <form onSubmit={handleSave} className="pt-4 space-y-5">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-gray-500"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-gray-500"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-gray-500"
            />

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-gray-500"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-gray-500"
            />

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-600 text-gray-700"
            >
              <option value="" disabled>Select Department *</option>
              <option value="engineering">Engineering</option>
              <option value="marketing">Marketing</option>
              <option value="hr">Human Resources</option>
              <option value="finance">Finance</option>
              <option value="sales">Sales</option>
              <option value="operations">Operations</option>
              <option value="it">IT Support</option>
            </select>


            <select
              name="permission"
              value={formData.permission}
              onChange={handleChange}
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-600 text-gray-700"
            >
              <option value="" disabled>Permission *</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>


            {/* Status Toggle */}
                        <div className="items-center mt-4">
                            <span className="text-gray-700 font-medium">
                                Status*{" "}
                            </span>
                            <div className="flex gap-2 mt-2">
                                 

                                <div
                                    onClick={toggleStatus}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${formData.status ? "bg-green-400" : "bg-gray-300"
                                        }`}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${formData.status ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    ></div>
                                </div>
                                <p>
                                    <span
                                        className={`${formData.status ? "text-green-600" : "text-red-500"
                                            }`}
                                    >
                                        {formData.status ? "Active" : "Inactive"}
                                    </span>
                                </p>
                            </div>
                        </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-5">
              <button
                type="submit"
                disabled={!isDirty}
                className={`w-full text-white py-2 rounded-md transition ${
                  isDirty
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => navigate("/users")}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
