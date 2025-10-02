import {
    FaFilter,
    FaChevronDown,
    FaArrowDown,
} from "react-icons/fa";
import { useState } from "react";

export default function UserManagementMobile() {
    // Dummy users
    const users = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@gmail.com`,
        department: i % 2 === 0 ? "Engineering" : "Marketing",
        created: "2025-09-25",
        status: i % 3 === 0 ? "Inactive" : i % 3 === 1 ? "Active" : "Pending",
    }));

    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-100 min-h-screen mt-[2pc]">
            <div className="p-4">
                {/* Title + Description */}
                <h1 className="text-xl font-semibold text-gray-800 mb-1">Manage Users</h1>
                <p className="text-sm text-gray-600 mb-4">
                    Administer and oversee user accounts and privileges within the platform.
                </p>

                {/* New User Button */}
                <button className="justify-center flex items-center gap-2 text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 transition mb-4 w-[22pc]">
                    New User
                    <FaChevronDown size={12} />
                </button>

                {/* Search + Filter */}
                <div className="flex gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Search Users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-3 py-2 rounded border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1F66B7]"
                    />
                    <button className="px-3 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">
                        <FaFilter />
                    </button>
                </div>

                {/* Clear + Actions */}
                <div className="flex gap-2 items-center mb-4 ml-5">
                    <button className="text-sm text-purple-400 hover:border-gray-500 px-6 py-2 rounded">
                        Clear Selected
                    </button>
                    <div className="flex gap-2">
                        <button className="text-sm  px-6 py-2 hover:border-gray-500 rounded bg-[#FFFFFF]">Actions</button>
                    </div>
                </div>

                {/* User List (stacked) */}
                <div className="space-y-4">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white p-4 rounded-lg shadow border"
                        >
                            {/* Select Row */}
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="bg-purple-400 text-white p-1 rounded-full">
                                        <FaArrowDown className="w-4 h-4" />
                                    </span>
                                    <label className="flex items-center gap-2 text-gray-700">
                                        <input type="checkbox" className="accent-red-600" />
                                        Select
                                    </label>
                                </div>
                                <div className="flex gap-4 text-sm">
                                    <button className="underline hover:text-gray-300">Edit</button>
                                    <button className="underline hover:text-gray-300">Delete</button>
                                </div>
                            </div>

                            {/* Name */}
                            <div className="flex justify-between items-center">
                            <p className="text-gray-500 text-sm">Name</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
