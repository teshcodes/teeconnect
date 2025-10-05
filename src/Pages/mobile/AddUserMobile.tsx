import { useState } from "react";
import { FaTimes, FaExclamationCircle, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MobileSidebar from "../../components/MobileSidebar";  

export default function AddUserMobile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
    department: "",
    permission: "",
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};
    ["firstName", "lastName", "email", "department", "permission"].forEach(
      (field) => {
        if (!formData[field as keyof typeof formData]) newErrors[field] = true;
      }
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    setTimeout(() => setSuccess(true), 400);
  };

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <MobileSidebar />

      {/* Main Content Area */}
      <div className="flex-1 mt-[60px] overflow-y-auto px-4 pb-10">
        {/* 🔴 Alert */}
        {showAlert && (
          <div className="flex items-center justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-4">
            <div className="flex items-center gap-4">
              <div className="bg-red-200 p-2 rounded-full">
                <FaExclamationCircle className="text-red-400 text-lg" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Please fill in all required fields.
                </p>
                <p className="text-sm">Double-check and try again.</p>
              </div>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <FaTimes size={14} />
            </button>
          </div>
        )}

        {/* ✅ Success Screen */}
        {success ? (
          <div className="flex flex-col px-2 py-8">
            <div className="text-center mt-5">
              <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center mb-5 mx-auto">
                <img src="/check-circle.png" alt="check" className="w-8 h-8" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                User Added Successfully!
              </h3>
            </div>

            <div className="text-gray-600 text-sm space-y-2 mb-6 text-start mt-4">
              <p className="mb-5">
                <span className="text-gray-400">Full Name: </span>
                {fullName || "N/A"}
              </p>
              <p className="mb-5">
                <span className="text-gray-400">Email Address: </span>
                <p>{formData.email || "N/A"}</p>
              </p>
              <p className="mb-3">
                <span className="text-gray-400">Permission: </span>
                {formData.permission || "N/A"}
              </p>
              <p className="underline text-purple-500 font-medium cursor-pointer">
                Edit
              </p>
            </div>

            <button
              onClick={() => {
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  username: "",
                  phone: "",
                  department: "",
                  permission: "",
                });
                setSuccess(false);
              }}
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition mb-3"
            >
              Finish
            </button>

            <button
              onClick={() => navigate("/users")}
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              <FaPlus /> Add more Users
            </button>
          </div>
        ) : (
          // 📝 Form Section
          <form
            onSubmit={handleSubmit}
            className="pt-4 space-y-5 overflow-y-auto"
          >
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name *"
              className={`w-full border rounded-md p-2 outline-none placeholder:text-gray-500 ${
                errors.firstName
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-600"
              }`}
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name *"
              className={`w-full border rounded-md p-2 outline-none placeholder:text-gray-500 ${
                errors.lastName
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-600"
              }`}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address *"
              className={`w-full border rounded-md p-2 outline-none placeholder:text-gray-500 ${
                errors.email
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-600"
              }`}
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
              className={`w-full border rounded-md p-2 outline-none text-gray-700 ${
                errors.department
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-600"
              }`}
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

            <select
              name="permission"
              value={formData.permission}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 outline-none text-gray-700 ${
                errors.permission
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-purple-600"
              }`}
            >
              <option value="" disabled>
                Permission *
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => navigate("/users")}
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
