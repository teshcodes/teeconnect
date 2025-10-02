// src/pages/UserManagement.tsx
import {
    FaBell,
    FaFilter,
    FaChevronDown,
    FaChevronLeft,
    FaChevronRight,
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

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

    // Ref for filter dropdown
    const filterRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target as Node)
            ) {
                setFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --- Filtering + Searching ---
    const filteredUsers = users.filter((u) => {
        const statusMatch = statusFilter === "All" ? true : u.status === statusFilter;
        const permissionMatch =
            permissionFilter === "All" ? true : u.permission === permissionFilter;
        const searchMatch =
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase());
        return statusMatch && permissionMatch && searchMatch;
    });

    // --- Pagination Data ---
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = filteredUsers.slice(start, end);

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
                <div className="bg-[#F0F7FF] p-6 mt-10 flex-1 ml-[-17.5pc] mr-[-1.5pc]">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-gray-800 text-lg font-medium">Manage Users</h1>
                        <button className="flex items-center gap-2 text-white bg-[#1F66B7] px-4 py-1 rounded-lg hover:bg-[#15518f] transition">
                            New User
                            <FaChevronDown size={12} />
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 mb-6">
                        Administer and oversee user accounts and privileges within the
                        platform.
                    </p>

                    {/* Search + Filter */}
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

                        {/* Filter Dropdown */}
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
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden ml-[-16pc] ">
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
                                            <input type="checkbox" />
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

                    {/* Footer */}
                    <div className="bg-[#DCEDFF] flex justify-end items-center px-4 py-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <span>Rows per page:</span>
                            <select
                                value={rowsPerPage}
                                onChange={(e) => {
                                    setRowsPerPage(Number(e.target.value));
                                    setPage(0);
                                }}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={75}>75</option>
                                <option value={100}>100</option>
                            </select>
                            <span className="ml-4">
                                {start + 1}–{Math.min(end, filteredUsers.length)} of{" "}
                                {filteredUsers.length}
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
    );
}
