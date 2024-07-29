import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle, FaHeart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import Sidebar from './Sidebar';
import logo from '../assets/logo.png';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/createcourse') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location.pathname]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="bg-custom-pink w-full fixed top-0 z-40">
        <div className="flex flex-wrap justify-between items-center mx-auto sm:px-8 py-2">
          {isAuthenticated && (
            <div className="order-1 sm:order-none">
              <button
                onClick={handleSidebarToggle}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-slate-200"
              >
                <GiHamburgerMenu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          )}

          <Link to="/" className="flex items-center order-2 sm:order-none">
            <img src={logo} alt="Logo" className="h-8 sm:h-16" />
          </Link>

          <form className="bg-white py-1 px-4 sm:px-8 rounded-xl flex items-center w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow duration-300 mt-4 sm:mt-0 order-3 sm:order-none">
  <input
    type="text"
    placeholder="Search..."
    className="bg-transparent focus:outline-none w-full sm:w-[24rem] md:w-[20rem] lg:w-[30rem] p-2 text-sm sm:text-base border border-transparent transition-colors duration-300"
  />
  <button
    type="submit"
    className="text-slate-500 ml-2 p-2 hover:text-slate-700 flex items-center justify-center bg-blue-100 hover:bg-blue-200 rounded-full transition-colors duration-300"
  >
    <FaSearch />
  </button>
</form>

          <ul className="sm:mt-4 sm:ml-56 sm:mb-4 flex flex-wrap gap-4 sm:gap-12 items-center w-full sm:w-auto mt-4 sm:mt-0 order-4 sm:order-none justify-end">
            <li>
              <Link
                to="/"
                className="text-slate-700 font-semibold text-sm sm:text-base hover:text-custom-red transform hover:scale-110 transition-transform duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="text-slate-700 font-semibold text-sm sm:text-base hover:text-custom-red transform hover:scale-110 transition-transform duration-300"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-slate-700 font-semibold text-sm sm:text-base hover:text-custom-red transform hover:scale-110 transition-transform duration-300"
              >
                About
              </Link>
            </li>
            {!isAuthenticated ? (
              <li>
                <Link to="/sign-up">
                  <span
                    className="text-white font-semibold border py-2 px-4 sm:py-2 sm:px-6 rounded-xl hover:opacity-90"
                    style={{
                      background: 'linear-gradient(to right, #D16262, #C53B3B)',
                    }}
                  >
                    Get Started
                  </span>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <FaHeart className="text-slate-500 h-6 w-6" />
                </li>
                <li>
                  <FaBell className="text-slate-500 h-6 w-6" />
                </li>
                <li>
                  <FaUserCircle className="text-slate-500 h-6 w-6" />
                </li>
              </>
            )}
          </ul>
        </div>
      </header>

      {isAuthenticated && <Sidebar isOpen={isSidebarOpen} />}
    </>
  );
}

export default Header;
