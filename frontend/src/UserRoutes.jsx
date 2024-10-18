import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { UDashboard } from './pages/User/Dashboard';
import CoursesUser from './pages/User/CoursesUser';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/user/dashboard" element={<UDashboard />} />
        <Route path="/user/courses" element={<CoursesUser />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
