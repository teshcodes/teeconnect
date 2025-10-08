import { useState, useRef, useEffect, useMemo } from "react";
import {
  FaEdit,
  FaTrash,
  FaFilter,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaFileImport,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users.request";
import DeleteUserDesktop from "../Pages/desktop/DeleteUserDesktop";

type Role = "User" | "Admin" | "Super Admin" | "Uncategorised";

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

export default function UserManagementDesktop() {
  const navigate = useNavigate();

  /** -------------------------------
   * 🧩 STATE
   * ------------------------------- */
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [permissionFilter, setPermissionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  // const [rowsDropdownOpen, setRowsDropdownOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  /** -------------------------------
   * 🎚️ ROLE MENU STATE
   * ------------------------------- */
  const [selectedRoles, setSelectedRoles] = useState<{
    [key: string]: string | null;
  }>({
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

  /** -------------------------------
   * 🔗 REFS
   * ------------------------------- */
  const dropdownRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  // const rowsDropdownRef = useRef<HTMLDivElement>(null);
  const selectAllRef = useRef<HTMLInputElement | null>(null);

  /** -------------------------------
   * 🧭 FETCH USERS (React Query)
   * ------------------------------- */
  const { data: usersData, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => getUsers(),
  });

  console.log(usersData, "this is data there==000 ====");

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
   * 📄 PAGINATION
   * ------------------------------- */
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedUsers = filteredUsers.slice(start, end);

  /** -------------------------------
   * ✅ INDETERMINATE CHECKBOX
   * ------------------------------- */
  useEffect(() => {
    if (selectAllRef.current) {
      const isIndeterminate =
        selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length;
      selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [selectedUsers, paginatedUsers]);

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
      // if (rowsDropdownRef.current && !rowsDropdownRef.current.contains(event.target as Node)) {
      //   setRowsDropdownOpen(false);
      // }
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setActionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** -------------------------------
   * 🧹 UTILITIES
   * ------------------------------- */
  const clearSelected = () => setSelectedUsers([]);

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
    <div className="flex">
      <div className="flex-1">
        {/* Page Content */}
        <div className="bg-[#F0F7FF] p-6 py-25 flex-1 ml-[-17.5pc] mr-[-1.5pc] relative overflow-hidden mt-[-3pc]">
          {/* ===== Header Section ===== */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-gray-800 text-lg font-medium">Manage Users</h1>

            {/* New User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-white bg-[#1F66B7] px-4 py-1 rounded-lg hover:bg-[#15518f] transition"
              >
                New User
                <FaChevronDown size={12} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-20">
                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/users/add");
                    }}
                  >
                    <FaEdit /> Fill Manually
                  </button>

                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setDropdownOpen(false);
                      // Import logic here
                    }}
                  >
                    <FaFileImport /> Import User
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ===== Search + Filter Section ===== */}
          <div className="flex justify-between mr-20" ref={actionsRef}>
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
                  <h2 className="text-sm font-semibold text-gray-700 mb-2">Status</h2>
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

            {/* ===== Actions Section ===== */}
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

                          {/* Submenu */}
                          <div className="absolute top-0 left-[-160px] w-40 bg-white shadow-md rounded-lg z-30 hidden group-hover:block">
                            {submenuItems.map((item) => {
                              const isActive = item === "Active";
                              const isInactive = item === "Inactive";

                              return (
                                <div
                                  key={item}
                                  onClick={() => toggleRole(menu, item)}
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

          {/* ===== User Table ===== */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="lg:max-h-[430px] overflow-y-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#DCEDFF] text-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="p-3 text-left flex gap-3 items-center">
                      {/* Select All Checkbox */}
                      <input
                        ref={selectAllRef}
                        type="checkbox"
                        checked={
                          paginatedUsers.length > 0 &&
                          selectedUsers.length === paginatedUsers.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers(paginatedUsers.map((u: User) => u._id));
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                        className="accent-[#1F66B7] w-4 h-4 cursor-pointer mt-[2px]"
                      />

                      <p className="text-left">Name</p>
                    </th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Country</th>
                    <th className="p-3 text-left">Account Created</th>
                    <th className="p-3 px-6 text-left">Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody className="text-gray-700 text-sm">
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user: User) => {
                      const userId = user._id;
                      const isChecked = selectedUsers.includes(userId);

                      return (
                        <tr
                          key={user._id || user.email || Math.random()}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="p-3 text-left whitespace-nowrap flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => () => toggleSelect(user.id)}
                              className="accent-[#1F66B7] w-4 h-4 cursor-pointer"
                            />
                            <span>
                              {user?.name?.first} {user?.name?.last}
                            </span>
                          </td>

                          <td className="px-3 text-left">{user?.email}</td>
                          <td className="px-3 text-left">
                            {user?.location?.country || "N/A"}
                          </td>
                          <td className="py-3 px-6 text-left">
                            {user?.registered?.date
                              ? new Date(user.registered.date).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="py-3 px-6 text-left">
                            {user?.status || "Active"}
                          </td>
                          <td className="p-3 flex items-center gap-4 mt-3">
                            <button
                              onClick={() => navigate("/users/edit", { state: user })}
                              className="hover:text-blue-800"
                            >
                              <FaEdit />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedUser(
                                  `${user?.name?.first || ""} ${user?.name?.last || ""}`
                                );
                                setShowDeleteModal(true);
                              }}
                              className="hover:text-red-800"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-6 text-gray-400 italic"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>


            {/* ===== Footer Pagination ===== */}
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
                  {[10, 25, 50, 75, 100].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
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
                    setPage((p) => (end < filteredUsers.length ? p + 1 : p))
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


      {
        showDeleteModal && selectedUser && (
          <DeleteUserDesktop
            name={selectedUser}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={() => {
              console.log(`Deleting user: ${selectedUser}`);
              setShowDeleteModal(false);
            }}
          />
        )
      }

    </div >
  );
}
