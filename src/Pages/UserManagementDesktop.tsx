import {
    FaBell,
    FaFilter,
    FaChevronDown,
    FaChevronLeft,
    FaChevronRight,
    FaEdit,
    FaFileImport,
    FaTrash,
    FaArrowLeft,
    FaTimes,
    FaExclamationCircle,
    FaPlus,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

type Role = "User" | "Admin" | "Super Admin" | "Uncategorised";

export default function UserManagement() {
    // Dummy users
    const departments = [
        "Engineering",
        "Marketing",
        "HR",
        "Finance",
        "Product",
        "Design",
        "Sales",
        "Support",
    ];
    const statuses = ["Active", "Inactive", "Pending"];

    const users = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@gmail.com`,
        department: departments[i % departments.length],
        created: "2025-09-25",
        status: statuses[i % statuses.length],
        permission: i % 4 === 0 ? "Super Admin" : "User",
    }));

    // --- Pagination State ---
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [page, setPage] = useState(0);

    // --- Filter State ---
    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");
    const [permissionFilter, setPermissionFilter] = useState("All");

    // --- Search State ---
    const [searchTerm, setSearchTerm] = useState("");

    // --- Dropdown States ---
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [rowsDropdownOpen, setRowsDropdownOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [actionsOpen, setActionsOpen] = useState(false);

    // --- Toggle states for submenu ---
    const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: Role | null }>({
        "Assign Permission": null,
        "Change Status": null,
        "Delete All": null,
    });

    const toggleRole = (menu: string, role: Role) => {
        setSelectedRoles((prev) => ({
            ...prev,
            [menu]: prev[menu] === role ? null : role,
        }));
    };

    // Refs for closing dropdowns
    const filterRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const rowsDropdownRef = useRef<HTMLDivElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);

    // --- Close dropdowns when clicking outside ---
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setFilterOpen(false);
            }
            if (rowsDropdownRef.current && !rowsDropdownRef.current.contains(event.target as Node)) {
                setRowsDropdownOpen(false);
            }
            if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
                setActionsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --- Filtering + Searching ---
    const filteredUsers = users.filter((u) => {
        const statusMatch = statusFilter === "All" ? true : u.status === statusFilter;
        const permissionMatch = permissionFilter === "All" ? true : u.permission === permissionFilter;
        const searchMatch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase());
        return statusMatch && permissionMatch && searchMatch;
    });

    // --- Pagination Data ---
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = filteredUsers.slice(start, end);

    const rowsOptions = [10, 25, 50, 75, 100];

    // --- Select logic ---
    const toggleSelect = (id: number) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
        );
    };

    const clearSelected = () => {
        setSelectedUsers([]);
    };

    // --- Helper to highlight search ---
    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        const parts = text.split(regex);
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={i} className="font-bold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        phone: "",
        department: "",
        permission: "",
    })

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (value.trim() !== "") {
            setErrors((prev) => ({ ...prev, [name]: false }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: boolean } = {};

        // Validate required fields
        ["firstName", "lastName", "email", "department", "permission"].forEach((field) => {
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = true;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Success – hide form, show success overlay
        setShowForm(false);
        setShowSuccess(true);

        console.log("✅ Form submitted successfully:", formData);
    };

    return (
        <div className="flex">
            <div className="flex-1">
                {/* Top Navigation */}
                <header className="fixed top-0 right-0 bg-white flex justify-between items-center px-6 pt-7 pb-5 shadow z-10 lg:left-64 lg:right-0">
                    <h1 className="text-xl font-semibold text-gray-700">
                        User Management
                    </h1>
                    <button className="relative text-gray-600 hover:text-gray-800">
                        <FaBell size={20} />
                    </button>
                </header>

                {/* Page Content */}
                <div className="bg-[#F0F7FF] p-6 mt-10 flex-1 ml-[-17.5pc] mr-[-1.5pc] relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-gray-800 text-lg font-medium">Manage Users</h1>

                        <div className="relative" ref={dropdownRef}>
                            {/* New User Button */}
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 text-white bg-[#1F66B7] px-4 py-1 rounded-lg hover:bg-[#15518f] transition"
                            >
                                New User
                                <FaChevronDown size={12} />
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-20">
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            setShowForm(true);
                                        }}
                                    >
                                        <FaEdit /> Fill Manually
                                    </button>
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            console.log("Import user Clicked");
                                        }}
                                    >
                                        <FaFileImport /> Import User
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Blur Background + Form */}
                    {showForm && (
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex justify-end z-30">
                            <div className="hidden md:flex flex-col w-[450px] h-screen bg-[#FFFFFF] shadow-2xl relative">
                                {/* Header */}
                                <div className="flex justify-between items-center p-4">
                                    <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
                                    <button
                                        onClick={() => setShowForm(false)}
                                        className="text-gray-500 hover:text-gray-700 transition"
                                    >
                                        <FaTimes size={20} />
                                    </button>
                                </div>

                                {/* 🔴 Alert Message (when user submits empty form) */}
                                {showAlert && (
                                    <div className="flex items-center justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-4 rounded-md animate-fadeIn">
                                        <div className="flex items-center gap-5">
                                            <div className="border-lg bg-red-200 px-2 py-2">
                                                <FaExclamationCircle className="text-red-400 text-lg" />
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

                                {/* <=================  Form  ==============> */}
                                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto h-[calc(100vh-70px)]">
                                    {/* <=================== First Name ================> */}
                                    <div>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="First Name *"
                                            className={`w-full border rounded-md p-2 focus:ring-2 outline-none placeholder:text-gray-500 ${errors.firstName ? "border-red-500" : "focus:ring-purple-600"
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
                                            className={`w-full border rounded-md p-2 focus:ring-2 outline-none placeholder:text-gray-500 ${errors.lastName ? "border-red-500" : "focus:ring-purple-600"
                                                }`}
                                        />
                                    </div>

                                    {/* <==================== Email =================> */}
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email Address *"
                                            className={`w-full border rounded-md p-2 focus:ring-2 outline-none placeholder:text-gray-500 ${errors.email ? "border-red-500" : "focus:ring-purple-600"
                                                }`}
                                        />
                                    </div>

                                    {/* <========================= Username ==========================> */}
                                    <div>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Username"
                                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-purple-600 outline-none placeholder:text-gray-500"
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
                                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-purple-600 outline-none placeholder:text-gray-500"
                                        />
                                    </div>

                                    {/* <================= Department ================> */}
                                    <div>
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className={`w-full border rounded-md p-2 focus:ring-2 outline-none text-gray-700 ${errors.department ? "border-red-500" : "focus:ring-purple-600"
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

                                    {/* <=================== Permission ===================> */}
                                    <div>
                                        <select
                                            name="permission"
                                            value={formData.permission}
                                            onChange={handleChange}
                                            className={`w-full border rounded-md p-2 focus:ring-2 outline-none text-gray-700 ${errors.permission ? "border-red-500 " : "focus:ring-purple-600"
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
                                        className="w-full bg-[#1F66B7] text-white py-2 rounded-md hover:bg-blue-400 transition"
                                    >
                                        Submit
                                    </button>
                                    {/* <============ Cancel Button ==============> */}
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* <================= SUCCESS SCREEN ==============> */}
                    {showSuccess && (
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-end items-start z-50">
                            {/* Success Panel */}
                            <div className="hidden md:flex flex-col w-[450px] min-h-screen bg-white shadow-2xl relative animate-slide-in">
                                {/* Success Content */}
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
                                            <p className="font-medium">
                                                {formData.firstName || formData.lastName
                                                    ? `${formData.firstName} ${formData.lastName}`.trim()
                                                    : "N/A"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm">Email Address:</p>
                                            <p className="font-medium">{formData.email || "N/A"}</p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm">Permission:</p>
                                            <p className="font-medium">{formData.permission || "N/A"}</p>
                                        </div>

                                        <p className="underline text-blue-300 font-medium cursor-pointer mt-2">
                                            Edit
                                        </p>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col w-full gap-3 mt-6">
                                        <button
                                            onClick={() => {
                                                setShowSuccess(false);
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
                                            className="w-full bg-[#1F66B7] text-white py-2 rounded-md hover:bg-blue-400 transition"
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


                    <p className="text-sm text-gray-500 mb-6">
                        Administer and oversee user accounts and privileges within the
                        platform.
                    </p>

                    <div className="flex justify-between mr-20" ref={actionsRef}>
                        {/* <====================== Search + Filter ===================> */}
                        <div className="flex items-center gap-3 mb-6 relative" ref={filterRef}>
                            <input
                                type="text"
                                placeholder="Search Users..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setPage(0);
                                }}
                                className="px-3 py-2 rounded border border-gray-300 text-gray-600 w-full lg:w-[240px] focus:outline-none focus:ring-2 focus:ring-[#1F66B7]"
                            />
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
                            >
                                <FaFilter />
                            </button>

                            {/* <==================== Filter Dropdown =================> */}
                            {filterOpen && (
                                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-4 w-64 z-20">
                                    <h2 className="text-sm font-semibold text-gray-700 mb-2">
                                        Status
                                    </h2>
                                    {["All", "Active", "Inactive", "Pending"].map((s) => (
                                        <div
                                            key={s}
                                            className="flex justify-between items-center py-1 text-sm text-gray-600"
                                        >
                                            <span>{s}</span>
                                            <input
                                                type="radio"
                                                name="status"
                                                checked={statusFilter === s}
                                                onChange={() => {
                                                    setStatusFilter(s);
                                                    setPage(0);
                                                }}
                                                className="w-4 h-4 accent-[#1F66B7]"
                                            />
                                        </div>
                                    ))}

                                    <h2 className="text-sm font-semibold text-gray-700 mt-4 mb-2">
                                        Permissions
                                    </h2>
                                    {["All", "Super Admin", "User"].map((p) => (
                                        <div
                                            key={p}
                                            className="flex justify-between items-center py-1 text-sm text-gray-600"
                                        >
                                            <span>{p}</span>
                                            <input
                                                type="radio"
                                                name="permission"
                                                checked={permissionFilter === p}
                                                onChange={() => {
                                                    setPermissionFilter(p);
                                                    setPage(0);
                                                }}
                                                className="w-4 h-4 accent-[#1F66B7]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* <========================= Clear + Actions ===========================> */}
                        <div className="flex gap-6 text-center items-center mt-[-1.5pc] relative">
                            <button
                                onClick={clearSelected}
                                className="text-red-500 hover:border hover:bg-[#FFFFFF] px-2 py-2 text-center rounded-xl cursor-pointer"
                            >
                                Clear Selected
                            </button>

                            {/* Actions Dropdown */}
                            <div className="relative flex-1" ref={actionsRef}>
                                <button
                                    onClick={() => setActionsOpen(!actionsOpen)}
                                    className="font-semibold hover:border hover:bg-[#FFFFFF] px-2 py-2 text-center rounded-xl cursor-pointer"
                                >
                                    Actions
                                </button>

                                {actionsOpen && (
                                    <div className="absolute top-10 right-0 w-48 bg-white shadow-lg rounded-lg z-20">
                                        {["Assign Permission", "Change Status", "Delete All"].map((menu) => {
                                            const submenuItems =
                                                menu === "Assign Permission"
                                                    ? ["User", "Admin", "Super Admin", "Uncategorised"]
                                                    : ["Active", "Inactive"];

                                            return (
                                                <div key={menu} className="group relative border-t first:border-t-0">
                                                    <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-gray-800 font-medium">
                                                        <FaArrowLeft /> {menu}
                                                    </button>

                                                    {/* ===== Submenu ===== */}
                                                    <div className="absolute top-0 left-[-160px] w-40 bg-white shadow-md rounded-lg z-30 hidden group-hover:block">

                                                        {submenuItems.map((item) => {
                                                            const isActive = item === "Active";
                                                            const isInactive = item === "Inactive";

                                                            return (
                                                                <div
                                                                    key={item}
                                                                    onClick={() => {
                                                                        if (menu === "Assign Permission") {
                                                                            toggleRole(menu, item as Role);
                                                                        } else {
                                                                            // handle status change or delete logic here
                                                                        }
                                                                    }}
                                                                    className="flex justify-between items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    <span
                                                                        className={`${isActive
                                                                            ? "text-green-600 font-medium"
                                                                            : isInactive
                                                                                ? "text-red-500 font-medium"
                                                                                : "text-gray-700"
                                                                            }`}
                                                                    >
                                                                        {item}
                                                                    </span>
                                                                    <button
                                                                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedRoles[menu] === item
                                                                            ? isActive
                                                                                ? "bg-green-600 border-green-600"
                                                                                : isInactive
                                                                                    ? "bg-red-600 border-red-600"
                                                                                    : "bg-[#1F66B7] border-[#1F66B7]"
                                                                            : "bg-white border-gray-400"
                                                                            }`}
                                                                    >
                                                                        {selectedRoles[menu] === item && (
                                                                            <span className="w-2 h-2 bg-white rounded-full block mx-auto"></span>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            );
                                                        })}

                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden ">
                        <div className="lg:max-h-[460px] overflow-y-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-[#DCEDFF] text-gray-700 sticky top-0 z-10">
                                    <tr>
                                        <th className="p-3 text-left">
                                            <input type="checkbox" />
                                        </th>
                                        <th className="p-3 text-left">Name / Email</th>
                                        <th className="p-3 text-left">Department</th>
                                        <th className="p-3 text-left">Account Created</th>
                                        <th className="p-3 text-left">Status</th>
                                        <th className="p-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-[#EDEDF1]">
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(user.id)}
                                                    onChange={() => toggleSelect(user.id)}
                                                />
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {highlightMatch(user.name, searchTerm)}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {highlightMatch(user.email, searchTerm)}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-3 text-gray-600">{user.department}</td>
                                            <td className="p-3 text-gray-600">{user.created}</td>
                                            <td className="p-3">
                                                <span
                                                    className={`flex items-center gap-2 px-2 py-1 rounded mr-4 text-xs ${user.status === "Active"
                                                        ? "bg-green-100 text-green-700"
                                                        : user.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    <span
                                                        className={`w-2 h-2 rounded-full ${user.status === "Active"
                                                            ? "bg-green-700"
                                                            : user.status === "Pending"
                                                                ? "bg-yellow-700"
                                                                : "bg-red-700"
                                                            }`}
                                                    ></span>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="p-3 flex items-center gap-4 mt-3">
                                                <button className="hover:text-blue-800">
                                                    <FaEdit />
                                                </button>
                                                <button className="hover:text-red-800">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/*<=========== Footer ==========> */}
                        <div className="bg-[#DCEDFF] flex justify-end items-center px-4 py-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2" ref={rowsDropdownRef}>
                                <span>Rows per page:</span>
                                <button
                                    onClick={() => setRowsDropdownOpen(!rowsDropdownOpen)}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm flex items-center gap-1 bg-white"
                                >
                                    {rowsPerPage} <FaChevronDown size={12} />
                                </button>
                                {rowsDropdownOpen && (
                                    <div className="absolute mt-8 bg-white shadow-lg rounded z-20 w-24">
                                        {rowsOptions.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => {
                                                    setRowsPerPage(opt);
                                                    setPage(0);
                                                    setRowsDropdownOpen(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${rowsPerPage === opt ? "font-bold" : ""}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <span className="ml-4">
                                    {start + 1}–{Math.min(end, filteredUsers.length)} of {filteredUsers.length}
                                </span>
                                <button
                                    disabled={page === 0}
                                    onClick={() => setPage((p) => Math.max(p - 1, 0))}
                                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                                >
                                    <FaChevronLeft size={12} />
                                </button>
                                <button
                                    disabled={end >= filteredUsers.length}
                                    onClick={() =>
                                        setPage((p) =>
                                            end < filteredUsers.length ? p + 1 : p
                                        )
                                    }
                                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                                >
                                    <FaChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
