import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/Signup';
import Signin from './pages/Signin';
import LandingPage from './pages/LandingPage';
import Profile from './components/Profile';
import Roadmap from './components/Roadmap';
import Discussion from './pages/User/Discussion';

const CommonRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} /> 
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/discussion" element={<Discussion />} />
    </Routes>
  );
};

export default CommonRoutes;
