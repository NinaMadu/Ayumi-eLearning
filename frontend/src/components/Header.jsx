import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';


export default function Header() {
  
  return (
    <header className='bg-custom-pink shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <img src={logo} alt="Logo" className="h-8 sm:h-16" />

        </Link>
        <form
       
          className='bg-white p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          
           
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-8 text-[#2B3090] font-medium '>
          <Link to='/'>
            <li className='hidden sm:inline hover:text-custom-red transform hover:scale-110 transition-transform duration-300 '>
              Home
            </li>
          </Link>
          <Link to='/courses'>
            <li className='hidden sm:inline hover:text-custom-red transform hover:scale-110 transition-transform duration-300' >
              Courses
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline hover:text-custom-red transform hover:scale-110 transition-transform duration-300 '>
              About
            </li>
          </Link>
    
          
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
        </ul>

      </div>
    </header>
  );
}