import React, { useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector(state => state.user);

  let Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
  ];

  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-20 bg-red-50'>
      <div className='flex items-center justify-between bg-red-50 py-2 px-5 md:px-10'>
        {/* Logo Section */}
        <div className='flex items-center gap-1'>
          <Link to={'/'}>
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
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>

        {/* Menu Icon for mobile screens */}
        <div onClick={() => setOpen(!open)} className='cursor-pointer md:hidden w-7 h-7 '>
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>

        {/* Links */}
        <ul className={`md:flex  gap-0 md:items-center md:pb-0 pb-12 absolute md:static bg-red-50 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
          {Links.map((link) => (
            <li key={link.name} className='md:ml-8 md:my-0 my-7 font-semibold flex justify-center items-center'>
              <a href={link.link} className='text-gray-800 hover:text-custom-red transform hover:scale-110 transition-transform duration-300'>{link.name}</a>
            </li>
          ))}

          {currentUser ? (
            // If user is logged in, show the avatar
            <li className='md:ml-8 md:my-0 my-7 font-semibold  flex justify-center items-center '>
              <Link to="/profile">
                <img
                  src={currentUser.avatarUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border-2 border-slate-400"
                />
              </Link>
            </li>
          ) : (
            <>
              {/* Login Button */}
              <li className='md:ml-8 md:my-0 my-9 font-semibold  flex justify-center items-center '>
                <Link to='/sign-in'>
                  <span
                    className='text-custom-red font-medium border px-9 py-1 rounded-lg border-rose-600 hover:bg-rose-100 transition-all duration-300'
                  >
                    Login
                  </span>
                </Link>
              </li>

              {/* Get Started Button */}
              <li className=' flex justify-center items-center md:ml-8 md:my-0 my-7 font-semibold'>
                <Link to="/sign-up">
                  <span
                    className="text-white font-semibold px-4 py-2 duration-500 rounded-xl hover:opacity-90"
                    style={{ background: 'linear-gradient(to right, #D16262, #C53B3B)' }}
                  >
                    Get Started
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
