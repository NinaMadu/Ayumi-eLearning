import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { IDashboard } from './pages/Instructor/Dashboard';
import CreateCourse from './pages/Instructor/CreateCourse';
import CreateCourseFirst from './pages/Instructor/CreateCourseFirst';
import CreateCourseSecond from './pages/Instructor/CreateCourseSecond';
import CreateCourseThird from './pages/Instructor/CreateCourseThird';
import CreateQuiz from './pages/Instructor/CreateQuiz';
import CreateQuizFirst from './pages/Instructor/CreateQuizFirst';
import CreateQuizSecond from './pages/Instructor/CreateQuizSecond';
import CreateQuizThird from './pages/Instructor/CreateQuizThird';


const InstructorRoutes = () => {
  return (
    <Routes>
      
      <Route element={<PrivateRoute />}>
        <Route path="/instructor/dashboard" element={<IDashboard />} />
        <Route path="/instructor/create-course" element={<CreateCourse/>} />
        <Route path="/instructor/create-course-first" element={<CreateCourseFirst/>} />
        <Route path="/instructor/create-course-second" element={<CreateCourseSecond/>} />
        <Route path="/instructor/create-course-third" element={<CreateCourseThird/>} />
        <Route path="/instructor/create-quiz" element={<CreateQuiz/>} />
        <Route path="/instructor/create-quiz-first" element={<CreateQuizFirst/>} />
        <Route path="/instructor/create-quiz-Second" element={<CreateQuizSecond/>} />
        <Route path="/instructor/create-quiz-Third" element={<CreateQuizThird/>} />
        
      </Route>
    </Routes>
  );
};

export default InstructorRoutes;
