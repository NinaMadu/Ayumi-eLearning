import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { IDashboard } from './pages/Instructor/Dashboard';

const InstructorRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/instructor/dashboard" element={<IDashboard />} />
      </Route>
    </Routes>
  );
};

export default InstructorRoutes;
