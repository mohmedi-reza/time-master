import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "./icon/icon.component";
import { sidebarItems } from "../../constants/sidebarItems";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logOut = () => {
    console.log("logout");
  };
  return (
    <div
      className={`relative flex flex-col shadow-sm shadow-gray-700/50 z-50 h-full bg-base-200 p-4 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-24"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Icon name={"logo"} className="text-5xl" />
          {isExpanded && (
            <div>
              <p className="text-nowrap text-xl font-black">Time Master</p>
              <p className="text-nowrap text-xs text-gray-500">
                PROJECT MANAGEMENT
              </p>
            </div>
          )}
        </div>
        <button
          className={`h-7 w-7 text-base cursor-pointer transition-all duration-300 hover:bg-gray-700 rounded-full justify-items-center items-center ${
            isExpanded
              ? ""
              : "absolute right-[-13px] bg-gray-700 border border-gray-500 rotate-180 flex top-5 p-1 rounded-full shadow-md"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle Sidebar"
        >
          <Icon name={"collapse"} className="text-3xl text-base-content" />
        </button>
      </div>

      <ul className="space-y-2 mt-7 divide divide-base-100 py-6">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.name} className="rounded-md">
              <button
                className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 ${
                  isExpanded
                    ? "w-full"
                    : "w-12 h-12 justify-center items-center flex rounded-lg"
                } ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"}`}
                onClick={() => navigate(item.path)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(item.path);
                  }
                }}
                tabIndex={0}
                aria-label={`Navigate to ${item.label}`}
              >
                <Icon name={item.name} className="text-2xl" />
                {isExpanded && <span>{item.label}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="rounded-md mt-auto">
        <button
          className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 ${
            isExpanded
              ? "w-full"
              : "w-12 h-12 justify-center items-center flex rounded-lg"
          } `}
          onClick={() => logOut()}
          tabIndex={0}
        >
          <Icon name={"off"} className="text-2xl" />
          {isExpanded && <span>{"Logout"}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
