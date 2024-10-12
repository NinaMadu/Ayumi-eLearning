import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { FaCircle } from "react-icons/fa";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/users`
        );
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setLoading(false);
        } else {
          setError(data.message || "Failed to fetch users");
          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          setUsers(users.filter((user) => user._id !== id));
          setSelectedUser(null);
        } else {
          const data = await res.json();
          alert(data.message || "Failed to delete user");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting user");
      }
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg">
          {users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b items-center cursor-pointer hover:bg-gray-50"
              onClick={() => openModal(user)}
            >
              {/* Image Column */}
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

              {/* Username Column */}
              <div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
              </div>

              {/* Email Column */}
              <div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold">
                  {user.email}
                </h3>
              </div>

              {/* Status Column */}
              <div className="flex items-center">
                <FaCircle
                  className={`mr-2 ${user.isActive ? "text-green-500" : "text-gray-500"}`}
                />
                <span>{user.isActive ? "Active" : "Inactive"}</span>
              </div>

              <div className="gap-4 flex text-white font-semibold">
                <button
                  className="border-spacing-4 bg-red-600 p-2 rounded-lg hover:bg-red-400"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
                <button className="border-spacing-4 bg-slate-700 p-2 rounded-lg hover:bg-red-400">
                  Deactivate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
