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
import FavoriteCourses from './pages/User/Favorites';
import QuizContent from './pages/User/QuizContent';
import Reviews from './pages/User/Reviews';
import Payment from './components/Payment';
import Help from './pages/User/Help';
import UserSettings from './pages/User/UserSettings';
import Roadmap from './pages/User/Roadmap';
import AssignmentDetails from './pages/User/AssignmentDetails';
import Leaderboard from './pages/User/Leaderboard';


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
        <Route path="/user/course/:courseId/video/:videoId" element={<UserVideoPreview/>}/>
        <Route path="/user/favourites" element={<FavoriteCourses />} />
        <Route path='/user/quiz-content/:quizId' element={<QuizContent />} />
        <Route path='/user/add-review/:courseId' element={<Reviews />} />
        <Route path='/user/courseIntro/:id/payment' element={<Payment />} />
        <Route path='/user/settings' element={<UserSettings/>} />
        <Route path='/user/help' element={<Help />} />
        <Route path='/user/roadmap' element={<Roadmap/>} />        
        <Route path='/user/assignments/:courseId/:assignmentId' element={<AssignmentDetails />} />
        <Route path='/user/leaderboard' element={<Leaderboard />}/>

      
      </Route>
    </Routes>
  );
};

export default UserRoutes;
