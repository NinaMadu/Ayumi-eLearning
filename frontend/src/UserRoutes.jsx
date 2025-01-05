import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { UDashboard } from './pages/User/Dashboard';
import CourseItems from './pages/User/CourseItems';
import UserHome from './components/UserHome';
import CourseIntro from './pages/User/CourseIntro';
import UserVideoPreview from './pages/User/Video/VideoPreview';
import AllQuizes from './pages/User/AllQuizes';
import CourseContent from './pages/User/CourseContent';



const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/user/dashboard" element={<UDashboard />} />
        <Route path="/user/user-home" element={<UserHome />} />
        <Route path="/user/course-cards" element={<CourseItems />} />
        <Route path="/user/all-quizes" element={<AllQuizes />} />
        <Route path="/user/courseIntro/:id" element={<CourseIntro />}/>
        <Route path="/user/course-content/:courseId" element={<CourseContent />} />
        <Route path="/user/video/:videoId" element={<UserVideoPreview/>}/>


      </Route>
    </Routes>
  );
};

export default UserRoutes;
