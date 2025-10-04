import {
    FaFilter,
    FaChevronDown,
    FaArrowDown,
    FaEdit,
    FaFileImport,
    FaChevronLeft,
    FaChevronRight,
    FaArrowLeft,
    FaTimes,
    FaExclamationCircle,
    FaPlus,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function UserManagementMobile() {
    // --- Dummy users ---
    const users = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@gmail.com`,
        department: i % 2 === 0 ? "Engineering" : "Marketing",
        created: "2025-09-25",
        status: i % 3 === 0 ? "Inactive" : i % 3 === 1 ? "Active" : "Pending",
    }));

    // --- State ---
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");
    const [permissionFilter, setPermissionFilter] = useState("All");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [rowsDropdownOpen, setRowsDropdownOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [actionsOpen, setActionsOpen] = useState(false);

    // --- Toggle states for submenu ---
    const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: string | null }>({
        "Assign Permission": null,
        "Change Status": null,
        "Delete All": null,
    });

    const toggleRole = (menu: string, role: string) => {
        setSelectedRoles((prev) => ({
            ...prev,
            [menu]: prev[menu] === role ? null : role,
        }));
    };

    // --- Refs ---
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

    // --- Filtered Users ---
    const filteredUsers = users.filter((u) => {
        const statusMatch = statusFilter === "All" ? true : u.status === statusFilter;
        const permissionMatch = permissionFilter === "All" ? true : u.department === permissionFilter;
        const searchMatch =
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase());
        return statusMatch && permissionMatch && searchMatch;
    });

    // --- Pagination ---
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
        <div className="bg-gray-100 min-h-screen mt-[2pc]">
            <div className="p-4">
                {/* Title */}
                <h1 className="text-xl font-semibold text-gray-800 mb-1">Manage Users</h1>
                <p className="text-sm text-gray-600 mb-4">
                    Administer and oversee user accounts and privileges within the platform.
                </p>

                {/* New User Button */}
                <div className="relative mb-4" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex justify-center items-center gap-2 text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 transition w-full"
                    >
                        New User <FaChevronDown size={12} />
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute left-0 mt-1 w-full sm:w-56 bg-white shadow-lg rounded-lg flex flex-col z-10">
                            <button
                                className="flex justify-center items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-800 font-medium"
                                onClick={() => {
                                    setDropdownOpen(false);
                                    setShowForm(true);
                                }}
                            >
                                <FaEdit /> Fill Manually
                            </button>
                            <button
                                className="flex justify-center items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-800 font-medium border-t border-gray-200"
                                onClick={() => {
                                    console.log("Import user clicked");
                                    setDropdownOpen(false);
                                }}
                            >
                                <FaFileImport /> Import User
                            </button>
                        </div>
                    )}

                    {/* Full-Screen Form Overlay */}
                    {showForm && (
                        <div className="fixed inset-0 z-50 flex justify-center items-start backdrop-blur-sm bg-black/30 overflow-y-auto">
                            <div className="bg-white w-full sm:w-[450px] min-h-screen rounded-none sm:rounded-lg shadow-2xl relative">
                                {/* Breadcrumb */}
                                <h1 className="opacity-75 items-center p-4 sticky bg-gray-200">User Management / <span className="text-purple-500">Add New User</span></h1>
                                {/* Header */}
                                <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                                    <h2 className="text-lg font-semibold text-gray-800">Add New User</h2>
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

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
                                    {/* First Name */}
                                    <div>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="First Name *"
                                            className={`w-full border rounded-md p-2 focus:ring-2 outline-none placeholder:text-gray-500 ${errors.firstName ? "border-red-500 border-2" : "focus:ring-purple-600"
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
                                            className={`w-full border rounded-md p-2 focus:ring-2 outline-none placeholder:text-gray-500 ${errors.lastName ? "border-red-500 border-2" : "focus:ring-purple-600"
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
                                            className={`w-full border rounded-md p-2 focus:ring-2 outline-none placeholder:text-gray-500 ${errors.email ? "border-red-500 border-2" : "focus:ring-purple-600"
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

                                    {/* Department */}
                                    <div>
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className={`w-full border rounded-md p-2 focus:ring-2 outline-none text-gray-700 ${errors.department ? "border-red-500 border-2" : "focus:ring-purple-600"
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
                                            className={`w-full border rounded-md p-2 focus:ring-2 outline-none text-gray-700 ${errors.permission ? "border-red-500 border-2" : "focus:ring-purple-600"
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

                                    <button
                                        type="submit"
                                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                                    >
                                        Submit
                                    </button>
                                    {/* Cancel Button */}
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
                        <div className="fixed inset-0 z-50 flex flex-col bg-white px-6 mt-13">
                            <div className="flex justify-center items-center mb-3 mt-10">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex justify-center items-center">
                                    <img
                                        src="/check-circle.png"
                                        alt="check circle"
                                        className="w-5 h-5"
                                    />
                                </div>
                            </div>


                            <h2 className="justify-center items-center text-center text-xl font-semibold text-gray-800 mb-2">
                                User added successfully!
                            </h2>

                            <div className="justify-start items-start text-base space-y-1 mb-6">
                                <p className="my-5">
                                    <span className="text-gray-500">Full Name: </span>
                                    {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}`.trim() : "N/A"}
                                </p>
                                <p className="mb-5">
                                    <span className="text-gray-500">Email Address:</span>
                                    <p>{formData.email || "N/A"}</p>
                                </p>
                                <p className="mb-5">
                                    <span className="text-gray-500">Permission:</span>
                                    <p>{formData.permission || "N/A"}</p>
                                </p>
                                <p className="underline text-purple-400 font-medium cursor-pointer mb-3">
                                    Edit
                                </p>
                            </div>

                            <div className="flex flex-col w-full gap-3">
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
                                    className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
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
                                    <FaPlus className="mr-1" /> Add More Users
                                </button>
                            </div>
                        </div>
                    )}
                </div>


                {/* Search + Filter */}
                <div className="flex gap-3 mb-4 relative">
                    <input
                        type="text"
                        placeholder="Search Users..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(0);
                        }}
                        className="flex-1 px-3 py-2 rounded border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1F66B7]"
                    />
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="px-3 py-3 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
                        >
                            <FaFilter />
                        </button>

                        {/* Filter Dropdown */}
                        {filterOpen && (
                            <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-4 w-64 z-20">
                                <h2 className="text-sm font-semibold text-gray-700 mb-2">Status</h2>
                                {["All", "Active", "Inactive", "Pending"].map((s) => (
                                    <div key={s} className="flex justify-between items-center py-1 text-sm text-gray-600">
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

                                <h2 className="text-sm font-semibold text-gray-700 mt-4 mb-2">Permissions</h2>
                                {["All", "Engineering", "Marketing"].map((p) => (
                                    <div key={p} className="flex justify-between items-center py-1 text-sm text-gray-600">
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
                </div>

                {/* Clear + Actions */}
                <div className="flex gap-3 mb-4">
                    <button
                        onClick={clearSelected}
                        className="flex-1 px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                    >
                        Clear Selected
                    </button>

                    {/* Actions Dropdown */}
                    <div className="relative flex-1" ref={actionsRef}>
                        <button
                            onClick={() => setActionsOpen(!actionsOpen)}
                            className="w-full flex justify-center items-center gap-2 px-3 py-2 rounded bg-purple-600 text-white hover:bg-purple-500 transition"
                        >
                            Actions <FaChevronDown size={12} className="ml-10" />
                        </button>

                        {actionsOpen && (
                            <div className="absolute top-15 sm:w-50 left-43 mt-1 ml-[-15pc] w-64 bg-white shadow-lg rounded-lg z-20 border">
                                {["Assign Permission", "Change Status", "Delete All"].map((menu) => {
                                    // Submenu items logic
                                    const submenuItems =
                                        menu === "Assign Permission"
                                            ? ["User", "Admin", "Super Admin", "Uncategorised"]
                                            : ["Active", "Inactive"];

                                    return (
                                        <div key={menu} className="group relative first:mt-4 last:mb-4">
                                            <button className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 text-gray-800 font-medium">
                                                <FaArrowLeft /> {menu}
                                            </button>

                                            {/* ===== Submenu ===== */}
                                            <div className="absolute right-full top-0 hidden group-hover:block w-46 bg-white shadow-lg rounded-lg border z-30">
                                                {submenuItems.map((item) => {
                                                    const isActive = item === "Active";
                                                    const isInactive = item === "Inactive";

                                                    return (
                                                        <div
                                                            key={item}
                                                            onClick={() => toggleRole(menu, item)}
                                                            className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
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
                                                                className={`w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center ${selectedRoles[menu] === item
                                                                    ? isActive
                                                                        ? "bg-green-600 border-green-600"
                                                                        : isInactive
                                                                            ? "bg-red-600 border-red-600"
                                                                            : "bg-purple-600 border-purple-600"
                                                                    : ""
                                                                    }`}
                                                            >
                                                                {selectedRoles[menu] === item && (
                                                                    <span className="w-2 h-2 bg-white rounded-full"></span>
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

                {/* User List */}
                <div className="space-y-4">
                    {paginatedUsers.map((user) => (
                        <div key={user.id} className="bg-white p-4 rounded-lg shadow border">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="bg-purple-400 text-white p-1 rounded-full">
                                        <FaArrowDown className="w-4 h-4" />
                                    </span>
                                    <label className="flex items-center gap-2 text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => toggleSelect(user.id)}
                                            className="accent-red-600"
                                        />
                                        Select
                                    </label>
                                </div>
                                <div className="flex gap-4 text-sm">
                                    <button className="underline hover:text-gray-300">Edit</button>
                                    <button className="underline hover:text-gray-300">Delete</button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-sm">Name</p>
                                <p className="text-sm text-gray-500">{user.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer / Pagination */}
                <div className="bg-[#D7D9E0] flex items-center justify-between px-4 py-3 text-sm text-gray-700 gap-3 overflow-x-auto">
                    {/* Left side: Rows per page + count */}
                    <div className="flex items-center gap-3">
                        {/* Rows per page custom dropdown */}
                        <div className="relative" ref={rowsDropdownRef}>
                            <button
                                onClick={() => setRowsDropdownOpen(!rowsDropdownOpen)}
                                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded text-sm"
                            >
                                Rows per page: {rowsPerPage} <FaChevronDown size={12} />
                            </button>

                            {rowsDropdownOpen && (
                                <div className="absolute top-full mb-1 right-0 w-15 bg-white border border-gray-300 rounded shadow-md z-10">
                                    {rowsOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                setRowsPerPage(opt);
                                                setPage(0);
                                                setRowsDropdownOpen(false);
                                            }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <span>
                            {start + 1}-{Math.min(end, filteredUsers.length)} of {filteredUsers.length}
                        </span>
                    </div>

                    {/* Right side: Pagination controls */}
                    <div className="flex items-center gap-2">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage((p) => Math.max(p - 1, 0))}
                            className="p-2 hover:bg-gray-200 rounded disabled:opacity-50"
                        >
                            <FaChevronLeft size={15} />
                        </button>
                        <button
                            disabled={end >= filteredUsers.length}
                            onClick={() =>
                                setPage((p) =>
                                    end < filteredUsers.length ? p + 1 : p
                                )
                            }
                            className="p-2 hover:bg-gray-200 rounded disabled:opacity-50"
                        >
                            <FaChevronRight size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
