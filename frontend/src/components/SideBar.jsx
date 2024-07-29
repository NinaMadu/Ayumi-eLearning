import React from 'react';
import {
  
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
  MdDelete,
} from 'react-icons/md';
import { CgBell, CgHeart, CgHome, CgProfile } from 'react-icons/cg';
import {  FaRegComments } from 'react-icons/fa';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import { BiMessageSquareDots } from 'react-icons/bi';

function Sidebar({ isOpen }) {
  if (!isOpen) return null; //FDBDBD //DC6F6F

  return (
    <div className="fixed inset-0 z-30 flex">
      <div className="fixed top-0 left-0 w-56 h-full bg-custom-pink  z-30">
        <div className="flex flex-col justify-start items-center">
          <div className="my-4 mt-36 border-b border-black pb-4 w-full">
            
          <div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-[#DC6F6F] hover:text-white transition-colors duration-300">
                    <CgProfile className="text-2xl text-gray-600 group-hover:text-white" />
                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
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
    </div>
  );
}

export default Sidebar;
