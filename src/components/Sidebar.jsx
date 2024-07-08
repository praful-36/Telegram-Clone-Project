import React from 'react';
import { MdDarkMode } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosContacts } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";

function Sidebar({ closeSidebar, darkMode, setDarkMode, sidebarOpen }) {
  return (
    <div className={`fixed inset-0 z-50 flex ${sidebarOpen ? '' : 'pointer-events-none'}`}>
      <div className={`w-64 bg-white dark:bg-gray-800 dark:text-white shadow-lg transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg">Menu</h2>
          <button onClick={closeSidebar} className="p-2">
            <IoMdClose />
          </button>
        </div>
        <div className="flex-1 p-4">
          <ul className="space-y-4">
            <li><a href="#" className="flex items-center"><CgProfile className="mr-2" /> Profile</a></li>
            <li><a href="#" className="flex items-center"><FaUserGroup className="mr-2" /> New Group</a></li>
            <li><a href="#" className="flex items-center"><IoIosContacts className="mr-2" /> Contacts</a></li>
            <li><a href="#" className="flex items-center"><FaBookmark className="mr-2" /> Saved Messages</a></li>
            <li><a href="#" className="flex items-center"><IoIosHelpCircle className="mr-2" /> Help</a></li>
            <li><a href="#" className="flex items-center"><IoSettingsSharp className="mr-2" /> Settings</a></li>
            <li><a href="#" className="flex items-center"><IoLogOutSharp className="mr-2" /> Log out</a></li>
          </ul>
        </div>
        <div className="p-4 border-t dark:border-gray-700">
        <button onClick={() => setDarkMode(!darkMode)} className="w-full p-2 flex items-center justify-center bg-blue-500 text-white rounded-md" >
            <MdDarkMode className="mr-2" />
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
      <div className="flex-1" onClick={closeSidebar}></div>
    </div>
  );
}

export default Sidebar;
