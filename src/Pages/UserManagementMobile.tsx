import {
    FaFilter,
    FaChevronDown,
    FaArrowDown,
    FaEdit,
    FaFileImport,
    FaChevronLeft,
    FaChevronRight,
    FaArrowRight,
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
                                    console.log("Fill manually clicked");
                                    setDropdownOpen(false);
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
                            <div className="absolute top-0 sm:w-56 left-2 mt-1 ml-[-15pc] w-64 bg-white shadow-lg rounded-lg z-20 border">
                                {["Assign Permission", "Change Status", "Delete All"].map((menu) => (
                                    <div key={menu} className="group relative border-t first:border-t-0">
                                        <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-gray-800 font-medium">
                                            {menu} <FaArrowRight />
                                        </button>

                                        {/*  <=============  Submenu  ==========>*/}
                                        <div className="absolute left-full top-0 hidden group-hover:block w-46 bg-white shadow-lg rounded-lg border z-30">
                                            {["User", "Admin", "Super Admin", "Uncategorised"].map((role) => (
                                                <div
                                                    key={role}
                                                    onClick={() => toggleRole(menu, role)}
                                                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                                                >
                                                    <span>{role}</span>
                                                    <button
                                                        className={`w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center ${selectedRoles[menu] === role ? "bg-purple-600 border-purple-600" : ""
                                                            }`}
                                                    >
                                                        {selectedRoles[menu] === role && (
                                                            <span className="w-2 h-2 bg-white rounded-full"></span>
                                                        )}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
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
