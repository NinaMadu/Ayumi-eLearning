import React, { useState } from 'react';
import { FaHome, FaUser, FaBook, FaCog, FaBell, FaHeart, FaQuestionCircle, FaSignOutAlt, FaChevronCircleLeft, FaChevronCircleRight, FaBookOpen } from 'react-icons/fa';
import { AiFillDashboard } from "react-icons/ai";
import { useNavigate, useLocation } from 'react-router-dom';
import { signOutUserStart, signOutUserSuccess, signInFailure } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const Sidemenu = () => {
  const [open, setOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation(); 
  const dispatch = useDispatch();
  

  const mainMenu = [
    { title: "Home", icon: <FaHome />, path: "/" },
    { title: "Dashboard", icon: <AiFillDashboard />, path: "/user/dashboard" },
    { title: "Notifications", icon: <FaBell /> },
    { title: "Discussion", icon: <FaBookOpen /> },
    { title: "Favourites", icon: <FaHeart /> },
    { title: "Help", icon: <FaQuestionCircle /> },
    { title: "Courses", icon: <FaBook />, path: "/user/course-cards" },
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
      setShowLogoutModal(true); // Show logout confirmation modal
    } else {
      navigate(menu.path);
    }
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowLogoutModal(false); // Close modal after logout
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false); // Close modal without logging out
  };

  const LogoutModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-200 py-6 px-20 rounded-lg shadow-lg text-center">
        <h3 className="text-lg font-semibold">Confirm Logout</h3>
        <p className="mt-4">Are you sure you want to log out?</p>
        <div className="mt-6 flex justify-center space-x-12">
          <button
            className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800"
            onClick={onConfirm}
          >
            Yes, Log out
          </button>
          <button
            className="bg-gray-400 text-gray-900 py-2 px-4 rounded hover:bg-gray-500"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`relative ${open ? 'w-48' : 'w-20'} bg-custom-pink p-4 pt-0 duration-300`} style={{ height: '100vh' }}>
      <div className="absolute top-3 right-0 cursor-pointer" onClick={() => setOpen(!open)}>
        {open ? (
          <FaChevronCircleLeft size={23} className="text-slate-600" />
        ) : (
          <FaChevronCircleRight size={23} className="text-slate-600" />
        )}
      </div>
      <div className="flex items-center gap-x-4">
        <div className={`flex items-center justify-center text-white ${open ? 'block' : 'hidden'}`}>
          <h1 className="text-xl font-medium"></h1>
        </div>
      </div>
      <ul className="flex flex-col pt-6">
        <div className="flex-grow">
          {mainMenu.map((menu, index) => (
            <li
              key={index}
              className={`flex items-center gap-x-4 p-2 font-medium hover:bg-custom-gradient hover:text-white cursor-pointer rounded-md mt-2 ${
                location.pathname === menu.path ? 'bg-red-500 text-white' : 'text-slate-600'
              }`}
              onClick={() => handleMenuClick(menu)}
            >
              <span className="text-xl">{menu.icon}</span>
              <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
            </li>
          ))}
        </div>

        <div className="mt-24">
          {settingsMenu.map((menu, index) => (
            <li
              key={index}
              className={`flex items-center gap-x-4 p-2 font-medium hover:bg-custom-gradient hover:text-white cursor-pointer rounded-md mt-2 ${
                location.pathname === menu.path ? 'bg-red-500 text-white' : 'text-slate-600'
              }`}
              onClick={() => handleMenuClick(menu)}
            >
              <span className="text-xl">{menu.icon}</span>
              <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
            </li>
          ))}
        </div>
      </ul>

      {/* Show the logout modal if the "Logout" option is clicked */}
      {showLogoutModal && <LogoutModal onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />}
    </div>
  );
};

export default Sidemenu;
