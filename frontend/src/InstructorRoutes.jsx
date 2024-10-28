import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard  from './pages/Instructor/Dashboard';
import CreateCourse from './pages/Instructor/CreateCourse';
import CreateCourseFirst from './pages/Instructor/CreateCourseFirst';
import CreateCourseSecond from './pages/Instructor/CreateCourseSecond';
import CreateCourseThird from './pages/Instructor/CreateCourseThird';
import UserManagement from './pages/Instructor/UserManagement';
import CreateQuiz from './pages/Instructor/CreateQuiz';
import NoticeManagement from './pages/Instructor/NoticeManagement';
import PaymentManagement from './pages/Instructor/PaymentManagement';
import CreateNotice from './pages/Instructor/CreateNotice';
import EditNotice from './pages/Instructor/EditNotice';
import VideoUpload from './pages/Instructor/VideoUpload';
import AddVideos from './pages/Instructor/AddVideos';
import VideoList from './pages/Instructor/VideoList';
import VideoPreview from './pages/Instructor/VideoPreview';


const InstructorRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/instructor/dashboard" element={<Dashboard />} />
        <Route path="/instructor/create-course" element={<CreateCourse/>} />
        <Route path="/instructor/create-course-first" element={<CreateCourseFirst/>} />
        <Route path="/instructor/create-course-second" element={<CreateCourseSecond/>} />
        <Route path="/instructor/create-course-third" element={<CreateCourseThird/>} />
        <Route path='/instructor/user-management' element={<UserManagement/>} />
        <Route path="/instructor/create-quiz" element={<CreateQuiz/>} />
        <Route path="/instructor/notice-management" element={<NoticeManagement/>} />
        <Route path="/instructor/create-notice" element={<CreateNotice/>} />
        <Route path="/instructor/payment-management" element={<PaymentManagement/>} />
        <Route path="/instructor/edit-notice/:id" element={<EditNotice />} />
        <Route path="/instructor/add-videos" element={<AddVideos/>} />
        <Route path="/instructor/video-upload" element={<VideoUpload/>} />
        <Route path="/instructor/videoList" element={<VideoList/>} />
        <Route path="/instructor/videoPreview/:id" element={<VideoPreview/>} />
      
      </Route>
    </Routes>
  );
};

export default InstructorRoutes;
