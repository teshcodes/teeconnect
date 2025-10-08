// src/pages/UserManagementMobile.tsx
import {
  FaFilter,
  FaChevronDown,
  FaArrowDown,
  FaArrowUp,
  FaEdit,
  FaFileImport,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
} from "react-icons/fa";
import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users.request";
import DeleteUserMobile from "../Pages/mobile/DeleteUserMobile";

type User = {
  _id: string;
  name?: {
    first?: string;
    last?: string;
  };
  email?: string;
  location?: {
    country?: string;
  };
  status?: string;
  permission?: string;
  registered?: {
    date?: string;
  };
};

export default function UserManagementMobile() {
  const navigate = useNavigate();

  // --- State ---
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [permissionFilter, setPermissionFilter] = useState("All");
  const [rowsDropdownOpen, setRowsDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [actionsOpen, setActionsOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);

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
  const rowsDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  /** -------------------------------
   * 🧭 FETCH USERS (React Query)
   * ------------------------------- */
  const { data: usersData, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => getUsers(),
  });

  console.log(usersData, "Fetched user data ====");

  /** -------------------------------
   * 🔍 FILTERED USERS
   * ------------------------------- */
  const filteredUsers = useMemo(() => {
    if (!Array.isArray(usersData?.data?.data)) return [];
    return usersData.data.data.filter((user: User) => {
      const fullName = `${user?.name?.first || ""} ${user?.name?.last || ""}`.toLowerCase();
      const nameMatch = fullName.includes(searchTerm.toLowerCase());
      const emailMatch = user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === "All" ? true : user?.status === statusFilter;
      const permissionMatch =
        permissionFilter === "All" ? true : user?.permission === permissionFilter;
      return (nameMatch || emailMatch) && statusMatch && permissionMatch;
    });
  }, [usersData, searchTerm, statusFilter, permissionFilter]);

  /** -------------------------------
   * 🖱️ CLICK OUTSIDE HANDLER
   * ------------------------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setActionsOpen(false);
      }
      if (rowsDropdownRef.current && !rowsDropdownRef.current.contains(event.target as Node)) {
        setRowsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Pagination ---
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedUsers = filteredUsers.slice(start, end);
  const rowsOptions = [10, 25, 50, 75, 100];

  // --- Select logic ---
  const toggleSelect = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const clearSelected = () => setSelectedUsers([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  /** -------------------------------
   * 🚦 LOADING & ERROR HANDLING
   * ------------------------------- */
  if (isLoading) {
    return <p className="text-center mt-10 text-gray-500">Loading users...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load users. Please try again later.
      </p>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen mt-[3pc]">
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

          {dropdownOpen && (
            <div className="absolute left-0 mt-1 w-full sm:w-56 bg-white shadow-lg rounded-lg flex flex-col z-10">
              <button
                className="flex justify-center items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-800 font-medium"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/users/add");
                }}
              >
                <FaEdit /> Fill Manually
              </button>
              <button
                className="flex justify-center items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-800 font-medium border-t border-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                <FaFileImport /> Import User
              </button>
            </div>
          )}

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
                    const submenuItems =
                      menu === "Assign Permission"
                        ? ["User", "Admin", "Super Admin", "Uncategorised"]
                        : ["Active", "Inactive"];

                    return (
                      <div key={menu} className="group relative first:mt-4 last:mb-4">
                        <button className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 text-gray-800 font-medium">
                          <FaArrowLeft /> {menu}
                        </button>

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
                                  className={`${
                                    isActive
                                      ? "text-green-600 font-medium"
                                      : isInactive
                                      ? "text-red-500 font-medium"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {item}
                                </span>
                                <button
                                  className={`w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center ${
                                    selectedRoles[menu] === item
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

          {/* Delete Modal */}
          {showDeleteModal && selectedUser && (
            <DeleteUserMobile
              name={selectedUser}
              onCancel={() => setShowDeleteModal(false)}
              onConfirm={() => setShowDeleteModal(false)}
            />
          )}

          {/* User List */}
          <div className="space-y-4">
            {paginatedUsers.map((user: User) => {
              const userId = user._id;
              const isExpanded = expandedUserId === userId;
              return (
                <div
                  key={userId}
                  className="bg-white p-4 rounded-lg shadow border transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setExpandedUserId((prev) => (prev === userId ? null : userId))
                        }
                        className="bg-purple-400 text-white p-1 rounded-full"
                      >
                        {isExpanded ? (
                          <FaArrowUp className="w-4 h-4" />
                        ) : (
                          <FaArrowDown className="w-4 h-4" />
                        )}
                      </button>

                      <label className="flex items-center gap-2 text-gray-700">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(userId)}
                          onChange={() => toggleSelect(userId)}
                          className="accent-red-600"
                        />
                        <span>
                          {user?.name?.first} {user?.name?.last}
                        </span>
                      </label>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <button
                        onClick={() => navigate("/users/edit")}
                        className="underline hover:text-gray-300 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(`${user?.name?.first || ""} ${user?.name?.last || ""}`);
                          setShowDeleteModal(true);
                        }}
                        className="underline hover:text-gray-300 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Always visible */}
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  {/* Hidden until expanded */}
                  {isExpanded && (
                    <>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-gray-500 text-sm">Country</p>
                        <p className="text-sm text-gray-500">
                          {user?.location?.country || "N/A"}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <p className="text-gray-500 text-sm">Account Created</p>
                        <p className="text-sm text-gray-500">
                          {new Date(user?.registered?.date || "").toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <p className="text-gray-500 text-sm">Permission</p>
                        <p className="text-sm text-gray-500">
                          {user?.permission || "User"}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <p className="text-gray-500 text-sm">Status</p>
                        <p className="text-sm text-gray-500">{user?.status || "Active"}</p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer / Pagination */}
          <div className="bg-[#D7D9E0] flex items-center justify-between px-4 py-3 text-sm text-gray-700 gap-3 overflow-x-auto mt-4">
            <div className="flex items-center gap-3">
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

            <div className="flex items-center gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                className="p-2 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <button
                disabled={end >= filteredUsers.length}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
