import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { MdOutlineSettings, MdOutlineLogout, MdDelete } from 'react-icons/md';
import { CgBell, CgHeart, CgHome, CgMenu, CgProfile } from 'react-icons/cg';
import { FaRegComments } from 'react-icons/fa';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

export default function Sidemenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className='bg-custom-pink shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <button
            onClick={toggleSidebar}
            className=""
          >
            <CgMenu className="text-2xl text-gray-600 group-hover:text-white" />
          </button>
          <Link to='/'>
            <img src={logo} alt="Logo" className="h-8 sm:h-16" />
          </Link>
          <form className='bg-white p-3 rounded-lg flex items-center'>
            <input
              type='text'
              placeholder='Search...'
              className='bg-transparent focus:outline-none w-24 sm:w-64'
            />
            <button>
              <FaSearch className='text-slate-600' />
            </button>
          </form>
          <ul className='flex gap-4 text-[#2B3090] font-medium md:gap-12 '>
            <Link to='/'>
              <li className='hidden sm:inline hover:text-custom-red transform hover:scale-110 transition-transform duration-300'>
                Home
              </li>
            </Link>
            <Link to='/courses'>
              <li className='hidden sm:inline hover:text-custom-red transform hover:scale-110 transition-transform duration-300'>
                Courses
              </li>
            </Link>
            <Link to='/about'>
              <li className='hidden sm:inline hover:text-custom-red transform hover:scale-110 transition-transform duration-300'>
                About
              </li>
            </Link>
            <li>
              <FaHeart className="text-slate-500 h-6 w-6" />
            </li>
            <li>
              <FaBell className="text-slate-500 h-6 w-6" />
            </li>
            <li>
              <FaUserCircle className="text-slate-500 h-6 w-6" />
            </li>
          </ul>
          
        </div>
      </header>
      
      {isOpen && (
        <div className="fixed left-0 w-56 h-full bg-custom-pink z-50">
          <div className="flex flex-col justify-start items-center">
            <div className="my-4 mt-12 border-b border-black pb-4 w-full">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 rounded-md group cursor-pointer hover:bg-[#DC6F6F] hover:text-white transition-colors duration-300 p-2">
                <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Profile
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-[#DC6F6F] hover:text-white transition-colors duration-300">
                <CgHome className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Home
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-[#DC6F6F] hover:text-white transition-colors duration-300">
                <CgBell className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Notifications
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-[#DC6F6F] hover:text-white transition-colors duration-300">
                <FaRegComments className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Discussion
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-[#DC6F6F] hover:text-white transition-colors duration-300">
                <CgHeart className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Favourites
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-[#DC6F6F] hover:text-white transition-colors duration-300">
                <AiOutlineQuestionCircle className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Help and Support
                </h3>
              </div>
            </div>
            <div className="my-4 border-b border-gray-100 pb-4 w-full">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-[#DC6F6F] hover:text-white transition-colors duration-300">
                <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Settings
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-[#DC6F6F] hover:text-white transition-colors duration-300">
                <MdDelete className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Delete Account
                </h3>
              </div>
            </div>
            <div className="my-4 border-b border-gray-100 pb-4 w-full">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-[#DC6F6F] hover:text-white transition-colors duration-300">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
