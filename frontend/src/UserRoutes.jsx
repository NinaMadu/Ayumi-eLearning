import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { UDashboard } from './pages/User/Dashboard';
import CourseItems from './pages/User/CourseItems';
import CourseIntro from './pages/User/CourseIntro';
import CourseContent from './pages/User/CourseContent';


const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/user/dashboard" element={<UDashboard />} />
        <Route path="/user/course-cards" element={<CourseItems />} />
        <Route path="/user/course-intro/:id" element={<CourseIntro />}/>
        <Route path="/user/course-content/:id" element={<CourseContent />}/>
      </Route>
    </Routes>
  );
};

export default UserRoutes;
