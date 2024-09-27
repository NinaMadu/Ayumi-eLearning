import React, { useState } from 'react';
import { FaUser, FaBook, FaCog, FaSignOutAlt, FaChevronCircleLeft, FaChevronCircleRight, FaTachometerAlt, FaCreditCard, FaChartBar } from 'react-icons/fa';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useNavigate } from 'react-router-dom';
import { signOutUserStart, signOutUserSuccess, signInFailure } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const AdminSidemenu = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mainMenu = [
    { title: "Dashboard", icon: <FaTachometerAlt />, path: "/instructor/dashboard" },
    { title: "Users", icon: <FaUser /> },
    { title: "Courses", icon: <FaBook />, path: "/instructor/create-course"},
    { title: "Quizzes", icon: <LibraryBooksOutlinedIcon /> ,path:"/instructor/create-quiz" },
    { title: "Notices", icon: <AnnouncementIcon /> },
    { title: "Payment", icon: <FaCreditCard /> },
    { title: "Statistics", icon: <FaChartBar /> },
  ];

  const settingsMenu = [
    { title: "Settings", icon: <FaCog /> },
    { title: "Logout", icon: <FaSignOutAlt /> },
  ];

  const handleLogout = async () => {
    dispatch(signOutUserStart());  

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/signout`, {
            method: 'GET',
            credentials: 'include',  
        });

        if (response.ok) {
            dispatch(signOutUserSuccess()); 
            console.log('logout')
            navigate('/');  
        } else {
            const errorData = await response.json();
            dispatch(signInFailure(errorData.message || 'Failed to logout. Please try again.'));
        }
    } catch (error) {
        dispatch(signInFailure(error.message || 'An unexpected error occurred.'));
    }
  };
  

  const handleMenuClick = (menu) => {
    if (menu.title === 'Logout') {
      handleLogout();
    } else {
      navigate(menu.path);
    }
  };

  return (
    <div className={`relative ${open ? 'w-48' : 'w-20'} bg-custom-pink p-4 pt-2 duration-300`} style={{ height: '100vh' }}>
      <div className="absolute top-3 right-0 cursor-pointer" onClick={() => setOpen(!open)}>
        {open ? (
          <FaChevronCircleLeft size={23} className='text-slate-600' />
        ) : (
          <FaChevronCircleRight size={23} className='text-slate-600' />
        )}
      </div>
      <div className="flex items-center gap-x-4">
        <div className={`flex items-center justify-center text-white ${open ? 'block' : 'hidden'}`}>
          <h1 className="text-xl font-medium"></h1>
        </div>
      </div>
      <ul className="flex flex-col pt-6">
        {/* Main Menu */}
        <div className="flex-grow">
          {mainMenu.map((menu, index) => (
            <li key={index} className={`flex items-center gap-x-4 p-2 text-slate-600 font-medium hover:bg-custom-gradient hover:text-white cursor-pointer rounded-md mt-2`}
            onClick={() => handleMenuClick(menu)}>
              <span className="text-xl">{menu.icon}</span>
              <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
            </li>
          ))}
        </div>

        {/* Settings Menu */}
        <div className="mt-16">
          {settingsMenu.map((menu, index) => (
            <li key={index} className={`flex items-center gap-x-6 p-2 text-slate-600 font-medium hover:bg-custom-gradient hover:text-white cursor-pointer rounded-md mt-2`}
            onClick={() => handleMenuClick(menu)}>
              <span className="text-xl">{menu.icon}</span>
              <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default AdminSidemenu;
