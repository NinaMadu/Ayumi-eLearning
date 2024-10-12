import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { FaCircle } from "react-icons/fa";
import DeleteConfirmation from "../../components/confirmations/DeleteConfirmation";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserForDeletion, setSelectedUserForDeletion] = useState(null);

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
  };

  const deactivateUser = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/deactivate/${id}`,
        {
          method: "PUT",
        }
      );

      if (res.ok) {
        const updatedUsers = users.map((user) =>
          user._id === id ? { ...user, isActive: false } : user
        );
        setUsers(updatedUsers);
        alert("User has been deactivated.");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to deactivate user");
      }
    } catch (error) {
      console.error(error);
      alert("Error deactivating user");
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleDeleteClick = (user) => {
    setSelectedUserForDeletion(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserForDeletion) {
      deleteUser(selectedUserForDeletion._id);
    }
    setShowDeleteModal(false);
    setSelectedUserForDeletion(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedUserForDeletion(null);
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
              className="flex items-center justify-between p-4 border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => openModal(user)}
            >
              {/* Image and Active Status */}
              <div className="flex items-center gap-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg flex justify-center items-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <FaCircle
                    className={`${
                      user.isActive ? "text-green-500" : "text-gray-500"
                    }`}
                  />
                  <span className="text-xs sm:text-sm font-semibold">
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Username Column */}
              <div className="flex-1 ml-4 pl-8">
                <h3 className="text-sm sm:text-base font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
              </div>

              {/* Email Column */}
              <div className="hidden md:block flex-1">
                <h3 className="text-sm sm:text-base text-gray-600">
                  {user.email}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(user);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deactivateUser(user._id);
                  }}
                  className="bg-slate-700 text-white px-3 py-1 rounded-lg hover:bg-slate-600 transition-all"
                >
                  Deactivate
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <DeleteConfirmation
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}

        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl max-w-md w-full relative shadow-2xl">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 bg-red-500 text-white text-2xl px-3 py-1 rounded-full hover:bg-red-600"
                onClick={closeModal}
              >
                ×
              </button>

              {/* Avatar */}
              {selectedUser.avatar && (
                <div className="flex justify-center mb-4">
                  <img
                    src={selectedUser.avatar}
                    className="h-40 w-40 object-cover rounded-full shadow-lg border-4 border-gray-300"
                  />
                </div>
              )}

              {/* User Info */}
              <div className="text-center space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
                <p className="text-gray-500 text-sm">{selectedUser.email}</p>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="text-right text-sm font-medium text-gray-600">
                    <p>Date of Birth :</p>
                    <p>Gender :</p>
                    <p>Contact :</p>
                  </div>
                  <div className="text-left text-sm text-gray-800">
                    <p>{selectedUser.bDay}</p>
                    <p>{selectedUser.gender}</p>
                    <p>{selectedUser.phone}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex mt-4 justify-center space-x-3">
                <button
                  className="py-1.5 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-lg transition duration-200 text-s"
                  onClick={() => deactivateUser(selectedUser._id)}
                >
                  Deactivate
                </button>
                <button
                  className="py-1.5 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition duration-200"
                  onClick={() => handleDeleteClick(selectedUser)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
