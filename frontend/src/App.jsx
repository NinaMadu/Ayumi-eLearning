import React from 'react';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/Signup'
import CreateCourse from './pages/CreateCourse'
//import SideBar from './components/SideBar';

function App() {
  return (
    <BrowserRouter>
   
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path='/createcourse' element={<CreateCourse />}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
