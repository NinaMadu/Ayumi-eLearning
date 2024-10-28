// src/pages/UserAdmin.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import AdminProfile from '../components/AdminProfile';
import Profile from '../components/Profile';

const UserAdmin = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  // Check if the current user is an admin based on email
  const isAdmin = currentUser && currentUser.email === 'ayumi@gmail.com';

  return (
    <div>
      {isAdmin ? <AdminProfile /> : <Profile />}
    </div>
  );
};

export default UserAdmin;
