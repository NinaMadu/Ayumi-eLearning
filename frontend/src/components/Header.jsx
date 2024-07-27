import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className='bg-custom-pink w-full fixed top-0 z-10'>
      <div className='flex flex-wrap justify-between items-center mx-auto px-4 sm:px-8 py-2'>
        <Link to='/' className='flex items-center'>
          <img src={logo} alt='Logo' className='h-8 sm:h-16' />
        </Link>
        
        <form className='bg-white py-1 px-3 rounded-xl flex items-center w-full sm:w-auto'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-full sm:w-64 p-2 text-sm sm:text-base'
          />
          <button type='submit' className='text-slate-500'>
            <FaSearch />
          </button>
        </form>

        <ul className='flex flex-wrap gap-4 sm:gap-6 items-center w-full sm:w-auto mt-4 sm:mt-0 justify-end'>
          <li>
            <Link
              to='/'
              className='text-slate-700 font-semibold text-sm sm:text-base hover:text-custom-red transform hover:scale-105 transition-transform duration-300'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/courses'
              className='text-slate-700 font-semibold text-sm sm:text-base hover:text-custom-red transform hover:scale-105 transition-transform duration-300'
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to='/about'
              className='text-slate-700 font-semibold text-sm sm:text-base hover:text-custom-red transform hover:scale-105 transition-transform duration-300'
            >
              About
            </Link>
          </li>
          <li>
            <Link to='/sign-up'>
              <span
                className='text-white font-semibold border py-2 px-4 sm:py-2 sm:px-6 rounded-xl'
                style={{
                  background: 'linear-gradient(to right, #D16262, #C53B3B)',
                }}
              >
                Get Started
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
