import React from 'react';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Sidemenu from './components/Sidemenu';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/Signup'

function App() {
  return (
    <BrowserRouter>
    <Header/>
    {/* <Sidemenu />  */}
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
