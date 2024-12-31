import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard  from './pages/Instructor/Dashboard';
import CreateCourse from './pages/Instructor/CreateCourse';
import CreateCourseFirst from './pages/Instructor/CreateCourseFirst';
import CreateCourseSecond from './pages/Instructor/CreateCourseSecond';
import CreateCourseThird from './pages/Instructor/CreateCourseThird';
import UserManagement from './pages/Instructor/UserManagement';
import CreateQuiz from './pages/Instructor/QuizSetup/CreateQuiz';
import QuizFirstPage from './pages/Instructor/QuizSetup/QuizFirstPage';
import QuizSecondPage from './pages/Instructor/QuizSetup/QuizSecondPage';
import QuizThirdPage from './pages/Instructor/QuizSetup/QuizThirdPage';
import NoticeManagement from './pages/Instructor/NoticeManagement';
import PaymentManagement from './pages/Instructor/PaymentManagement';
import CreateNotice from './pages/Instructor/CreateNotice';
import EditNotice from './pages/Instructor/EditNotice';
// import VideoUpload from './pages/Instructor/VideoUpload';
import VideoUpload from './pages/Instructor/VideoManagement/VideoUpload';
import AddVideos from './pages/Instructor/AddVideos';
import InstructorProfile from './pages/Instructor/InstructorProfile';
import InstructorHeader from './pages/Instructor/InstructorHeader';
// import VideoList from './pages/Instructor/VideoList';
import VideoList from './pages/Instructor/VideoManagement/VideoList';
// import VideoPreview from './pages/Instructor/VideoPreview';
import VideoPreview from './pages/Instructor/VideoManagement/VideoPreview';
import VideoUpdate from './pages/Instructor/VideoManagement/VideoUpdate';
import CourseEditFirst from './pages/Instructor/courseEdit/CourseEditFirst';
import CourseEditSecond from './pages/Instructor/courseEdit/CourseEditSecond';
import CourseEditThird from './pages/Instructor/courseEdit/CourseEditThird';


const InstructorRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/instructor/header' element={<InstructorHeader/>} />
        <Route path="/instructor/dashboard" element={<Dashboard />} />
        <Route path="/instructor/create-course" element={<CreateCourse/>} />
        <Route path="/instructor/create-course-first" element={<CreateCourseFirst/>} />
        <Route path="/instructor/create-course-second" element={<CreateCourseSecond/>} />
        <Route path="/instructor/create-course-third" element={<CreateCourseThird/>} />
        <Route path='/instructor/user-management' element={<UserManagement/>} />
        <Route path="/instructor/create-quiz" element={<CreateQuiz/>} />
        <Route path="/instructor/quiz-first" element={<QuizFirstPage/>} />
        <Route path="/instructor/quiz-second" element={<QuizSecondPage/>} />
        <Route path="/instructor/quiz-third" element={<QuizThirdPage/>} />
        <Route path="/instructor/notice-management" element={<NoticeManagement/>} />
        <Route path="/instructor/create-notice" element={<CreateNotice/>} />
        <Route path="/instructor/payment-management" element={<PaymentManagement/>} />
        <Route path="/instructor/edit-notice/:id" element={<EditNotice />} />
        <Route path="/instructor/add-videos" element={<AddVideos/>} />
        <Route path="/instructor/video-upload" element={<VideoUpload/>} />
        <Route path="/instructor/profile" element={<InstructorProfile/>} />
        <Route path="/instructor/videoList" element={<VideoList/>} />
        <Route path="/instructor/videoPreview/:videoId" element={<VideoPreview/>} />
        <Route path="/instructor/videoUpdate/:videoId" element={<VideoUpdate/>} />
        <Route path="/instructor/edit-course-first/:courseId" element={<CourseEditFirst/>} />
        <Route path="/instructor/edit-course-second/:courseId" element={<CourseEditSecond/>} />
        <Route path="/instructor/edit-course-third/:courseId" element={<CourseEditThird/>} />


      
      </Route>
    </Routes>
  );
};

export default InstructorRoutes;
