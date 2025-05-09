import React, { useState, useEffect } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOutUserStart, signOutUserSuccess, signInFailure } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import LogoutConfirmation from './LogoutConfirmation';
import axios from 'axios';





const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [message, setMessage] = useState('');


  let Links = [
    {
      name: "Home", link: currentUser ? '/user/user-home' :'/'
    },
    {
      name: "About", link: '/about'
      
    },
    {
      name:"Leaderboard", link: '/user/leaderboard'
    }
  ];
  

  // Fetch user details
  const fetchUserDetails = async () => {
    if (currentUser) {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${currentUser.email}`); // Use email to fetch user details
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [currentUser]);

  const handleLogout = async () => {
    dispatch(signOutUserStart());
    try {
        const userId = localStorage.getItem('userId');
        console.log('Retrieved userId from localStorage:', userId);
        if (!userId) {
            throw new Error('User ID is missing. Please log in again.');
        }

        const response = await fetch(`http://localhost:5000/api/auth/signout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          dispatch(signOutUserSuccess());
          // setShowSuccessNotification(true);
          // setMessage('Logged out successfully');
          // console.log('Logged out successfully');
            
        } else {
            const errorData = await response.json();
            dispatch(signInFailure(errorData.message || 'Failed to log out. Please try again.'));
        }
    } catch (error) {
        console.error('Logout error:', error.message);
        dispatch(signInFailure(error.message || 'An unexpected error occurred.'));
    }
};


  const handleConfirmLogout = () => {
    handleLogout();
    setShowLogoutModal(false);
  };

  return (
    <div className='fixed top-0 left-0 z-20 w-full shadow-md bg-red-50'>
      {/* {showSuccessNotification && (
            <Notification
              type="success"
              message={message}
              onClose={() => setShowSuccessNotification(false)}
            />
          )} */}
      
      <div className='flex items-center justify-between px-5 py-2 bg-red-50 md:px-10'>
        {/* Logo Section */}
        <div className='flex items-center gap-1'>
          <Link to={ currentUser ? "/user/user-home" : "/"}>
            <img src={logo} alt="Logo" className="h-8 sm:h-16" />
          </Link>
        </div>

        {/* Search Bar */}
        <form className='flex items-center flex-1 p-2 mx-4 bg-white rounded-lg'>
          <input
            type='text'
            placeholder='Search...'
            className='w-full px-2 bg-transparent focus:outline-none sm:w-auto sm:flex-grow'
          />
          <button>
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
            <li key={link.name} className='flex items-center justify-center font-semibold md:ml-8 md:my-0 my-7'>
              <Link to={link.link} className='text-gray-800 transition-transform duration-300 transform hover:text-custom-red hover:scale-110'>{link.name}</Link>
            </li>
          ))}

          {currentUser ? (
            <li className='relative flex items-center justify-center font-semibold md:ml-8 md:my-0 my-7'>
              <div
                className='flex items-center cursor-pointer'
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={userDetails?.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  alt="User Avatar"
                  className="w-8 h-8 border-2 rounded-full border-slate-100"
                />
                {dropdownOpen ? (
                  <FaChevronUp className='ml-2 text-slate-600' />
                ) : (
                  <FaChevronDown className='ml-2 text-slate-600' />
                )}
              </div>

              {dropdownOpen && (
                <ul className='absolute z-10 w-32 mt-32 transform -translate-x-1/2 bg-white shadow-lg left-1/2 rounded-xl right-2'>
                  <li className='flex flex-col items-center justify-center hover:bg-custom-gradient hover:rounded-lg hover:text-white'>
                    <Link to="/profile" className='block px-4 py-2 text-gray-700 hover:bg-custom-gradient hover:text-white'>
                      Profile
                    </Link>
                  </li>
                  <li
                    className='flex flex-col items-center justify-center hover:bg-custom-gradient hover:rounded-lg hover:text-white'
                    onClick={() => setShowLogoutModal(true)}
                  >
                    <span className='block px-4 py-2 text-gray-700 cursor-pointer hover:bg-custom-gradient hover:text-white'>
                      Logout
                    </span>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <>
              <li className='flex items-center justify-center font-semibold md:ml-8 md:my-0 my-9'>
                <Link to='/sign-in'>
                  <span className='py-1 font-medium transition-all duration-300 border rounded-lg text-custom-red px-9 border-rose-600 hover:bg-rose-100'>
                    Login
                  </span>
                </Link>
              </li>
              <li className='flex items-center justify-center font-semibold md:ml-8 md:my-0 my-7'>
                <Link to="/sign-up">
                  <span className="px-4 py-2 font-semibold text-white duration-500 rounded-xl hover:opacity-90" style={{ background: 'linear-gradient(to right, #D16262, #C53B3B)' }}>
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

export default Header;
