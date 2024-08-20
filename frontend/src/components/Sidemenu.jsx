import React, { useState } from 'react';
import { FaHome, FaUser, FaBook, FaCog, FaBell, FaHeart, FaQuestionCircle, FaSignOutAlt, FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { signOutUserStart, signOutUserSuccess, signInFailure } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const Sidemenu = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mainMenu = [
    { title: "Home", icon: <FaHome />, path: "/" },
    { title: "Profile", icon: <FaUser />, path:"/user/dashboard" },
    { title: "Notifications", icon: <FaBell /> },
    { title: "Discussion", icon: <FaBook /> },
    { title: "Favourites", icon: <FaHeart /> },
    { title: "Help", icon: <FaQuestionCircle /> },
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
    <div className={`relative top-0 left-0 ${open ? 'w-48' : 'w-20'} bg-custom-pink p-4 pt-2 duration-300`}>
      <div className="absolute top-3 right-0 cursor-pointer" onClick={() => setOpen(!open)}>
        {/* Change icon based on the sidebar state */}
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
      <ul className="pt-6">
        {/* Main Menu */}
        <div>
          {mainMenu.map((menu, index) => (
            <li key={index} className={`flex items-center gap-x-4 p-2 text-slate-600 font-medium hover:bg-custom-gradient hover:text-white cursor-pointer rounded-md mt-2`}
            onClick={() => handleMenuClick(menu)}>
              <span className="text-xl">{menu.icon}</span>
              <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
            </li>
          ))}
        </div>

        {/* Settings Menu */}
        <div className="mt-20">
          {settingsMenu.map((menu, index) => (
            <li key={index} className={`flex items-center gap-x-4 p-2 text-slate-600 font-medium hover:bg-custom-gradient hover:text-white cursor-pointer rounded-md mt-2`}
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

export default Sidemenu;
