import React from 'react';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/Signup'
import Signup from './pages/Signup';

function App() {
  return (
    <Signup/>
   
  );
}

export default App;

      // <Routes>
      //   <Route path="/" element={<Home />} />
      //   <Route path="/sign-up" element={<SignUp />} />
      //   <Route path="/about" element={<About />} />
      // </Routes>
