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
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                />
                
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <div>
              <FaCircle
                  className={`mr-2 ${user.isActive ? "text-green-500" : "text-gray-500"}`}
                />
                <span className="gap-2">{user.isActive ? "Active" : "Inactive"}</span>
              
                
              </div>

              {/* Username Column */}
              
              <div className="flex gap-4">
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
              <div className="flex items-center gap-6">
                <div className="gap-4 flex flex-col text-white font-semibold">
                <button
                  className="border-spacing-4 bg-red-600 p-2 rounded-lg hover:bg-red-500"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
                <button className="border-spacing-4 bg-slate-700 p-2 rounded-lg hover:bg-slate-500">
                  Deactivate
                </button>
              </div>
              </div>

            </div>
          ))}
        </div>

        {selectedUser && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-6 rounded-lg max-w-lg w-full relative'>
              <button
                className='absolute top-2 right-2 bg-red-600 text-white text-2xl px-2 pb-1 rounded-xl hover:bg-red-500 transition-all duration-200'
                onClick={closeModal}
              >
                &times;
              </button>
              {selectedUser.avatar && (
                <img
                  src={selectedUser.avatar}
                 
                  className='w-full h-48 object-cover rounded-lg mb-4'
                />
              )}
              <h5 className='text-lg font-semibold'>{selectedUser.firstName} {selectedUser.lastName}</h5>
              <p className='text-gray-800 mt-2'>Email : {selectedUser.email}</p>
              <p className='text-gray-800 mt-2'>Date of Birth : {selectedUser.bDay}</p>
              <p className='text-gray-800 mt-2'>Gender : {selectedUser.gender}</p>
              <p className='text-gray-800 mt-2'>Contact : {selectedUser.phone}</p>
              
              <div className='flex mt-4'>
              
                  <button
                    className='mr-2 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg'
                     >
                    Deactivate
                  </button>
                
                <button
                  className='py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-lg'
                  onClick={() => {
                    deleteUser(selectedUser._id);
                    closeModal(); // Close modal after delete
                  }}
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
