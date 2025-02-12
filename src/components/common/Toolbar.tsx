import React, { useState } from "react";
import Icon from "./icon/icon.component";

const Toolbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm shadow-gray-700/50 p-4 z-40">
      <div className="flex flex-1 gap-4 justify-between">
        <button className="hidden">
          <Icon name={"menu2"} className="text-3xl text-white" />
        </button>

        <div className="flex flex-1 justify-center items-center">
          <label className="input rounded-lg">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>
        </div>

        <div className="relative">
          <button
            className="avatar avatar-online cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-12 rounded-full border">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User Avatar"
              />
            </div>
          </button>

          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-52 border border-gray-700/50 bg-base-100 rounded-box shadow-md p-2 z-10">
              <li className="p-2 hover:bg-gray-700 cursor-pointer rounded-lg">
                Profile
              </li>
              <li className="p-2 hover:bg-gray-700 cursor-pointer rounded-lg">
                Settings
              </li>
              <li className="p-2 hover:bg-gray-700 cursor-pointer rounded-lg">
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
