import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { UDashboard } from './pages/User/Dashboard';
import CourseItems from './pages/User/CourseItems';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/user/dashboard" element={<UDashboard />} />
        <Route path="/user/course-cards" element={<CourseItems />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
