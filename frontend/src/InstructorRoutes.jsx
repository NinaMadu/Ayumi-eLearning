import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard  from './pages/Instructor/Dashboard';
import CreateCourse from './pages/Instructor/CreateCourse';
import CreateCourseFirst from './pages/Instructor/CreateCourseFirst';
import CreateCourseSecond from './pages/Instructor/CreateCourseSecond';
import CreateCourseThird from './pages/Instructor/CreateCourseThird';
import UserManagement from './pages/Instructor/UserManagement';
import NoticeManagement from './pages/Instructor/NoticeManagement';
import PaymentManagement from './pages/Instructor/PaymentManagement';
import CreateQuiz from './pages/Instructor/CreateQuiz';
import CreateQuizFirst from './pages/Instructor/CreateQuizFirst';
import CreateQuizSecond from './pages/Instructor/CreateQuizSecond';
import CreateQuizThird from './pages/Instructor/CreateQuizThird';
import CreateNotice from './pages/Instructor/CreateNotice';
import EditNotice from './pages/Instructor/EditNotice';


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
        <Route path="/instructor/notice-management" element={<NoticeManagement/>} />
        <Route path="/instructor/create-notice" element={<CreateNotice/>} />
        <Route path="/instructor/payment-management" element={<PaymentManagement/>} />
        <Route path="/instructor/edit-notice/:id" element={<EditNotice />} />
        <Route path="/instructor/create-quiz" element={<CreateQuiz/>} />
        <Route path="/instructor/create-quiz-first" element={<CreateQuizFirst/>} />
        <Route path="/instructor/create-quiz-Second" element={<CreateQuizSecond/>} />
        <Route path="/instructor/create-quiz-Third" element={<CreateQuizThird/>} />
        
      </Route>
    </Routes>
  );
};

export default InstructorRoutes;
