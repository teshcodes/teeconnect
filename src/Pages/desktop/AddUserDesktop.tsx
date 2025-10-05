import { useState } from "react";
import { FaTimes, FaExclamationCircle, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AddUserDesktop() {
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
  const [showForm, setShowForm] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

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
    setShowForm(false);
    setTimeout(() => setShowSuccess(true), 300);
  };

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Section */}
      <div className="">
        {/* Form Drawer */}
        {showForm && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex justify-end z-30">
            <div className="hidden md:flex flex-col w-[450px] h-screen bg-white shadow-2xl relative">
              {/* 🔴 Alert Message */}
              {showAlert && (
                <div className="flex items-center justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-4 rounded-md animate-fadeIn">
                  <div className="flex items-center gap-5">
                    <div className="bg-red-200 px-2 py-2 rounded-full">
                      <FaExclamationCircle className="text-red-500 text-lg" />
                    </div>
                    <p className="text-sm font-medium">
                      Please fill in all required fields.
                      <p>Double-check and try again.</p>
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAlert(false)}
                    className="text-red-500 hover:text-red-700 transition mb-4"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              )}

              <div className="px-4 py-3 mx-4 mt-6">
                 <h2 className="text-xl font-semibold text-gray-600">
                  Add New User
                </h2>
                </div>

              {/* ============= Form ============= */}
              <form
                onSubmit={handleSubmit}
                className="p-6 space-y-5 overflow-y-auto h-[calc(100vh-70px)]"
              >
                {/* First Name */}
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name *"
                    className={`w-full border rounded-md p-2 focus:ring-2 outline-none placeholder:text-gray-500 ${
                      errors.firstName
                        ? "border-red-500"
                        : "focus:ring-[#1F66B7]"
                    }`}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name *"
                    className={`w-full border rounded-md p-2 focus:ring-2 outline-none placeholder:text-gray-500 ${
                      errors.lastName
                        ? "border-red-500"
                        : "focus:ring-[#1F66B7]"
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    className={`w-full border rounded-md p-2 focus:ring-2 outline-none placeholder:text-gray-500 ${
                      errors.email ? "border-red-500" : "focus:ring-[#1F66B7]"
                    }`}
                  />
                </div>

                {/* Username */}
                <div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className={`w-full border rounded-md p-2 focus:ring-2 outline-none placeholder:text-gray-500 ${
                      errors.email ? "border-red-500" : "focus:ring-[#1F66B7]"
                    }`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={`w-full border rounded-md p-2 focus:ring-2 outline-none placeholder:text-gray-500 ${
                      errors.email ? "border-red-500" : "focus:ring-[#1F66B7]"
                    }`}
                  />
                </div>

                {/* Department */}
                <div>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full border rounded-md p-2 focus:ring-2 outline-none text-gray-700 ${
                      errors.department
                        ? "border-red-500"
                        : "focus:ring-[#1F66B7]"
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
                </div>

                {/* Permission */}
                <div>
                  <select
                    name="permission"
                    value={formData.permission}
                    onChange={handleChange}
                    className={`w-full border rounded-md p-2 focus:ring-2 outline-none text-gray-700 ${
                      errors.permission
                        ? "border-red-500"
                        : "focus:ring-[#1F66B7]"
                    }`}
                  >
                    <option value="" disabled>
                      Permission *
                    </option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#1F66B7] text-white py-2 rounded-md hover:bg-blue-500 transition"
                >
                  Submit
                </button>

                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={() => navigate("/users")}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ===== Success Screen ===== */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-end items-start z-50">
            <div className="hidden md:flex flex-col w-[450px] min-h-screen bg-white shadow-2xl relative animate-slide-in">
              <div className="flex flex-col items-center justify-center p-8 space-y-6">
                {/* Check Circle */}
                <div className="flex justify-center items-center mt-12">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex justify-center items-center">
                    <img
                      src="/check-circle.png"
                      alt="check circle"
                      className="w-6 h-6"
                    />
                  </div>
                </div>

                {/* Success Text */}
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  User added successfully!
                </h2>

                {/* Details */}
                <div className="w-full text-gray-700 space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">Full Name:</p>
                    {fullName || "N/A"}
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Email Address:</p>
                    <p className="font-medium">{formData.email || "N/A"}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Permission:</p>
                    {formData.permission || "N/A"}
                  </div>

                  <p className="underline text-blue-400 font-medium cursor-pointer mt-2">
                    Edit
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col w-full gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowSuccess(false);
                      setShowForm(true);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        username: "",
                        phone: "",
                        department: "",
                        permission: "",
                      });
                    }}
                    className="w-full bg-[#1F66B7] text-white py-2 rounded-md hover:bg-blue-500 transition"
                  >
                    Finish
                  </button>

                  <button
                    onClick={() => {
                      setShowSuccess(false);
                      setShowForm(true);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        username: "",
                        phone: "",
                        department: "",
                        permission: "",
                      });
                    }}
                    className="w-full border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                  >
                    <FaPlus className="text-sm" /> Add More Users
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500 m-6">
          Administer and oversee user accounts and privileges within the
          platform.
        </p>
      </div>
    </div>
  );
}
