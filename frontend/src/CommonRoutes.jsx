import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/Signup';
import Signin from './pages/Signin';
import LandingPage from './pages/LandingPage';
import UserAdminProfile from './pages/UserAdminProfile';

const CommonRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} /> 
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/profile" element={<UserAdminProfile />} />
      
    </Routes>
  );
};

export default CommonRoutes;
