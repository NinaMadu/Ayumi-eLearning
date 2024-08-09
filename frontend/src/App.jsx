import React from 'react';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Sidemenu from './components/Sidemenu';
import AdminSideMenu from './components/AdminSideMenu';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/Signup'
import Signin from './pages/Signin';
import CreateCourseFirst from './pages/CreateCourseFirst';
import CreateCourseSecond from './pages/CreateCourseSecond';
import CreateCourseThird from './pages/CreateCourseThird';
import CreateCourseFour from './pages/CreateCourseFour';
import CreateCourse from './pages/CreateCourse';

function App() {
  return (
    <BrowserRouter>
    {/* <Header/> */}
    <AdminSideMenu /> 
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path='/create-course' element={<CreateCourse />} />
        <Route path='/create-course-first' element={<CreateCourseFirst />} />
        <Route path='/create-course-second' element={<CreateCourseSecond />} />
        <Route path='create-course-third' element={<CreateCourseThird />} />
        <Route path='create-course-four' element={<CreateCourseFour />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
