import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { UDashboard } from './pages/User/Dashboard';
import VideoPreview from './pages/VideoPreview';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/user/dashboard" element={<UDashboard />} />
        <Route path="/user/:videoId" element={<VideoPreview />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
