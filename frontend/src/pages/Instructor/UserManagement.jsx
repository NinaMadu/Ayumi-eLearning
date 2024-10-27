import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { FaCircle } from "react-icons/fa";
import DeleteConfirmation from "../../components/confirmations/DeleteConfirmation";
import DeactivateConfirmation from "../../components/confirmations/DeactivateConfirmation";
import ActivateConfirmation from "../../components/confirmations/ActivateConfirmation";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [selectedUserForDeletion, setSelectedUserForDeletion] = useState(null);
  const [selectedUserForDeactivation, setSelectedUserForDeactivation] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
        } else {
          setError(data.message || "Failed to fetch users");
        }
      } catch (err) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter((user) => user._id !== id));
        setSelectedUser(null);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete user");
      }
    } catch (err) {
      setError("Error deleting user");
    }
  };

  const deactivateUser = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/deactivate/${id}`, {
        method: "PUT",
      });

      if (res.ok) {
        const updatedUsers = users.map((user) =>
          user._id === id ? { ...user, isActive: false } : user
        );
        setUsers(updatedUsers);
        alert("User has been deactivated.");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to deactivate user");
      }
    } catch (error) {
      setError("Error deactivating user");
    }
  };

  const activateUser = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/activate/${id}`, {
        method: "PUT",
      });

      if (res.ok) {
        const updatedUsers = users.map((user) =>
          user._id === id ? { ...user, isActive: true } : user
        );
        setUsers(updatedUsers);
        alert("User has been activated.");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to activate user");
      }
    } catch (error) {
      setError("Error activating user");
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

  const handleDeactivateClick = (user) => {
    setSelectedUserForDeactivation(user);
    user.isActive ? setShowDeactivateModal(true) : setShowActivateModal(true);
  };

  const handleCancelModal = () => {
    setShowDeactivateModal(false);
    setShowActivateModal(false);
    setSelectedUserForDeactivation(null);
  };

  const handleConfirmDeactivate = () => {
    if (selectedUserForDeactivation) {
      deactivateUser(selectedUserForDeactivation._id);
    }
    setShowDeactivateModal(false);
  };

  const handleConfirmActivate = () => {
    if (selectedUserForDeactivation) {
      activateUser(selectedUserForDeactivation._id);
    }
    setShowActivateModal(false);
  };

  if (loading) {
    return <p>Loading users...</p>; // Consider adding a spinner here
  }

  if (error) {
    return <p>{error}</p>; // Display error messages in the UI instead of using alert
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-4 border-b hover:bg-blue-50 cursor-pointer"
              onClick={() => openModal(user)}
            >
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

              <div className="flex-1 ml-4 pl-8">
                <h3 className="text-sm sm:text-base font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
              </div>

              <div className="hidden md:block flex-1">
                <h3 className="text-sm sm:text-base text-gray-600">
                  {user.email}
                </h3>
              </div>

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
                    handleDeactivateClick(user);
                  }}
                  className={`${
                    user.isActive
                      ? "bg-slate-700 hover:bg-slate-600"
                      : "bg-green-700 hover:bg-green-500"
                  } text-white px-3 py-1 rounded-lg transition-all`}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Modals */}
        {showDeleteModal && (
          <DeleteConfirmation
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
        {showDeactivateModal && (
          <DeactivateConfirmation
            onConfirm={handleConfirmDeactivate}
            onCancel={handleCancelModal}
          />
        )}
        {showActivateModal && (
          <ActivateConfirmation
            onConfirm={handleConfirmActivate}
            onCancel={handleCancelModal}
          />
        )}
      </div>
    </AdminLayout>
  );
}
