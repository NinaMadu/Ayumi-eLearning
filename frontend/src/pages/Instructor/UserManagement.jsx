import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Link } from 'react-router-dom';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch users');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setUsers(users.filter(user => user._id !== id));
          setSelectedUser(null); 
        } else {
          const data = await res.json();
          alert(data.message || 'Failed to delete user');
        }
      } catch (err) {
        console.error(err);
        alert('Error deleting user');
      }
    }
  };

  const openModal = (user) => {
    setSelecteduser(user);
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

      <div className='p-6'>
        <div>
          {users.map((user)=>(
            <div
              key={user._id}
              className='bg-white p-4 mb-4 rounded-lg shadow-lg flex justify-between items-start'
              onClick={()=>openModal(user)}>

                <div className="flex items-start">
                  {user.image?(
                    <img
                      src={user.avatar}
                      alt={user.firstName}
                      className='w-20 h-20 object-cover rounded-lg mr-4'/>
                  ):(
                    <div className='w-20 h-20 bg-gray-200 rounded-lg mr-4 flex items-center justify-center'>
                    <span className='text-gray-400'>No Image</span>
                    </div>
                  )}
                  <div className='flex-grow'>
                    <h3 className='text-xl font-semibold'>{user.firstName}</h3>
                  </div>
                
                </div>

            </div>

          ))}

        </div>
      </div>
    </AdminLayout>
  )
};
