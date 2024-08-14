import React, { useState } from 'react';
import { FaHome, FaUser, FaBook, FaCog, FaBell, FaHeart, FaQuestionCircle, FaSignOutAlt, FaChevronCircleLeft } from 'react-icons/fa';

const Sidemenu = () => {
  const [open, setOpen] = useState(true);

  const mainMenu = [
    { title: "Home", icon: <FaHome /> },
    { title: "Profile", icon: <FaUser /> },
    { title: "Notifications", icon: <FaBell /> },
    { title: "Discussion", icon: <FaBook /> },
    { title: "Favourites", icon: <FaHeart /> },
    { title: "Help", icon: <FaQuestionCircle /> },
  ];

  const settingsMenu = [
    { title: "Settings", icon: <FaCog /> },
    { title: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className={`relative top-0 left-0 ${open ? 'w-48' : 'w-22'} bg-custom-pink p-4 pt-8 duration-300`}>
      <div className="absolute top-3 right-0 cursor-pointer" onClick={() => setOpen(!open)}>
        <FaChevronCircleLeft size={23} className='text-slate-600 ' />
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
            <li key={index} className={`flex items-center gap-x-4 p-2 text-slate-600 font-medium hover:bg-custom-gradient hover:text-white cursor-pointer rounded-md mt-2`}>
              <span className="text-xl">{menu.icon}</span>
              <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
            </li>
          ))}
        </div>

        {/* Settings Menu */}
        <div className="mt-32">
          {settingsMenu.map((menu, index) => (
            <li key={index} className={`flex items-center gap-x-4 p-2 text-slate-600 font-medium hover:bg-custom-gradient hover:text-white cursor-pointer rounded-md mt-2`}>
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
