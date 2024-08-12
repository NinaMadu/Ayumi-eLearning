import React from 'react';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Sidemenu from './components/Sidemenu';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/Signup'
import Signin from './pages/Signin';
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <BrowserRouter>
    
   
      

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
