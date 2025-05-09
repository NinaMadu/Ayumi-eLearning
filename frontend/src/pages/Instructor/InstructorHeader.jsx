import React, { useState, useEffect } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOutUserStart, signOutUserSuccess, signInFailure } from '../../redux/userSlice';
import LogoutConfirmation from '../../components/LogoutConfirmation';
import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const InstructorHeader = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [instructor, setInstructor] = useState(null);
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Links = [
    { name: "Home", link: "/instructor/admin-home" },
    { name: "About", link: "/about" },
  ];

  // Fetch instructor details
  const fetchInstructorProfile = async () => {
    if (currentUser) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/instructorProfile/${currentUser.email}`);
        setInstructor(response.data);
      } catch (error) {
        console.error('Error fetching instructor profile:', error);
      }
    }
  };

  useEffect(() => {
    fetchInstructorProfile();
  }, [currentUser]);

  const handleLogout = async () => {
    dispatch(signOutUserStart());
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userId: currentUser.id }),
      });
      if (response.ok) {
        dispatch(signOutUserSuccess());
        navigate('/');
      } else {
        const errorData = await response.json();
        dispatch(signInFailure(errorData.message || 'Failed to log out. Please try again.'));
      }
    } catch (error) {
      dispatch(signInFailure(error.message || 'An unexpected error occurred.'));
    }
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowLogoutModal(false);
  };

  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-20 bg-red-50'>
      <div className='flex items-center justify-between bg-red-50 py-2 px-5 md:px-10'>
        {/* Logo Section */}
        <div className='flex items-center gap-1'>
          <Link to={'/instructor/admin-home'}>
            <img src={logo} alt="Logo" className="h-8 sm:h-16" />
          </Link>
        </div>

        {/* Search Bar */}
        <form className='flex-1 mx-4 flex items-center bg-white p-2 rounded-lg'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-full sm:w-auto sm:flex-grow px-2'
          />
          <button type='submit'>
            <FaSearch className='text-slate-600' />
          </button>
        </form>

        {/* Menu Icon for mobile screens */}
        <div onClick={() => setOpen(!open)} className='cursor-pointer md:hidden w-7 h-7'>
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>

        {/* Links */}
        <ul className={`md:flex gap-0 md:items-center md:pb-0 pb-12 absolute md:static bg-red-50 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
          {Links.map((link) => (
            <li key={link.name} className='md:ml-8 md:my-0 my-7 font-semibold flex justify-center items-center'>
              <Link to={link.link} className='text-gray-800 hover:text-custom-red transform hover:scale-110 transition-transform duration-300'>{link.name}</Link>
            </li>
          ))}

          {currentUser ? (
            <li className='md:ml-8 md:my-0 my-7 font-semibold flex justify-center items-center relative'>
              <div
                className='flex items-center cursor-pointer'
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={instructor?.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  alt="Instructor Avatar"
                  className="w-8 h-8 rounded-full border-2 border-slate-100"
                />
                {dropdownOpen ? (
                  <FaChevronUp className='ml-2 text-slate-600' />
                ) : (
                  <FaChevronDown className='ml-2 text-slate-600' />
                )}
              </div>

              {dropdownOpen && (
                <ul className='absolute left-1/2 transform -translate-x-1/2 mt-32 w-32 bg-white rounded-xl shadow-lg z-10 right-2'>
                  <li className='hover:bg-custom-gradient hover:rounded-lg hover:text-white flex flex-col justify-center items-center'>
                    <Link to="/instructor/profile" className='block px-4 py-2 text-gray-700 hover:bg-custom-gradient hover:text-white'>
                      Profile
                    </Link>
                  </li>
                  <li
                    className='hover:bg-custom-gradient hover:rounded-lg hover:text-white flex flex-col justify-center items-center'
                    onClick={() => setShowLogoutModal(true)}
                  >
                    <span className='block px-4 py-2 text-gray-700 hover:bg-custom-gradient hover:text-white cursor-pointer'>
                      Logout
                    </span>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <>
              <li className='md:ml-8 md:my-0 my-9 font-semibold flex justify-center items-center'>
                <Link to='/sign-in'>
                  <span className='text-custom-red font-medium border px-9 py-1 rounded-lg border-rose-600 hover:bg-rose-100 transition-all duration-300'>
                    Login
                  </span>
                </Link>
              </li>
              <li className='flex justify-center items-center md:ml-8 md:my-0 my-7 font-semibold'>
                <Link to="/sign-up">
                  <span className="text-white font-semibold px-4 py-2 duration-500 rounded-xl hover:opacity-90" style={{ background: 'linear-gradient(to right, #D16262, #C53B3B)' }}>
                    Get Started
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {showLogoutModal && (
        <LogoutConfirmation
          onConfirm={handleConfirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
};

export default InstructorHeader;
